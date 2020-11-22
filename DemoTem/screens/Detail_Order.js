import React, { Component} from 'react';
import {StyleSheet, View, Text, StatusBar,Image, Dimensions, ScrollView} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/HeaderComponent';
import {fbApp} from "../firebaseconfig";
import "firebase/auth";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { HeaderBackButton } from '@react-navigation/stack';


const { width, height } = Dimensions.get('screen');

export default function Route_OrderDetail({ route, navigation}) {  
    var searchContent = "";    
    if (route.params != null) {
        const { content } = route.params.id;
        searchContent = route.params.id;
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
          OrderID: "",
          CreatedDate: "",
          Status: "",
          ShipName:"",
          ShipMoblie:"",
          ShipAddress:"",
          Payment:"",
          Total:0,
          ListProduct: [],
          Temp:{},
        };
      }
      getListOrder =()=>{
  
        fbApp.database().ref('Orders').child(this.props.content)
        .on('value',snapshot => {
          if(snapshot.val().Status=="1"){
            this.setState({Status:"Chờ thanh toán"})
          } else if(snapshot.val().Status=="2"){
            this.setState({Status:"Đang xử lí"})
          } else if(snapshot.val().Status=="3"){
            this.setState({Status:"Đang vận chuyển"})
          } else if(snapshot.val().Status=="4"){
            this.setState({Status:"Đã giao"})
          } else if(snapshot.val().Status=="5"){
            this.setState({Status:"Đã huỷ"})
          }
          this.setState({
            OrderID:snapshot.val().OrderID,
            CreatedDate:snapshot.val().CreatedDate,
            ShipName:snapshot.val().ShipName,
            ShipMoblie:snapshot.val().ShipMoblie,
            ShipAddress:snapshot.val().ShipAddress,
            Payment:snapshot.val().Payment,
          }) 
          fbApp.database().ref('OrderDetails').once('value').then((snapshot_detail)=>{
            var list_Details=[];
            var ToTalPrice = 0;       
            snapshot_detail.forEach(function(snapshot_detail){  
              var product = {
                ProductName:'',
                ProductImage:'https://ibb.co/mbtRJGd',
                Brand_Product:'',
                Quantity:'',
                Price: '',
                id:'',
              } 
              if(snapshot_detail.val().OrderID == snapshot.val().OrderID){
                ToTalPrice += parseInt(snapshot_detail.val().Price) * parseInt(snapshot_detail.val().Quantity)  
                product.Price = snapshot_detail.val().Price;
                product.Quantity = snapshot_detail.val().Quantity;      

                fbApp.database().ref('Products').child(snapshot_detail.val().ProductID)
                .on('value',snapshot_product =>{   

                  product.ProductName = snapshot_product.val().Name;
                  product.ProductImage = snapshot_product.val().Image;
                  fbApp.database().ref('Brands').child(snapshot_product.val().BrandID)
                  .on('value',snapshot_brand =>{
                    product.Brand_Product = snapshot_brand.val().Name;       
                  })
                })
                product.id=snapshot_detail.val().OrderDetailID;
                list_Details.push(product); 
              }                        
            })
            this.setState({ListProduct: list_Details});
            this.setState({Total: ToTalPrice});
          })
        });

        var order_id = this.state.OrderID;
        
        
      }
      componentDidMount(){
        this.getListOrder();
      }       

      RenderList = ({ProductName, BrandName, ProductImage, Quantity, Price}) =>(
        <View style={styles.userContainer}>
        <View>
            <Image source={{uri: ProductImage}} style={styles.sectionImage}/>              
        </View>
        <View style={{marginHorizontal: 10}}>
          
            <Text style={styles.titletext}>{ProductName}</Text>
             <Text style={styles.welcomeText}>Cung cấp bởi: {BrandName}</Text>
            <Text style={styles.welcomeText}>Số lượng: {Quantity}</Text>
            <Text style={{color:'red', fontWeight:'bold', fontSize:20, marginTop:10}}>{Price} đ</Text>
        </View>
      </View>
      );
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
                        <Text style={styles.headerText}>Chi tiết đơn hàng</Text>
                    </View>
                    <ScrollView >
                    <View style={styles.bodyContainer}>
                    <View style={styles.userContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.titletext}>Mã đơn hàng: {this.state.OrderID}</Text>
                            <Text style={styles.welcomeText}>Ngày đặt hàng: {this.state.CreatedDate}</Text>
                            <Text style={styles.welcomeText}>Trạng thái: {this.state.Status}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.userContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.titletext}>Địa chỉ người nhận</Text>
                            <Text style={styles.welcomeText}>Họ tên: {this.state.ShipName}</Text>
                            <Text style={styles.welcomeText}>Số điện thoại: {this.state.ShipMoblie}</Text>
                            <Text style={styles.welcomeText}>Địa chỉ: {this.state.ShipAddress}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.userContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.titletext}>Hình thức thanh toán</Text>
                            <Text style={styles.welcomeText}>{this.state.Payment}</Text>
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
                    <View style={{backgroundColor:'#fff',paddingVertical:5, paddingHorizontal:15,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.textorder}>Thông tin đơn hàng</Text>
                       <Text style={styles.textorder}>{this.state.ListProduct.length} Loại</Text>
                    </View>
                    <View style={{height: 2, backgroundColor:'#FF3030', marginHorizontal:10}}/>
                    {/*  */}
                  <FlatList
                    pagingEnabled={false}
                    data={this.state.ListProduct}
                    renderItem={({item})=>
                      <this.RenderList
                        ProductName={item.ProductName}
                        BrandName={item.Brand_Product}
                        ProductImage={item.ProductImage}
                        Price={item.Price}
                        Quantity={item.Quantity}
                      />}
                      
                />    
                </View>
                </ScrollView>
                <View style={{height:1}} />
                    <View style={styles.totalContainer}>
                      <Text style={styles.titletext1}>Tổng tiền</Text>
                      <Text style={styles.titletext1}>{this.state.Total} đ</Text>
                    </View>
                    <View style={{height:1}} />
                <View style={styles.totalContainer}>
                      <Text style={styles.titletext1}>Phí vận chuyển</Text>
                      <Text style={styles.titletext1}>0 đ</Text>
                </View>
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
      backgroundColor: '#FF3030',
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
      titletext1:{
        fontWeight: 'bold',
        color:'white',
        fontSize:20
      },
      textorder:{
        fontWeight: 'bold',
        fontSize:20,
        paddingLeft: 10 ,
        color:"#FF3030",
      },
      sectionImage: {
        width:  width / 4,
        height: height / 6.5,
        borderRadius: 4,
      },
  });
  