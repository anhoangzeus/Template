import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet,ScrollView, StatusBar, Dimensions, Platform,View,LogBox } from 'react-native';
import {  Button, Text } from 'galio-framework';


const { height, width } = Dimensions.get('screen');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const section_banner = require('../assets/section_banner.png');
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import {fbApp} from "../firebaseconfig";
import "firebase/auth";
import { element } from 'prop-types';
import NumberFormat from 'react-number-format';
import { RadioButton } from 'react-native-paper';

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
export default function Payment({ route, navigation}){
  console.log(route.params);
  if (route.params != null) {
      para =route.params.content;
      
  }
  return (
      <Payscreen
          amount = {para}
          navigation = {navigation}
      />
  );    
}
export class Payscreen extends Component{
    constructor(props) {
        super(props);
        LogBox.ignoreAllLogs();
        this.itemRef = fbApp.database();
        this.state = { 
         Address:{},
         checked: 'first',
        }; 
      }
    componentDidMount(){  
          this.GetAddress();
    }
    
    GetCurrentDate =()=>{
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1; 
      var year = new Date().getFullYear();
      var gio = new Date().getHours();
      var phut = new Date().getMinutes();
      var giay = new Date().getSeconds();
        return date + '/' +month+ "/" +year + " " + gio+":"+ phut+":"+giay;
    }
      GetAddress =() =>{
        if(fbApp.auth().currentUser)
        {
            this.itemRef.ref('ListAddress').child(fbApp.auth().currentUser.uid).once('value')
            .then((snapshot)=>{
              var item;
              snapshot.forEach(function(childSnapshot){
                var Address={
                  ShipName:'',
                  ShipPhone:'',
                  NumberAddress:'',
                  Xa:'',
                  Huyen:'',
                  City:'',
                }
                if(childSnapshot.val().Main==true){
                  Address.ShipName= childSnapshot.val().ShipName;
                  Address.ShipPhone= childSnapshot.val().ShipPhone;
                  Address.NumberAddress= childSnapshot.val().NumberAddress;
                  Address.Xa= childSnapshot.val().Xa;
                  Address.Huyen= childSnapshot.val().Huyen;
                  Address.City= childSnapshot.val().City;
                  item=Address;
                }
              });
              console.log(item);
              this.setState({
                Address:item,
              }) 
            })
        }
      }
      
