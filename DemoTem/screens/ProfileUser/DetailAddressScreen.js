import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  CheckBox,
  Modal,
  TouchableOpacity,
  FlatList
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/HeaderComponent';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import AddressScreen from './AddressScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-community/picker';
import vn from '../../vn.json';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function Route_AddressDetail({ route, navigation }) {
  var searchContent = "";
  if (route.params != null) {
    const { content } = route.params.id;
    searchContent = route.params.id;
  }
  else {
    const { content } = route.params.id;
    searchContent = "";
    console.log(searchContent);
  }
  return (
    <DetailAddressScreen
      content={searchContent}
      navigation={navigation}
    />
  );
}

const { width, height } = Dimensions.get('screen');

export const DetailAddressScreen = ({ content, navigation }) => {
  const [data, setData] = React.useState({
    ListID: '',
    ShipName: '',
    ShipPhone: '',
    City: '',
    Huyen: '',
    Xa: '',
    NumberAddress: '',
    Main: false,
    check_textInputFullName: true,
    check_textInputSDT: true,
    check_textInputaddress: true,
    modalVisibleWarning: false,
  });
  const CheckBoxChange = (val) => {
    if (data.Main == false) {
      setData({
        ...data,
        Main: val
      })
    }
  }
  const textInputFullName = (val) => {
    if (val.trim().length > 0) {
      setData({
        ...data,
        ShipName: val,
        check_textInputFullName: true,
      });
    } else {
      setData({
        ...data,
        ShipName: val,
        check_textInputFullName: false,
      });
    }
  }
  const textInputAddress = (val) => {
    if (val.trim().length > 5) {
      setData({
        ...data,
        NumberAddress: val,
        check_textInputaddress: true,
      });
    } else {
      setData({
        ...data,
        NumberAddress: val,
        check_textInputaddress: false,
      });
    }
  }
  const textInputPhone = (val) => {

    if (val.trim().length == 10) {
      setData({
        ...data,
        ShipPhone: val,
        check_textInputSDT: true,
      });
    } else {
      setData({
        ...data,
        ShipPhone: val,
        check_textInputSDT: false,
      });
    }
  }
  const setModalVisibleWarning = (visible, text) => {
    setData({
      ...data,
      modalVisibleWarning: visible,
      textAlert: text
    }, setTimeout(handleClose, 2000));
  };
  const handleClose = () => {
    setData({
      ...data,
      modalVisibleWarning: false
    });
  };
  const saveChangesHandle = async () => {
    var location = '';
    //Lấy tọa độ của xã phường
    for (let i = 0; i < vn.length; i++) {
      if (vn[i].name == data.City) {
        for (let j = 0; j < vn[i].huyen.length; j++) {
          if (vn[i].huyen[j].name == data.Huyen) {
            for (let z = 0; z < vn[i].huyen[j].xa.length; z++) {
              if (vn[i].huyen[j].xa[z].name == data.Xa) {
                location = vn[i].huyen[j].xa[z].location;
                z = vn[i].huyen[j].xa.length;
              }
            }
            j = vn[i].huyen.length;
          }
        }
        i = vn.length;
      }
    }
    if (data.ShipName.length == 0 || data.ShipPhone.length == 0 || data.NumberAddress.length == 0
      || data.City == "Chọn tỉnh/thành phố" || data.Huyen == "Chọn quận/huyện" || data.Xa == "Chọn xã/phường"||
      data.City =="" ||  data.Huyen =="" || data.Xa== "" ) {
      setModalVisibleWarning(true, 'Bạn chưa điền đầy đủ thông tin');
      return;
    }
    if (auth().currentUser.uid != null) {
      if (data.ListID == "") {
        if (data.Main == true) {
          await (
            database().ref('ListAddress').child(auth().currentUser.uid)
              .orderByChild('Main')
              .once('value').then((snapshot) => {
                snapshot.forEach(function (child) {
                  if (child != data.ListID) {
                    child.ref.update({ Main: false });
                  }
                })
              })
          )
          var newPostKey = database().ref().child('ListAddress').child(auth().currentUser.uid).push().key;
          database().ref('ListAddress').child(auth().currentUser.uid).child(newPostKey).set({
            ListID: newPostKey,
            ShipName: data.ShipName,
            ShipPhone: data.ShipPhone,
            City: data.City,
            Huyen: data.Huyen,
            Xa: data.Xa,
            NumberAddress: data.NumberAddress,
            Main: true,
            Location: location,
          }).then(navigation.navigate('App'), navigation.navigate('AddressScreen')).catch()
        } else {
          var newPostKey = database().ref().child('ListAddress').child(auth().currentUser.uid).push().key;
          database().ref('ListAddress').child(auth().currentUser.uid).child(newPostKey).set({
            ListID: newPostKey,
            ShipName: data.ShipName,
            ShipPhone: data.ShipPhone,
            City: data.City,
            Huyen: data.Huyen,
            Xa: data.Xa,
            NumberAddress: data.NumberAddress,
            Main: false,
            Location: location,
          }).then(navigation.navigate('App'), navigation.navigate('AddressScreen')).catch()
        }

      } else {
        if (data.Main == true) {
          await (
            database().ref('ListAddress').child(auth().currentUser.uid)
              .orderByChild('Main')
              .once('value').then((snapshot) => {
                snapshot.forEach(function (child) {
                  if (child != data.ListID) {
                    child.ref.update({ Main: false });
                  }
                })
              })
          )
          database().ref('ListAddress').child(auth().currentUser.uid).child(data.ListID)
            .update({
              ShipName: data.ShipName,
              ShipPhone: data.ShipPhone,
              City: data.City,
              Huyen: data.Huyen,
              Xa: data.Xa,
              NumberAddress: data.NumberAddress,
              Main: true,
              Location: location,
            }).then(navigation.navigate('App'), navigation.navigate('AddressScreen')).catch()

        } else {
          database().ref('ListAddress').child(auth().currentUser.uid).child(data.ListID)
            .update({
              ShipName: data.ShipName,
              ShipPhone: data.ShipPhone,
              City: data.City,
              Huyen: data.Huyen,
              Xa: data.Xa,
              NumberAddress: data.NumberAddress,
              Main: data.Main,
              Location: location,
            }).then(navigation.navigate('App'), navigation.navigate('AddressScreen')).catch()
        }

      }
    }
  }
  //Lấy dữ liệu tỉnh/tp từ all.json
  const provinceData = () => {
    var items = [{ "id": 0, "name": "Chọn tỉnh/thành phố" }, ...vn];
    return (items.map((item, i) => {
      <View style={{ backgroundColor: "#fff", justifyContent: "center", flex: 1 }}>

      </View>
      return (<Picker.Item label={item.name} key={i} value={item.name} />)
    }));
  }
  //Lấy dữ liệu quận từ all.json
  const districtData = (pname) => {
    var items = [{ "id": 0, "name": "Chọn quận/huyện" }]
    if (pname != "Chọn tỉnh/thành phố") {
      for (let i = 0; i < vn.length; i++) {
        if (vn[i].name == pname) {
          items = [...items, ...vn[i].huyen];
          i = vn.length;
        }
      }
    }
    return (items.map((item, i) => {
      return (<Picker.Item label={item.name} key={i} value={item.name} />)
    }));
  }
  //Lấy dữ liệu phường từ all.json
  const wardData = (pname, dname) => {
    var items = [{ "id": 0, "name": "Chọn xã/phường" }]
    if (pname != "Chọn tỉnh/thành phố" && dname != "Chọn quận/huyện") {
      for (let i = 0; i < vn.length; i++) {
        if (vn[i].name == pname) {
          for (let j = 0; j < vn[i].huyen.length; j++) {
            if (vn[i].huyen[j].name == dname) {
              items = [...items, ...vn[i].huyen[j].xa];
              j = vn[i].huyen.length;
            }
          }
          i = vn.length;
        }
      }
    }
    return (items.map((item, i) => {
      return (<Picker.Item label={item.name} key={i} value={item.name} />)
    }));
  }
  useState(() => {
    if (auth().currentUser.uid != null && content != "") {
      database().ref('ListAddress').child(auth().currentUser.uid).child(content)
        .once('value', snapshot => {
          setData({
            ...data,
            NumberAddress: snapshot.val().NumberAddress,
            ShipName: snapshot.val().ShipName,
            ShipPhone: snapshot.val().ShipPhone,
            City: snapshot.val().City,
            Huyen: snapshot.val().Huyen,
            Xa: snapshot.val().Xa,
            ListID: snapshot.val().ListID,
            Main: snapshot.val().Main,
          })
        });
      CheckBoxChange(data.Main);
    }
  });
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor='#a2459a' barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.cartContainer} onPress={() => { navigation.goBack() }}>
          <FontAwesome name="angle-left" size={30} color="#fff" style={{ marginLeft: width / 40 }} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cập nhật địa chỉ</Text>
      </View>
      <View style={styles.divider} />
      <ScrollView>
        <View style={styles.bodyContainer}>
          <View style={styles.userContainer}>
            <View style={styles.textContainer}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text
                  style={data.check_textInputFullName
                    ? styles.titletext
                    :
                    styles.errtext}>Họ tên</Text>
                {data.check_textInputFullName ? null :
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Vui lòng kiểm tra lại</Text>
                  </Animatable.View>
                }
              </View>
              <TextInput
                placeholderTextColor="#666666"
                autoCapitalize="none"
                onChangeText={(val) => textInputFullName(val)}
                style={styles.welcomeText}
              >{data.ShipName}</TextInput>
            </View>
          </View>
          {
            data.check_textInputFullName ?
              <View style={styles.divider} />
              :
              <View style={{ height: 2, backgroundColor: 'red' }} />
          }

          <View style={styles.userContainer}>
            <View style={styles.textContainer}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text
                  style={data.check_textInputSDT
                    ? styles.titletext
                    :
                    styles.errtext}>Số điện thoại</Text>
                {data.check_textInputSDT ? null :
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Vui lòng kiểm tra lại</Text>
                  </Animatable.View>
                }
              </View>
              <TextInput
                keyboardType='numeric'
                placeholderTextColor="#666666"
                autoCapitalize="none"
                onChangeText={(val) => textInputPhone(val)}
                style={styles.welcomeText}
              >{data.ShipPhone}</TextInput>
            </View>
          </View>
          {
            data.check_textInputSDT ?
              <View style={styles.divider} />
              :
              <View style={{ height: 2, backgroundColor: 'red' }} />
          }
          <View style={styles.userContainer}>
            <View style={styles.textContainer}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text
                  style={data.check_textInputaddress
                    ? styles.titletext
                    :
                    styles.errtext}>Địa chỉ</Text>
                {data.check_textInputaddress ? null :
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Vui lòng kiểm tra lại</Text>
                  </Animatable.View>
                }
              </View>
              <TextInput
                placeholderTextColor="#666666"
                autoCapitalize="none"
                onChangeText={(val) => textInputAddress(val)}
                style={styles.welcomeText}
              >{data.NumberAddress}</TextInput>
            </View>
          </View>
          {
            data.check_textInputaddress ?
              <View style={styles.divider} />
              :
              <View style={{ height: 2, backgroundColor: 'red' }} />
          }
          <View style={styles.divider} />
          <View style={styles.userContainer}>
            <View style={styles.textContainer}>
              <Text style={{ color: "#000" }}>Tỉnh/Thành phố</Text>
              <Picker
                style={styles.picker}
                selectedValue={data.City}
                mode='dialog'
                onValueChange={(value) => { setData({ ...data, City: value }) }}>
                {provinceData()}
              </Picker>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={{ ...styles.userContainer, flexDirection: "row" }}>
            <View style={styles.textContainer}>
              <Text style={{ color: "#000" }}>Quận/Huyện</Text>
              <Picker
                style={styles.picker1}
                selectedValue={data.Huyen}
                mode='dialog'
                onValueChange={(value) => { setData({ ...data, Huyen: value }) }}>
                {districtData(data.City)}
              </Picker>
            </View>
            <View style={styles.textContainer}>
              <Text style={{ color: "#000" }}>Phường/Xã</Text>
              <Picker
                style={styles.picker1}
                selectedValue={data.Xa}
                mode='dialog'
                onValueChange={(value) => { setData({ ...data, Xa: value }) }}>
                {wardData(data.City, data.Huyen)}
              </Picker>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.userContainer}>
            <View style={styles.totalContainer1}>
              <CheckBox
                value={data.Main}
                onValueChange={CheckBoxChange}
                style={{ marginLeft: 10 }}
              />
              <View style={{ marginHorizontal: 10 }}>
                <Text style={{ color: 'green', fontSize: 20 }}>Địa chỉ mặc định</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <TouchableOpacity style={{
          backgroundColor: '#FF3333',
          marginHorizontal: 10, marginVertical: 10, height: height / 20, borderRadius: 15
        }} onPress={() => { saveChangesHandle() }}>
          <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', marginTop: 5 }}>Lưu địa chỉ</Text>
        </TouchableOpacity >
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={data.modalVisibleWarning}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FontAwesome5 name="grin-beam-sweat" size={40} color="red" />
            <Text style={styles.modalText1}>{data.textAlert}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  userContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  totalContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#EEEEEE'
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    color: 'black',
    fontSize: 15,
  },
  divider: {
    height: 2,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 15,
  },
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: '#a2459a',
    paddingBottom: 12,

  },
  cartContainer: {
    paddingHorizontal: 20,
    width: 75
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titletext: {
    color: 'black',
    fontSize: 15,
  },
  errtext: {
    color: 'red',
    fontSize: 15,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: '#a2459a'
  },
  modalText1: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: 'red'
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  picker: {
    height: 40,
    width: width
  },
  picker1: {
    height: 40,
    width: width / 2
  }
});