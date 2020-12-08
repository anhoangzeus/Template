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
  TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fbApp} from "../firebaseconfig";
import "firebase/auth";
import NumberFormat from 'react-number-format';
import { RadioButton } from 'react-native-paper';
import { Button } from 'galio-framework';

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
export default class Payscreen extends Component{
    constructor(props) {
        super(props);
        this.itemRef = fbApp.database();
        this.state = { 
         checked: 'first',
         loading:false
        }; 
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
      thanhToan=()=>{
        var key = this.itemRef.ref().child('Orders/').push().key;
        var phone = this.props.address.ShipPhone;
        var name = this.props.address.ShipName;
        var diachi = this.props.address.NumberAddress+", "+this.props.address.Xa+", "+this.props.address.Huyen+", "+ this.props.address.City;       
        var _listItem = this.props._listItem;

          this.itemRef.ref('Orders/'+key).set({
              Status:1,
              CreatedDate:this.GetCurrentDate(),
              ShipAddress:diachi,
              ShipName:name,
              ShipMoblie:phone,
              OrderID: key,
              Payment:"01",
              Total:this.props.amount + 50000,
              CustomerID:fbApp.auth().currentUser.uid,       
          });

          _listItem.forEach((child) => {
            var keyDetail = this.itemRef.ref().child('OrderDetails/').push().key;
              this.itemRef.ref('OrderDetails/'+keyDetail).set({
                 OrderDetailID:keyDetail,
                 OrderID:key,
                 Price:child.Price,
                 ProductID: child.Id,
                 Quantity:child.Quantity
                });
              });
            this.itemRef.ref("Cart/"+fbApp.auth().currentUser.uid).remove();
           this.props.navigation.navigate('App');
      };
  render(){
      const { navigation } = this.props;
      if (this.state.loading) {
        return (
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size="large" color="dodgerblue" />
          </View>
        );
      };
        return(      
     <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{width:width/5}} onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-left" size={35} color="#fff" style={{marginLeft:width/40}}/>
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
            <Text style={styles.address}>{this.props.address.NumberAddress}, {this.props.address.Xa}, {this.props.address.Huyen}, {this.props.address.City}</Text>
            <Text style={styles.address}>{this.props.address.ShipName} - {this.props.address.ShipPhone}</Text>
            <View style={{justifyContent:'space-between', flexDirection:'row',marginTop:10}}>
              </View>             
            </View>                   
      </View>
          <View style={styles.paymentoption}>
            <Text style={{fontSize:16,marginLeft:10}}>Chọn hình thức thanh toán</Text>
            <View style={styles.option}>
            <RadioButton value="first"
                color="#3399ff"
                status={this.state.checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => {this.setState({ checked: 'first' })}} />
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
            <View flexDirection='row' justifyContent="space-between">
              <Text style={{fontSize:17, marginHorizontal:10}} color="#666666">Tạm tính</Text>
            <Text style={{fontSize:20,marginHorizontal:10}}><ReactNativeNumberFormat value={this.props.amount} /></Text>
            </View>
            <View flexDirection="row" justifyContent="space-between">
              <Text style={{fontSize:17,marginLeft:10}} color="#666666">Phí vận chuyển</Text>
              <Text style={{fontSize:20,marginHorizontal:10}}><ReactNativeNumberFormat value={50000} /></Text>
            </View>
          </View>
        </ScrollView>
        <View style={{backgroundColor:"#fff",marginBottom:5,height:height/7.5}}>
        <View style={{flexDirection:"row" ,justifyContent:"space-between" ,marginTop:10}}>
              <Text style={{marginLeft:10, fontSize:20}}>Thành tiền: </Text>
              <Text color="red" style={{fontSize:20,marginHorizontal:10}}><ReactNativeNumberFormat value={this.props.amount + 50000} /></Text>
          </View>
          <TouchableOpacity style={styles.btnSubmit}   onPress={()=> {this.thanhToan()}}>
                <Text style={{color:"white", fontSize:20, alignSelf:'center'}}>Xác Nhận</Text>
            </TouchableOpacity>
        </View>
      <View style={styles.bodyContainer}></View>
    </View>
    );
  };
};
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
      height:height/15,
      borderRadius:10,
      justifyContent:'center',
      marginVertical:10,
      backgroundColor:'red'
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