    render(){
      const { navigation } = this.props;
      const { checked } = this.state;
        return(      
     <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{width:width/5}} onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={30} color="#fff" style={{marginLeft:width/40}}/>
          </TouchableOpacity>
          <Text style={styles.headerText}>Thanh Toán</Text>  
        </View>
        <ScrollView style={{height:height}}>     
        <View style={styles.listItem}>
          <View style={{flex:1, margin: 10}}>   
            <View style={{flexDirection:'row',justifyContent:'space-between' }}>
            <Text style={styles.addresstitle}>Địa chỉ nhận hàng</Text>
            <TouchableOpacity
              onPress={()=> {this.props.navigation.navigate("AddressScreen")}}
              >
              <Text style={{color:'green', marginRight:5, fontSize:17}}>Thay đổi</Text>
            </TouchableOpacity>
            </View>  
            <Text style={styles.address}>{this.state.Address.NumberAddress}, {this.state.Address.Xa}, {this.state.Address.Huyen}, {this.state.Address.City}</Text>
            <Text style={styles.address}>{this.state.Address.ShipName} - {this.state.Address.ShipPhone}</Text>
            <View style={{justifyContent:'space-between', flexDirection:'row',marginTop:10}}>
              </View>             
            </View>                   
      </View>
          <View style={styles.paymentoption}>
            <Text style={{fontSize:16}}>Chọn hình thức thanh toán</Text>
            <View style={styles.option}>
            <RadioButton value="first"
            color="#3399ff"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => { this.setState({ checked: 'first' }); }} />
            <FontAwesome name="money" size={30} />
            <Text style={{marginLeft:width/40,fontSize:16}}>Thanh toán tiền mặt</Text>
            </View>
            <View style={styles.option}>
            <RadioButton />
            <FontAwesome name="credit-card" size={30} />
            <Text style={{marginLeft:width/40,fontSize:16}}>Thanh toán trực tuyến (hiện chưa hỗ trợ)</Text>      
            </View>
          </View>
          <View style={styles.count}>
            <View flexDirection='row'>
              <Text style={{fontSize:17, fontWeight:'10'}} color="#666666">Tạm tính</Text>
            <Text style={{marginLeft:width/2,fontSize:20}}><ReactNativeNumberFormat value={this.props.amount} /></Text>
            </View>
            <View flexDirection='row'>
              <Text style={{fontSize:17}} color="#666666">Phí vận chuyển</Text>
              <Text style={{marginLeft:width/2,fontSize:20}}><ReactNativeNumberFormat value={50000} /></Text>
            </View>
          </View>
        </ScrollView>
        <View style={{backgroundColor:"#fff",marginBottom:5}}>
        <View flexDirection="row">
              <Text style={{marginLeft:10, fontSize:16}}>Thành tiền: </Text>
              <View style={{marginLeft:width*0.4}}><Text color="red" style={{fontSize:20}}><ReactNativeNumberFormat value={this.props.amount + 50000} /></Text></View>
          </View>
          <Button style={styles.btnSubmit} color="#ff3333" onPress={()=>{
                  var key = fbApp.database().ref().child('Orders/').push().key;
             var phone = this.state.Address.ShipPhone;
             var name = this.state.Address.ShipName;
             console.log(phone);
             console.log(name);
             var diachi = this.state.Address.NumberAddress+", "+this.state.Address.Xa+", "+this.state.Address.Huyen+", "+ this.state.Address.City;
             
               this.itemRef.ref('/Orders/'+key).set({
                 Status:1,
                 CreatedDate:this.GetCurrentDate(),
                 ShipAddress:diachi,
                 ShipName:name,
                 ShipMoblie:phone,
                 OrderID: key,
                 Payment:"01",
                 Total:this.props.amount + 50000,
                 CustomerID:fbApp.auth().currentUser.uid,
                 
               })
               this.itemRef.ref("Cart/"+fbApp.auth().currentUser.uid).once("value").then((snapshot)=>{
                 
                  snapshot.forEach(function(childSnapshot){
                  var keyDetail = fbApp.database().ref().child('OrderDetails/').push().key;
                  fbApp.database().ref('/OrderDetails/'+keyDetail).set({
                   OrderDetailID:keyDetail,
                   OrderID:key,
                   Price:childSnapshot.val().Price,
                   ProductID: childSnapshot.val().Id,
                   Quantity:childSnapshot.val().Quantity
                  })
                })
               } )
               
               this.props.navigation.navigate("TopOrder");
          }}>Xác nhận</Button>
        </View>
      <View style={styles.bodyContainer}></View>
    </View>
        )
    }
}
const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor:"silver"
    },
    headerContainer: {
      flexDirection: 'row',
      paddingTop: 10,
      paddingBottom: 4,
      backgroundColor: '#1e88e5',
    },
    headerText:{
      color:"white",
      textAlignVertical: 'center',
      marginLeft:width*0.15,
      fontSize:20,
    },
    itemcard:{
      backgroundColor:'#fff',
      width:width,
      height:height*0.3,
      marginTop:width/100,
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
    listItem:{
      backgroundColor:"#fff",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5,
    },   
    bodyContainer: {
      flex: 1,
      backgroundColor: 'silver',
    },
    btnSubmit:{
      width:width*0.9,
      marginLeft:width*0.05,
    },
    address:{
      marginTop:5,
      fontSize:17
    },
    addresstitle:{
      fontWeight:'bold',
      fontSize:17
    },  
    paymentoption:{
      backgroundColor:'#fff',
      marginTop:height/100,
    },
    option:{
      flexDirection:'row',
      marginTop:height/50,
    },
    count:{
      backgroundColor:'#fff',
      marginTop:height/100,
    }
  });