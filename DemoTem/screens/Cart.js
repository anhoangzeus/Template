import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet,ScrollView, StatusBar, Dimensions, Platform,View,LogBox } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';


const { height, width } = Dimensions.get('screen');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const section_banner = require('../assets/section_banner.png');
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import {fbApp} from "../firebaseconfig";
import "firebase/auth";
import { SafeAreaView } from 'react-navigation';

export default class Cart extends Component{
    constructor(props) {
        super(props);
        LogBox.ignoreAllLogs();
        this.itemRef = fbApp.database();
        this.state = { 
         
        }; 
      }
    render(){
      const { navigation } = this.props;
        return(      
     <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="times" size={24} color="#fff" />
          </TouchableOpacity>
        
          <Text style={styles.headerText}>Giỏ hàng</Text>  
        </View>
        <ScrollView>

        <View style={styles.itemcard}>
          <View style={{paddingLeft:10,paddingTop:5,flexDirection:"row"}}>
            <Text style={styles.itemName}>Samsung Galaxy </Text>
          <View style={{marginTop:0}}>
          <FontAwesome name="angle-right" size={30} />
          </View>
          </View>
          <View style={{flexDirection:"row"}}>
          <FontAwesome name="gift" color="green" size={24} style={styles.itemGift} ></FontAwesome>
          <Text style={{marginLeft:5, color:"green", fontSize:18}}>nhận một phần quà may mắn</Text>
          </View>
          <View style={styles.itemInfo}>
            <Image style={styles.itemImage} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQFDvqT3R4gALEzhX35l9GbjLcNt03yr7hUXQ&usqp=CAU" }}></Image>
            <View style={styles.itemDec}>
              <Text style={{marginVertical:4,fontSize:16}} numberOfLines={2}>samsung galaxy A9 64GB, màn hình tràn viền </Text>
              <Text style={{marginVertical:4,fontSize:19, color:"red"}}>24.500.000 đ</Text>
              <View style={{flexDirection:"row"}}>
                <Button style={styles.buttonUpDown}>-</Button>
                <View style={{marginTop:10}}><Text fontSize={18} >1</Text></View>
                <Button style={styles.buttonUpDown}>+</Button>
              </View>
            </View>
            <View style={{marginLeft:width/8}}>
            <FontAwesome  name="times" size={18} color="silver" />
            </View>
          </View>
        </View>

        <View style={styles.itemcard}>
          <View style={{paddingLeft:10,paddingTop:5,flexDirection:"row"}}>
            <Text style={styles.itemName}>Samsung Galaxy </Text>
          <View style={{marginTop:0}}>
          <FontAwesome name="angle-right" size={30} />
          </View>
          </View>
          <View style={{flexDirection:"row"}}>
          <FontAwesome name="gift" color="green" size={24} style={styles.itemGift} ></FontAwesome>
          <Text style={{marginLeft:5, color:"green", fontSize:18}}>nhận một phần quà may mắn</Text>
          </View>
          <View style={styles.itemInfo}>
            <Image style={styles.itemImage} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQFDvqT3R4gALEzhX35l9GbjLcNt03yr7hUXQ&usqp=CAU" }}></Image>
            <View style={styles.itemDec}>
              <Text style={{marginVertical:4,fontSize:16}} numberOfLines={2}>samsung galaxy A9 64GB, màn hình tràn viền </Text>
              <Text style={{marginVertical:4,fontSize:19, color:"red"}}>24.500.000 đ</Text>
              <View style={{flexDirection:"row"}}>
                <Button style={styles.buttonUpDown}>-</Button>
                <View style={{marginTop:10}}><Text fontSize={18} >1</Text></View>
                <Button style={styles.buttonUpDown}>+</Button>
              </View>
            </View>
            <View style={{marginLeft:width/8}}>
            <FontAwesome  name="times" size={18} color="silver" />
            </View>
          </View>
        </View>

        <View style={styles.itemcard}>
          <View style={{paddingLeft:10,paddingTop:5,flexDirection:"row"}}>
            <Text style={styles.itemName}>Samsung Galaxy </Text>
          <View style={{marginTop:0}}>
          <FontAwesome name="angle-right" size={30} />
          </View>
          </View>
          <View style={{flexDirection:"row"}}>
          <FontAwesome name="gift" color="green" size={24} style={styles.itemGift} ></FontAwesome>
          <Text style={{marginLeft:5, color:"green", fontSize:18}}>nhận một phần quà may mắn</Text>
          </View>
          <View style={styles.itemInfo}>
            <Image style={styles.itemImage} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQFDvqT3R4gALEzhX35l9GbjLcNt03yr7hUXQ&usqp=CAU" }}></Image>
            <View style={styles.itemDec}>
              <Text style={{marginVertical:4,fontSize:16}} numberOfLines={2}>samsung galaxy A9 64GB, màn hình tràn viền </Text>
              <Text style={{marginVertical:4,fontSize:19, color:"red"}}>24.500.000 đ</Text>
              <View style={{flexDirection:"row"}}>
                <Button style={styles.buttonUpDown}>-</Button>
                <View style={{marginTop:10}}><Text fontSize={18} >1</Text></View>
                <Button style={styles.buttonUpDown}>+</Button>
              </View>
            </View>
            <View style={{marginLeft:width/8}}>
            <FontAwesome  name="times" size={18} color="silver" />
            </View>
          </View>
        </View>

        
       
        </ScrollView>
        <View style={{backgroundColor:"#fff"}}>
          <View flexDirection="row">
              <Text style={{marginLeft:10, fontSize:16}}>Thành tiền: </Text>
              <View style={{marginLeft:width*0.4}}><Text color="red" style={{fontSize:20}}>30.000.000 đ</Text></View>
              
          </View>
          <Button style={styles.btnSubmit}>Tiến hành đặt hàng</Button>
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
      marginTop:5,
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
      marginTop:height/20,
      marginLeft:5
    },
    itemImage: {
      width: 100,
      height: 120,
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