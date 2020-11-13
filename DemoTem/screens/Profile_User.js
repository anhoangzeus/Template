import React, { Component, useState, useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar, ScrollView} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/HeaderComponent';
import {fbApp} from "../firebaseconfig";
import "firebase/auth";
import{ AuthContext } from '../components/context';
import { TouchableOpacity } from 'react-native-gesture-handler';

// const logOut = async()=>{
//   await fbApp.auth().signOut().then(function() {
// }).catch(function(error) {
//   console.log(error)
// });
// }         
const ProfileUser =(navigation)=> {

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [CreatedDate, setCreatedDate] = useState("");
  const [Avatar, setAvatar] = useState("");

  const { signOut } = React.useContext(AuthContext);

  const ProfileItem = ({icon, name}) => (
    <View style={styles.itemContainer}>
      <MaterialCommunityIcons name={icon} size={26} color="#1e1e1e" />
      <Text style={[styles.itemText, {marginLeft: icon ? 20 : 0}]}>{name}</Text>
      <FontAwesome name="angle-right" size={15} color="#1e1e1e" />
    </View>
  );

  useEffect(()=>{
      fbApp.database().ref('Shippers').child(fbApp.auth().currentUser.uid)
      .on('value', (snapshot) => {
        setCreatedDate(snapshot.val().CreatedDate);
        setFirstName(snapshot.val().FirstName);
        setLastName(snapshot.val().LastName);
        setEmail(snapshot.val().Phone);
        setAvatar(snapshot.val().Avatar);
      });
    
})
    return (
      <View style={styles.screenContainer}>
        <StatusBar backgroundColor='#1e88e5' barStyle="light-content"/>
        <Header title="Cá nhân" />
        <ScrollView>
        <View style={styles.bodyContainer}>
        <TouchableOpacity onPress={()=>{}}>
          <View style={styles.userContainer}>
            <View style={styles.avatarContainer}>
              <MaterialIcons name="person" size={26} color="#fff" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>{FirstName} {LastName}</Text>
                <Text style={styles.authText}>{Email}</Text>
                <Text style={styles.authText}>Thành viên từ {CreatedDate}</Text>
            </View>
            <FontAwesome name="angle-right" size={26} color="#1e88e5" />
          </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <ProfileItem icon="file-link-outline" name="Kết nối mạng xã hội" />
          <View style={styles.divider} />
          <ProfileItem icon="cart-outline" name="Săn thưởng" />
          <View style={styles.divider} />
          <ProfileItem icon="eye-outline" name="Quản lí đơn hàng" />
          <View style={styles.divider1} />
          <ProfileItem name="Tian đã tiếp nhận" />
          <View style={styles.divider1} />
          <ProfileItem  name="Đơn hàng chờ thanh toán lại" />
          <View style={styles.divider1} />
          <ProfileItem  name="Đơn hàng đang chờ vận chuyển" />
          <View style={styles.divider1} />
          <ProfileItem  name="Đơn hàng thành công" />
          <View style={styles.divider1} />
          <ProfileItem  name="Đánh giá sản phẩm đã mua" />
          <View style={styles.divider1} />
          <ProfileItem  name="Đơn hàng đã huỷ" />
          <View style={styles.divider} />
          <ProfileItem icon="eye-outline" name="Số địa chỉ" />
          <View style={styles.divider1} />
          <ProfileItem icon="eye-outline" name="Thông tin thanh toán" />
          <View style={styles.divider} />
          <ProfileItem icon="eye-outline" name="Sản phẩm đã mua" />
          <View style={styles.divider1} />
          <ProfileItem icon="eye-outline" name="Sản phẩm đã xem" />
          <View style={styles.divider1} />
          <ProfileItem icon="eye-outline" name="Sản phẩm yêu thích" />
          <View style={styles.divider1} />
          <ProfileItem icon="eye-outline" name="Sản phẩm mua sau" />
          <View style={styles.divider} />
          <ProfileItem icon="eye-outline" name="Ưu đãi cho chủ thẻ ngân hàng" />
          <View style={styles.divider1} />
          <ProfileItem icon="eye-outline" name="Cài đặt" />
          <View style={styles.divider} />
          <ProfileItem icon="headphones" name="Hỗ trợ" />
          <View style={styles.divider} />
          <View style={styles.divider} />
        
          <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => {signOut()}}
              >
              <LinearGradient
                    colors={['blue', 'blue']}
                  style={styles.signIn}
              >
                  <Text style={[styles.textSign, {
                      color:'#fff'
                  }]}>Đăng xuất</Text>
              </LinearGradient>
              </TouchableOpacity>
              <View style={styles.divider} />
              <View style={styles.divider} />
        </View>
        </ScrollView>
      
      </View>
    );
  };
export default ProfileUser;

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
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e88e5',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  authText1: {
    color: '#1e88e5',
    fontSize: 18,
    fontWeight: '500',
  },
  welcomeText: {
    color:"black"
  },
  authText: {
    color: '#828282',
    fontWeight: '500',
    marginTop:2
  },
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
  },
  divider: {
    height: 10,
  },
  divider1:{
      height:1
  },
  button: {
    alignItems: 'center',
    marginTop: 50
},
signIn: {
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',

},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
}
});