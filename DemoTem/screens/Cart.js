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


export default class Cart extends Component{
    constructor(props) {
        super(props);
        LogBox.ignoreAllLogs();
        this.itemRef = fbApp.database();
        this.state = { 
         CartItem:[],
         refesh:true,
         amount:0,
        }; 
      }
    componentDidMount(){
          this.ListenCart();6 
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="times" size={24} color="#fff" style={{marginLeft:width/40}}/>
          </TouchableOpacity>
        
          <Text style={styles.headerText}>Giỏ hàng</Text>  
        </View>
        <ScrollView style={{height:height}}>
        <FlatList 
          data={this.state.CartItem}
          extraData={this.state.re}
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
              <Text style={{marginVertical:4,fontSize:19, color:"red"}}>{item.Price} đ</Text>
              <View style={{flexDirection:"row"}}>
                <Button style={styles.buttonUpDown}  onPress={()=>{
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
                  }
                }}>-</Button>
                <View style={{marginTop:10}}><Text fontSize={18} >{item.Quantity}</Text></View>
                <Button style={styles.buttonUpDown} onPress={
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
                       <FontAwesome  name="times" size={18} color="silver" />
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
              <View style={{marginLeft:width*0.4}}><Text color="red" style={{fontSize:20}}>{this.state.amount} đ</Text></View>
          </View>
          <Button style={styles.btnSubmit} >Tiến hành đặt hàng</Button>
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
      marginLeft:width*0.35,
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
    }
    
  });