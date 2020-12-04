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

export default class Cart extends Component{
    constructor(props) {
        super(props);
        LogBox.ignoreAllLogs();
        this.itemRef = fbApp.database();
        this.state = { 
         CartItem:[],
         Address:{},
         refesh:true,
         amount:0,

        }; 
      }
    componentDidMount(){
          this.ListenCart();       
          this.GetAddress();
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

      ListenCart = () => {
        console.log("vao gio hang");
        if(fbApp.auth().currentUser){
          this.itemRef.ref('Cart/'+fbApp.auth().currentUser.uid).once('value').then((snapshot) => {
            var items =[];
            snapshot.forEach(function(childSnapshot){
              var product={
              key:'',
              Id:'',
              Name:'',
              Picture:'',
              Price:'',
              Quantity:'',
              }
              product.key=childSnapshot.key;
              product.Id=childSnapshot.val().Id;
              product.Name=childSnapshot.val().Name;
              product.Picture=childSnapshot.val().Picture;
              product.Price=childSnapshot.val().Price;
              product.Quantity=childSnapshot.val().Quantity;
              items.push(product);
            });
            this.setState({
              CartItem:items,
            })  
            console.log(this.state.amount);
          })  
        }
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
    render(){
      const { navigation } = this.props;
      console.log(this.state.CartItem);
      this.state.amount=0;
      this.state.CartItem.forEach(element =>{      
        const a = Number(element.Price);        
        this.state.amount+=(Number(element.Price) * element.Quantity);
      })  
        return(      
     <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{width:75}} onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={24} color="#fff" style={{marginLeft:width/40}}/>
          </TouchableOpacity>
        
          <Text style={styles.headerText}>Giỏ hàng</Text>  
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

        <FlatList 
          data={this.state.CartItem}
          extraData={this.state.refesh}
          renderItem={ ({item})=>
          <View style={styles.itemcard}>
          <View style={{paddingLeft:10,paddingTop:5,flexDirection:"row"}}>
            <Text style={styles.itemName}>{item.Name} </Text>
          <View style={{marginTop:0}}>
          <FontAwesome name="angle-right" size={30} />
          </View>
          </View>
          <View style={{flexDirection:"row"}}>
          <FontAwesome name="gift" color="green" size={24} style={styles.itemGift} ></FontAwesome>
          <Text style={{marginLeft:5, color:"green", fontSize:18}}>nhận một phần quà may mắn</Text>
          </View>
          <View style={styles.itemInfo}>
            <Image style={styles.itemImage} source={{uri:item.Picture }}></Image>
            <View style={styles.itemDec}>
              <Text style={{marginVertical:4,fontSize:16}} numberOfLines={2}> </Text>
              <Text style={{marginVertical:4,fontSize:19, color:"red"}}><ReactNativeNumberFormat value={item.Price}/></Text>
              <View style={{flexDirection:"row"}}>            
                  <Button style={styles.buttonUpDown} color='#ff3333' onPress={()=>{
                    if(item.Quantity>1){
                      console.log("vào sub");
                      this.itemRef.ref('Cart/'+fbApp.auth().currentUser.uid+"/"+item.key).set({
                        Id:item.Id,
                        Name:item.Name,
                        Picture:item.Picture,
                        Price:item.Price,
                        Quantity:item.Quantity-1,
                       });
                      this.state.CartItem.forEach(element => {if(element.Id == item.Id){element.Quantity=item.Quantity-1}});
                      this.setState({ 
                        refresh: !this.state.refresh
                    });
                    console.log(this.state.refesh);
                    }else{
                      this.itemRef.ref('Cart/'+fbApp.auth().currentUser.uid+'/'+item.key).set({
                      })
                      var dem=0;
                      
                      this.state.CartItem.forEach(element => {
                        if(element.Id == item.Id){return;}
                        else{
                          dem++;
                        }       
                      });
                      console.log(dem);
                      this.state.CartItem.splice(dem-1,1);
                      this.setState({ 
                        refresh: !this.state.refresh
                    });
                    }
                  }}>-</Button>
                <View style={{marginTop:10}}><Text fontSize={18} >{item.Quantity}</Text></View>
                <Button style={styles.buttonUpDown} color='#ff3333' onPress={
                  ()=>{
                    console.log("vào add");
                    this.itemRef.ref('Cart/'+fbApp.auth().currentUser.uid+"/"+item.key).set({
                      Id:item.Id,
                      Name:item.Name,
                      Picture:item.Picture,
                      Price:item.Price,
                      Quantity:item.Quantity+1,
                     })
                     this.state.CartItem.forEach(element => {if(element.Id == item.Id){element.Quantity=item.Quantity+1}});
                     this.setState({ 
                      refresh: !this.state.refresh
                  });
                  }
                }>+</Button>
              </View>
            </View>
            <View style={{marginLeft:width/8}}>
              <TouchableOpacity onPress={() =>{
                this.itemRef.ref('Cart/'+fbApp.auth().currentUser.uid+'/'+item.key).set({
                })
                var dem=0;
                
                this.state.CartItem.forEach(element => {
                  if(element.Id == item.Id){return;}
                  else{
                    dem++;
                  }       
                });
                console.log(dem);
                this.state.CartItem.splice(dem-1,1);
                this.setState({ 
                  refresh: !this.state.refresh
              });
              }}>
                       <FontAwesome  name="remove" size={25} color="red" />
              </TouchableOpacity>
            
            </View>
          </View>
        </View>
          }
        />
        </ScrollView>
        <View style={{backgroundColor:"#fff",marginBottom:5}}>
          <View flexDirection="row">
              <Text style={{marginLeft:10, fontSize:16}}>Thành tiền: </Text>
              <View style={{marginLeft:width*0.4}}><Text color="red" style={{fontSize:20}}><ReactNativeNumberFormat value={this.state.amount} /></Text></View>
          </View>
          <Button style={styles.btnSubmit} color='#ff3333' onPress={() =>{
            //  var key = fbApp.database().ref().child('Orders/').push().key;
            //  var phone = this.state.Address.ShipPhone;
            //  var name = this.state.Address.ShipName;
            //  console.log(phone);
            //  console.log(name);
            //  var diachi = this.state.Address.NumberAddress+", "+this.state.Address.Xa+", "+this.state.Address.Huyen+", "+ this.state.Address.City;
             
            //    this.itemRef.ref('/Orders/'+key).set({
            //      Status:1,
            //      CreatedDate:this.GetCurrentDate(),
            //      ShipAddress:diachi,
            //      ShipName:name,
            //      ShipMoblie:phone,
            //      OrderID: key,
            //      Payment:"01",
            //      Total:this.state.amount,
            //      CustomerID:fbApp.auth().currentUser.uid,
                 
            //    })
            //    this.state.CartItem.forEach(element =>{
            //     var keyDetail = fbApp.database().ref().child('OrderDetails/').push().key;
            //      this.itemRef.ref('/OrderDetails/'+keyDetail).set({
            //       OrderDetailID:keyDetail,
            //       OrderID:key,
            //       Price:element.Price,
            //       ProductID: element.Id,
            //       Quantity:element.Quantity
            //      })
            //    })
            this.props.navigation.navigate("Payment",{content : this.state.amount})
              }} >Tiến hành đặt hàng</Button>
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
      marginLeft:width*0.23,
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
    inputText: {
      color: '#969696',
      fontSize: 14,
      marginLeft: 8,
      fontWeight: '500',
    },
    cartContainer: {
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    bodyContainer: {
      flex: 1,
      backgroundColor: 'silver',
    },
    itemGift:{
      marginLeft:10,
      flexDirection:"row"
    },
    itemImage: {
      width: width/4,
     height:height/6,
     resizeMode:'contain'
    },
    itemInfo: {
      flexDirection: 'row',
      marginTop:height/35,
      marginLeft:5
    },
    
    itemName: {
      fontSize: 16,
      color: '#484848',
      marginVertical: 4,
      fontWeight:"bold"
    },
    itemDec:{
      marginLeft: width/20,
      marginRight:20,
      width:width*0.45,
    },
    buttonUpDown:{
     width:width/15,
     height:height/30,
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

    }
    
  });