import React, {useState, useEffect, Component} from 'react';
import {StyleSheet, View, Text, StatusBar, ScrollView,FlatList,Alert} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/HeaderComponent';
import {fbApp} from "../firebaseconfig";
import "firebase/auth";
import{ AuthContext } from '../components/context';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class AddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         listAddress:[],
         ref:true,
        }; 
      }
    RenderList = ({NumberAddress,Xa, City, Huyen,ShipName,ShipMoblie,id,Main}) =>(
        <View style={styles.listItem}>
          <View style={{flex:1, margin: 10}}>   
            <Text style={styles.address}>{NumberAddress}, {Xa}, {Huyen}, {City}</Text>
            <Text style={{marginLeft: 10}}>{ShipName} - {ShipMoblie}</Text>
            <View style={{justifyContent:'space-between', flexDirection:'row',marginTop:10}}>
            {Main ? <Text style={{marginLeft: 10, color:'#FFCC00'}}>Địa chỉ mặc định</Text>:<Text/>}
              <View style={{flexDirection:'row'}}>
                <Feather 
                  style={{marginRight:5}}
                  name='edit' 
                  color="green" 
                  size={25}
                  onPress={()=> {this.props.navigation.navigate('DetailAddressScreen', {id: id})}}
                  />
                  {
                    Main ? null:
                    <MaterialIcons 
                      name='delete' 
                      color="red" 
                      size={25}
                      onPress={()=> {this.DeleteAddress(id,Main)}}
                    />
                  }
                  
              </View>             
            </View>                   
          </View >
      </View>
    );
    
    componentDidMount(){
       this.ListenForListAddress();
    }   
    DeleteAddress=(id,Main)=>{
      Alert.alert(
        'Bạn có chắc chắc muốn xoá',
        '',
        [
          { text: 'OK', onPress: () => {
            if(Main == false){
              fbApp.database().ref('ListAddress').child(fbApp.auth().currentUser.uid).child(id).remove();
            }
            this.ListenForListAddress();
          }}
          ,{},
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
        
        ],
        { cancelable: false }
      );
   
    }
    ListenForListAddress = () =>{           
        fbApp.database().ref('ListAddress').child(fbApp.auth().currentUser.uid)
        .once('value').then((snapshot) => {
          var items=[];
          var items1=[];
            snapshot.forEach(function(childSnapshot){ 
              var Address= {
                  ShipName:"",
                  ShipPhone:"",
                  NumberAddress:"",
                  Xa:"",
                  Huyen:"",
                  City:"",
                  ListID:"",
                  Main: false,
              }
              var Address1= {
                  ShipName:"",
                  ShipPhone:"",
                  NumberAddress:"",
                  Xa:"",
                  Huyen:"",
                  City:"",
                  ListID:"",
                  Main: true,
            } 
            if(childSnapshot.val().Main==true){
              Address1.ShipName= childSnapshot.val().ShipName;
              Address1.ShipPhone= childSnapshot.val().ShipPhone;
              Address1.NumberAddress= childSnapshot.val().NumberAddress;
              Address1.Xa= childSnapshot.val().Xa;
              Address1.Huyen= childSnapshot.val().Huyen;
              Address1.City= childSnapshot.val().City;
              Address1.ListID= childSnapshot.val().ListID;
              items1.push(Address1);
            }else{
              Address.ShipName= childSnapshot.val().ShipName;
              Address.ShipPhone= childSnapshot.val().ShipPhone;
              Address.NumberAddress= childSnapshot.val().NumberAddress;
              Address.Xa= childSnapshot.val().Xa;
              Address.Huyen= childSnapshot.val().Huyen;
              Address.City= childSnapshot.val().City;
              Address.ListID= childSnapshot.val().ListID;
              items.push(Address);
            }          
            }) 
            var list = items1.concat(items);
            this.setState({
              listAddress:list
            }) 
        });   
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
                            onPress={() =>{this.props.navigation.goBack()}}/>
                    </View>
                    <Text style={styles.headerText}>Thông tin địa chỉ</Text>   
                </View>
                         
                <View style={styles.bodyContainer}>
                <ScrollView>
                <FlatList
                        extraData={this.state.refesh}
                        pagingEnabled={false}
                        data={this.state.listAddress}
                        renderItem={({item})=>
                        <this.RenderList
                            NumberAddress={item.NumberAddress}
                            Xa={item.Xa}
                            City={item.City}
                            Huyen={item.Huyen}
                            ShipName={item.ShipName}
                            ShipMoblie={item.ShipPhone}
                            id={item.ListID}
                            Main={item.Main}
                            key={item.ListID}
                    /> 
                    }
                /> 
                  </ScrollView>  
                   
                  <TouchableOpacity 
                      onPress={()=> {this.props.navigation.navigate('DetailAddressScreen', {id: ""})}}
                      style={styles.userContainer}>
                        <View style={styles.textContainer}>      
                            <View style={{flexDirection:'row'}}>
                            <Ionicons name='add-circle-outline' color='green' size={28}/>
                            <Text style={styles.titletext}>Thêm địa chỉ mới</Text>            
                            </View>                       
                        </View>
                  </TouchableOpacity>
                 
              </View>
           
            </View>
        );
    }
}                     
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
      paddingHorizontal: 10,
      paddingVertical: 10,
      margin:10
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
        paddingHorizontal: 20,
      },
      headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
      titletext:{
        color:'green',
        fontSize:20,
        marginLeft: 20
      },
      listItem:{
        margin:10,
        backgroundColor:"#fff",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:5
      },
      address:{
        marginLeft: 10,
        fontSize: 25
      },
      buttonXem:{
        paddingHorizontal: 10,
        justifyContent:"center",
        alignItems:"center", 
        backgroundColor:'#FF00FF'
      }
  });