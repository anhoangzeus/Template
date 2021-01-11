import React, { Component } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NumberFormat from 'react-number-format';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { RadioButton } from 'react-native-paper';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const { height, width } = Dimensions.get('screen');
function ReactNativeNumberFormat({ value }) {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      renderText={formattedValue => <Text>{formattedValue} đ</Text>}
    />
  );
};

export default class Payscreen extends React.PureComponent {
  constructor (props) {
    super(props);
    this.itemRef = database();
    this.state = {
      checked: 'first',
      loading: false,
      modalVisible: false,
      shopLa: 10.851807522842384,
      shopLo: 106.77209920171669,
      shipMonney: 0,
      modalVisibleConfirm:false,
    };
  }
  getShipMoney = () => {
    var a = "";
    a = this.props.address.Location;
    var b = a.indexOf("-");
    var radlat1 = Math.PI * this.state.shopLa / 180
    var radlat2 = Math.PI * parseFloat(a.substring(0, b)) / 180
    var radlon1 = Math.PI * this.state.shopLo / 180
    var radlon2 = Math.PI * parseFloat(a.substring(b + 1, a.length)) / 180
    var theta = this.state.shopLo - parseFloat(a.substring(b + 1, a.length))
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344
    var shipMonney = 0;
    if (dist >= 5 && dist < 10) {
      shipMonney = 50000;
    } else if (dist >= 10 && dist < 25) {
      shipMonney = 100000;
    } else if (dist >= 25 && dist < 50) {
      shipMonney = 200000;
    } else if (dist >= 50) {
      shipMonney = 250000;
    }
    this.setState({ shipMonney: shipMonney });
  }
  componentDidMount() {
    this.getShipMoney();
  }
  GetCurrentDate = () => {
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
  setModalVisibleConfirm = (visible) => {
    if (auth().currentUser) {
      this.setState({ modalVisibleConfirm: visible });
    }
  };
  handleCloseConfirm = () => {
    this.setState({
      modalVisibleConfirm: false
    });
  };
  setModalVisible = (visible) => {
    if (auth().currentUser) {
      this.setState({ modalVisible: visible }, () => { setTimeout(this.handleClose, 10000) });
    }
  };
  handleClose = () => {
    this.setState({
      modalVisible: false
    });
    this.props.navigation.navigate("App");
  };
  thanhToan = async () => {
    if (this.state.checked == "first") {
      var key = this.itemRef.ref().child('Orders/').push().key;
      var phone = this.props.address.ShipPhone;
      var name = this.props.address.ShipName;
      var location = this.props.address.Location;
      var diachi = this.props.address.NumberAddress + ", " + this.props.address.Xa + ", " + this.props.address.Huyen + ", " + this.props.address.City;
      this.itemRef.ref('Orders/' + key).set({
        Status: 1,
        CreatedDate: this.GetCurrentDate(),
        ShipAddress: diachi,
        ShipName: name,
        ShipMoblie: phone,
        OrderID: key,
        Payment: "01",
        ShipPayment:this.state.shipMonney,
        Total: this.props.amount + this.state.shipMonney,
        CustomerID: auth().currentUser.uid,
        ShipLocation: location,
        TimeLine: {
          ChoLayHang: "",
          ChoXacNhan: "",
          DaGiaoHang: "",
          DaHuy: "",
          DangVanChuyen: "",
          TraHang: "",
        },
      });
      await (this.itemRef.ref("Cart/" + auth().currentUser.uid).once("value").then((snapshot) => {
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
      }))
      this.setModalVisible(true);
    }
    else {
      this.handleCloseConfirm();
      this.props.navigation.navigate("ZaloPayScreen", { amount: this.props.amount,shipMonney:this.state.shipMonney, listItem: this.props.CartItem, Address: this.props.address });
    }
  }
  render() {
    const { navigation } = this.props;
    const { modalVisible ,shipMonney,modalVisibleConfirm} = this.state;
    const listItem = this.props.CartItem;
    if (this.state.loading) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      );
    };
    return (
      <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#a2459a" translucent={false} />
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{ width: width / 5 }} onPress={() => navigation.goBack()}>
            <FontAwesome name="angle-left" size={35} color="#fff" style={{ marginLeft: width / 40 }} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Thanh Toán</Text>
        </View>
        <ScrollView style={{ height: height }}>
          <View style={styles.listItem}>
            <View style={{ flex: 1, margin: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.addresstitle}>Địa chỉ nhận hàng</Text>
                <TouchableOpacity
                  onPress={() => { this.props.navigation.navigate("AddressScreen") }}
                >
                  <Text style={{ color: 'green', marginRight: 5, fontSize: 17 }}>Thay đổi</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.address}>{this.props.address.NumberAddress}, {this.props.address.Xa}, {this.props.address.Huyen}, {this.props.address.City}</Text>
              <Text style={styles.address}>{this.props.address.ShipName} - {this.props.address.ShipPhone}</Text>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
              </View>
            </View>
          </View>
          <View style={styles.paymentoption}>
            <Text style={{ fontSize: 16, marginLeft: 10, color: '#000' }}>Chọn hình thức thanh toán</Text>
            <View style={styles.option}>
              <RadioButton value="first"
                color="#3399ff"
                status={this.state.checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ checked: 'first' }) }} />
              <FontAwesome name="money" size={30} color='green' />
              <Text style={{ marginLeft: width / 40, fontSize: 16, color: '#000' }}>Thanh toán tiền mặt</Text>
            </View>
            <View style={styles.option}>
              <RadioButton value="second"
                color="#3399ff"
                status={this.state.checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => { this.setState({ checked: 'second' }) }} />
              <FontAwesome name="credit-card" size={30} color='orange' />
              <Text style={{ marginLeft: width / 40, fontSize: 16, color: '#000' }}>Thanh toán trực tuyến </Text>
            </View>
          </View>
          <View style={styles.count}>
            <View flexDirection='row' justifyContent="space-between">
              <Text style={{ fontSize: 17, marginHorizontal: 10, color: '#000' }} color="#666666">Tạm tính</Text>
              <Text style={{ fontSize: 20, marginHorizontal: 10, color: '#000' }}><ReactNativeNumberFormat value={this.props.amount} /></Text>
            </View>
            <View flexDirection="row" justifyContent="space-between">
              <Text style={{ fontSize: 17, marginLeft: 10, color: '#000' }} color="#666666">Phí vận chuyển</Text>
              <Text style={{ fontSize: 20, marginHorizontal: 10, color: '#000' }}><ReactNativeNumberFormat value={shipMonney} /></Text>
            </View>
          </View>
        </ScrollView>
        <View style={{ backgroundColor: "#fff", marginBottom: 5, height: height / 7.5 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
            <Text style={{ marginLeft: 10, fontSize: 20, color: '#000' }}>Thành tiền: </Text>
            <Text color="red" style={{ fontSize: 20, marginHorizontal: 10, color: '#000' }}><ReactNativeNumberFormat value={this.props.amount + shipMonney} /></Text>
          </View>
          <TouchableOpacity style={styles.btnSubmit} onPress={() => { this.setModalVisibleConfirm(true) }}>
            <Text style={{ color: "white", fontSize: 20, alignSelf: 'center' }}>Xác Nhận</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}></View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}

          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FontAwesome5 name="kiss-wink-heart" size={70} color="#a2459a" />
              <Text style={{ ...styles.modalText, color: '#a2459a' }}>Đặt hàng thành công!</Text>
              <TouchableOpacity style={{ width: width / 1.5, height: height / 15, borderRadius: 13, backgroundColor: '#a2459a', justifyContent: 'center' }}
                onPress={() => { this.props.navigation.navigate("App") }}>
                <Text style={{ ...styles.modalText, color: '#fff', textAlign: 'center' }}>Tiếp tục mua sắm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleConfirm}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={{ ...styles.modalView, padding: width / 15, }}>
              <Text style={{...styles.address,color:'green'}}>Xác nhận đơn hàng</Text>
              <Text style={styles.address}>Địa chỉ nhận hàng: {this.props.address.NumberAddress}, {this.props.address.Xa}, {this.props.address.Huyen}, {this.props.address.City}</Text>
              <Text style={styles.address}>{this.state.checked == "first"? "Thanh toán khi nhận hàng" : "Thanh toán trực tuyến" }</Text>
              <Text style={styles.address}>Phí vận chuyển:<ReactNativeNumberFormat value={shipMonney} /></Text>
              <Text style={{...styles.address,marginBottom:20}}>Tổng tiền:<ReactNativeNumberFormat value={this.props.amount} /></Text>
              <View style={{ flexDirection: 'row' }}>    
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#2196F3", width: width / 2.5, }}
                  onPress={() => {this.thanhToan()}}
                >
                  <Text style={styles.textStyle}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#2196F3", width: width / 2.5, marginLeft: 5, }}
                  onPress={() => {this.handleCloseConfirm()}}
                >
                  <Text style={styles.textStyle}>Trở về</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 4,
    backgroundColor: '#a2459a',
  },
  headerText: {
    color: "white",
    textAlignVertical: 'center',
    marginLeft: width * 0.15,
    fontSize: 20,
  },
  itemcard: {
    backgroundColor: '#fff',
    width: width,
    height: height * 0.3,
    marginTop: width / 100,
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 2,
  },
  listItem: {
    backgroundColor: "#fff",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: 'silver',
  },
  btnSubmit: {
    width: width * 0.9,
    marginLeft: width * 0.05,
    height: height / 15,
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#a2459a'
  },
  address: {
    marginTop: 5,
    fontSize: 17
  },
  addresstitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#000'
  },
  paymentoption: {
    backgroundColor: '#fff',
    marginTop: height / 100,
  },
  option: {
    flexDirection: 'row',
    marginTop: height / 50,
  },
  count: {
    backgroundColor: '#fff',
    marginTop: height / 100,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    alignSelf: 'center'
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
    justifyContent: 'center',
    height: height / 3,
    width: width / 1.2

  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  }
});