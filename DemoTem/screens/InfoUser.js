import React, { Component }  from 'react';
import {View, SafeAreaView, StyleSheet, LogBox} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,Paragraph
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {fbApp} from "../firebaseconfig";
import "firebase/auth";

export default class InfoUser extends Component{
  constructor(props) {
    super(props);
    this.state = {
        Address: '',
        Avatar: 'https://i.ibb.co/HDzz1rC/avartarnone.png',
        CMND: '',
        FirstName: '',
        LastName: '',
        Phone: '',
    }
  }
  componentDidMount() {
    var shipper = {
        Address: '',
        Avatar: '',
        CMND: '',
        FirstName: '',
        LastName: '',
        Phone: '',
    }
    fbApp.database().ref('Shippers').child("jiEDYkCK90bCYArk7QLcL1MCnCk2")
    .on('value', (snapshot) => {
      shipper.Address = snapshot.val().Address;
      shipper.Avatar = snapshot.val().Avatar;
      shipper.CMND = snapshot.val().CMND;
      shipper.FirstName = snapshot.val().FirstName;
      shipper.LastName = snapshot.val().LastName;
      shipper.Phone = snapshot.val().Phone;       
        this.setState({
            Address : shipper.Address,
            Avatar : shipper.Avatar,
            CMND : shipper.CMND,
            FirstName : shipper.FirstName,
            LastName : shipper.LastName,
            Phone : shipper.Phone,
        });
        console.log(snapshot);         
    });              
  } 
  render(){
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: this.state.Avatar,
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{this.state.FirstName} {this.state.LastName}</Title>
            <View style={styles.row}>
              <View style={styles.section}>                            
                  <Caption style={styles.caption}>Điểm tích luỹ</Caption>
                  <Paragraph style={[styles.paragraph, styles.caption]}> 300</Paragraph>
              </View>
              <View style={styles.section}>                             
                  <Caption style={styles.caption}>Đánh giá</Caption>
                  <Paragraph style={[styles.paragraph, styles.caption]}> 7.8</Paragraph>
              </View>
             </View>               
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{this.state.Address}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{this.state.Phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{fbApp.auth().currentUser.email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>$120</Title>
            <Caption>Salary</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Đơn hàng tháng này</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-settings-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>                
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    fontWeight:'bold'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: 'black',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 26,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
});