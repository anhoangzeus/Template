import * as React from 'react';
import { StyleSheet, Text, ScrollView, KeyboardAvoidingView, NativeModules, Dimensions, NativeEventEmitter, Image, Modal, TouchableOpacity,View,Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import CryptoJS from 'crypto-js';
import NumberFormat from 'react-number-format';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const { height, width } = Dimensions.get('screen');
const { PayZaloBridge } = NativeModules;
const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);
let apptransid;

function GetCurrentDate() {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var gio = new Date().getHours();
  var phut = new Date().getMinutes();
  var giay = new Date().getSeconds();
  var UTM = "PM";
  if(date <=9 ){
    date="0"+date
  }
  if(month<=9){
    month = "0"+month;
  }
  if(gio >= 0  && gio <= 12){
    UTM = "AM";
  }
  return date + '/' + month + "/" + year + " " + gio + ":" + phut + ":" + giay +" " + UTM ;
}

function ReactNativeNumberFormat({ value }) {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      renderText={formattedValue => <Text>{formattedValue} đ</Text>}
    />
  );
}

export default function App({ route, navigation }) {

  const subscription = payZaloBridgeEmitter.addListener(
    'EventPayZalo',
    (data) => {
      console.log(data.returnCode);
      if (data.returnCode == 1) {
        thanhToan();
        data.returnCode = 0;
      } else if (data.returnCode == 4) {
        navigation.navigate("App");
      }
    }
  );

  const [token, setToken] = React.useState('')
  const [returncode, setReturnCode] = React.useState('')
  const [modalVisible, setmodal] = React.useState(false)
  const address = route.params.Address;

  const diachi = address.NumberAddress + ", " + address.Xa + ", " + address.Huyen + ", " + address.City;
  function getCurrentDateYYMMDD() {
    var todayDate = new Date().toISOString().slice(2, 10);
    return todayDate.split('-').join('');
  }
  async function createOrder() {
    apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime()

    let appid = 553
    let amount = route.params.amount + route.params.shipMonney;
    let appuser = "TiAn"
    let apptime = (new Date).getTime()
    let embeddata = "{}"
    let item = "[id : 12]"
    let description = "Mua sản phẩm trên TiAn" + apptransid
    let hmacInput = appid + "|" + apptransid + "|" + appuser + "|" + amount + "|" + apptime + "|" + embeddata + "|" + item
    let mac = CryptoJS.HmacSHA256(hmacInput, "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q")
    var order = {
      'appid': appid,
      'appuser': appuser,
      'apptime': apptime,
      'amount': amount,
      'apptransid': apptransid,
      'embeddata': embeddata,
      'item': item,
      'description': description,
      'mac': mac
    }
    let formBody = []
    for (let i in order) {
      var encodedKey = encodeURIComponent(i);
      var encodedValue = encodeURIComponent(order[i]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    await fetch('https://sandbox.zalopay.com.vn/v001/tpe/createorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(response => response.json())
      .then(resJson => {
        setToken(resJson.zptranstoken)
        setReturnCode(resJson.returncode)
      }).then(() => {
        payOrder()
      })
      .catch((error) => {
        console.log("error ", error)
      })
  }

  function getStatus() {
    navigation.navigate("App");
    setmodal(false);
  }
  function thanhToan() {
    var key = database().ref().child('Orders/').push().key;
    database().ref('Orders/' + key).set({
      Status: 1,
      CreatedDate: GetCurrentDate(),
      ShipAddress: diachi,
      ShipName: address.ShipName,
      ShipMoblie: address.ShipPhone,
      OrderID: key,
      Payment: "02",
      ShipPayment:route.params.shipMonney,
      Total: route.params.amount + route.params.shipMonney,
      CustomerID: auth().currentUser.uid,
      ShipLocation: address.Location,
      TimeLine:{
        ChoLayHang:"",
        ChoXacNhan:"",
        DaGiaoHang:"",
        DaHuy:"",
        DangVanChuyen:"",
        TraHang:"",
      },
    });
    database().ref("Cart/" + auth().currentUser.uid).once("value").then((snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        var keyDetail = database().ref().child('OrderDetails/').push().key;
        database().ref('Orders/' + key + '/OrderDetails/' + keyDetail).set({
          OrderDetailID: keyDetail,
          Price: childSnapshot.val().Price,
          ProductID: childSnapshot.val().Id,
          Quantity: childSnapshot.val().Quantity,
          CategoryID: childSnapshot.val().CategoryID,
          BrandID: childSnapshot.val().BrandID,
          Name: childSnapshot.val().Name,
          Picture: childSnapshot.val().Picture,
          BrandName: childSnapshot.val().BrandName,
          CategoryName: childSnapshot.val().CategoryName,
          Status: false,
        });
        database().ref("Cart/" + auth().currentUser.uid).child(childSnapshot.key).set({})
      })
    })
    setmodal(true);
  }
  function payOrder() {
    var payZP = NativeModules.PayZaloBridge;
    payZP.payOrder(token);
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{ width: width / 5 }} onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={35} color="#fff" style={{ marginLeft: width / 40 }} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thanh Toán</Text>
      </View>
      <KeyboardAvoidingView style={styles.container}>
        <Image source={require("../../assets/zalopay.png")} style={{ width: width / 3, height: height / 7, resizeMode: 'contain', marginTop: height / 10 }} />
        <Text style={styles.welcomeHead} >
          Thanh toán qua ZaloPay
        </Text>
        <Text style={styles.welcome} >
          Tổng hóa đơn: <ReactNativeNumberFormat value={route.params.amount+ route.params.shipMonney} />
        </Text>
        <TouchableOpacity style={styles.btnPayment}  onPress={() => { createOrder() }}>
          <Text style={{color:"#3399FF", fontWeight:"bold", fontSize:17}}>Mở ZaloPay để thanh toán</Text>
        </TouchableOpacity>
        <View>
          <Button title="Về lại trang chủ"
            type="outline"
            style={{ width: width * 0.9, height: height / 10 }}
            onPress={() => { getStatus() }}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}

          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <TouchableOpacity onPress={() => { getStatus() }}>
              <View style={styles.modalView}>
                <MaterialIcons name="done" size={55} color="#00cc00" />
                <Text style={styles.modalText}>Mua thành công!</Text>
                <Text style={styles.modalText}>Nhấn để về trang chủ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: "#fff",
    height: height * 0.9
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 4,
    backgroundColor: '#a2459a',
  },
  headerText: {
    color: "white",
    textAlignVertical: 'center',
    marginLeft: width * 0.15,
    fontSize: 20,
  },
  welcomeHead: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: height / 20,
    backgroundColor: "#fff",
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    marginTop: height / 4,
    color: "#484848"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  inputText: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center'
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center'
  },
  btnPayment:{
    width: width * 0.7, 
    height: height / 18,
    borderColor:'#3399FF', 
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    marginBottom:15
  }
});

