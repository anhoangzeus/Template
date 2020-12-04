import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet,ScrollView, StatusBar, Dimensions, Platform,View,LogBox } from 'react-native';
import {  Button, Text } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import {fbApp} from "../../firebaseconfig";
import "firebase/auth";
import NumberFormat from 'react-number-format';





export default class Payscreen  extends React.PureComponent{
    render(){
        const {navigation} = this.props;
        return(      
           
            <View>
                <Text>Thanh toán thành công</Text>
                <Button title="trang chu" onPress={()=>{
                     console.log("da vao del");
                     fbApp.database().ref("Cart/"+fbApp.auth().currentUser.uid).set({
                       
                     });
                     navigation.navigate("TopOrder");
                }}>ve trang chu</Button>
            </View>
            
        )
    }   
}
