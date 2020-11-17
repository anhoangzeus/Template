import React, { Component} from 'react';
import {StyleSheet, View, Text, StatusBar,Image, Dimensions, ScrollView} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/HeaderComponent';
import {fbApp} from "../firebaseconfig";
import "firebase/auth";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HeaderBackButton } from '@react-navigation/stack';


const { width, height } = Dimensions.get('screen');

export default function Route_OrderDetail({ route, navigation}) {
    
    var searchContent = "";    
    if (route.params != null) {
        const { content } = route.params.id;
        searchContent = route.params.id;
        console.log(searchContent);
    }
    return (
        <Detail_Order
            content = {searchContent}
            navigation = {navigation}
        />
    );    
};
export class Detail_Order extends Component{
    constructor(props) {
        super(props);
        this.state = {
         list_Orser:[],       
        };
      }

    render(){
        return(
            <View style={styles.screenContainer}>
                <StatusBar backgroundColor='#1e88e5' barStyle="light-content"/>
                <View style={styles.headerContainer}>
                        <View style={styles.cartContainer}>
                          <Ionicons 
                            name='arrow-back-outline' 
                            color='white' 
                            size={25}
                            onPress={()=>this.props.navigation.goBack()}/>
                        </View>
                        <Text style={styles.headerText}>Đơn hàng</Text>
                    </View>
                    <ScrollView>
                    <View style={styles.bodyContainer}>
                    <View style={styles.userContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.titletext}>Mã đơn hàng: M44DNDDD544</Text>
                            <Text style={styles.welcomeText}>Ngày đặt hàng: 11:56, 16/11/2010</Text>
                            <Text style={styles.welcomeText}>Trạng thái: Đang vận chuyển</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.userContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.titletext}>Địa chỉ người nhận</Text>
                            <Text style={styles.welcomeText}>Họ tên: Nguyễn Tiến Anh</Text>
                            <Text style={styles.welcomeText}>Số điện thoại: 0353830738</Text>
                            <Text style={styles.welcomeText}>Địa chỉ: 101/183/4F, Đông Thạnh, Hóc Môn</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.userContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.titletext}>Hình thức thanh toán</Text>
                            <Text style={styles.welcomeText}>Thanh toán tiền mặt khi nhận hàng</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.userContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.titletext}>Hình thức giao hàng</Text>
                            <Text style={styles.welcomeText}>Giao hàng tiêu chuẩn</Text>
                        </View>
                    </View>
                    
                    <View style={styles.divider} />
                    <View style={{backgroundColor:'#fff',paddingVertical:10, paddingHorizontal:15}}>
                        <Text style={styles.textorder}>Thông tin đơn hàng</Text>
                    </View>
                    <View style={styles.userContainer}>
                        <View>
                            <Image source={require("../assets/item_image_1.png")} style={styles.sectionImage}/>              
                        </View>
                        <View style={{marginHorizontal: 10}}>
                          
                            <Text style={styles.titletext}>Điện thoại VinMart</Text>
                            <Text style={styles.welcomeText}>Cung cấp bởi: VinMart</Text>
                            <Text style={styles.welcomeText}>Số lượng: 1</Text>
                            <Text style={{color:'red', fontWeight:'bold', fontSize:20, marginTop:10}}>1339000 đ</Text>
                        </View>
                    </View>
                    <View style={{height:1}} />
                    <View style={styles.totalContainer}>
                      
                      <Text style={styles.titletext}>Tổng tiền</Text>
                      <Text style={styles.titletext}>1339000 đ</Text>
                    </View>
                    <View style={{height:1}} />
                    <View style={styles.totalContainer}>
                      <Text style={styles.titletext}>Phí vận chuyển</Text>
                      <Text style={styles.titletext}>0 đ</Text>
                    </View>
                </View>
                </ScrollView>
            </View>
        );
    }
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
      paddingHorizontal: 15,
      paddingVertical: 15,
    },
    totalContainer:{
      backgroundColor: '#fff',
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 15,
      justifyContent:'space-between', 
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
    },
    welcomeText: {
      color: 'black',
    },
    divider: {
      height: 10,
    },
    screenContainer: {
        flex: 1,
      },
      headerContainer: {
        flexDirection: 'row',
        paddingTop: 15,
        backgroundColor: '#1e88e5',
        paddingBottom: 12,
      },
      cartContainer: {
        paddingHorizontal: 20
      },
      headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
      titletext:{
        fontWeight: 'bold',
        color:'black',
        fontSize:20
      },
      textorder:{
        fontWeight: 'bold',
        fontSize:20,
        paddingLeft: 15 ,
      },
      sectionImage: {
        width:  width / 4,
        height: height / 6,
        borderRadius: 4,
      },
  });
  