import React,{Component, useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet,FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import { fbApp } from '../firebaseconfig';



const RenderList = ({CreatedDate,ShipAddress,ShipName,ShipMoblie,ToTalPrice}) =>(
  <View style={styles.listItem}>
    <View style={{alignItems:"center",flex:1, margin: 10}}>
       <Text style={{fontSize: 20, fontWeight:'bold'}}>{ShipName}</Text>
        <Text>{ShipMoblie}</Text>
        <Text >{CreatedDate}</Text>
        <Text numberOfLines={1} style={styles.address}>{ShipAddress}</Text>
        <Text style={{fontSize:20, color:"#FF00FF", fontWeight:'bold'}}>Giá: {ToTalPrice} đ</Text>
    </View >
        <TouchableOpacity style={styles.buttonXem}>
          <Text style={{color:"white", textAlign:'center'}}>Xem</Text>
        </TouchableOpacity>
</View>
);

export default class Order_DangVanChuyen extends Component{
  constructor(props) {
    super(props);
    this.state = { 
     listOrder:[]
    }; 
  }

  componentDidMount(){
    this.ListenForOrder();
  }
  ListenForOrder = () =>{    
    fbApp.database().ref('Orders').once('value').then((snapshot) => {
      var items=[];
      snapshot.forEach( function(childSnapshot){       
        var order={
          CreatedDate:'',
          ShipAddress:'',
          ShipName:'',
          ShipMoblie:'',
          id: '',
          ToTalPrice:0,
        }        
        if(childSnapshot.val().Status =="3"){
          order.CreatedDate = childSnapshot.val().CreatedDate;
          order.ShipAddress=childSnapshot.val().ShipAddress;
          order.ShipName=childSnapshot.val().ShipName;
          order.ShipMoblie=childSnapshot.val().ShipMoblie;
          order.id=childSnapshot.val().OrderID;
          fbApp.database().ref('OrderDetails').on('value', (snapshot_detail)=>{
            snapshot_detail.forEach(function(snapshot_detail){  
              if(snapshot_detail.val().OrderID == childSnapshot.val().OrderID){

                order.ToTalPrice += parseInt(snapshot_detail.val().Price) * parseInt(snapshot_detail.val().Quantity)  
              }
            })
          })
          items.push(order);     
        }                 
    });
    this.setState({
      listOrder:items
    })
  })
}
 render(){

    return (
      <View>
      <FlatList
          pagingEnabled={false}
          data={this.state.listOrder}
          renderItem={({item})=>
            <RenderList
            CreatedDate={item.CreatedDate}
            ShipAddress={item.ShipAddress}
            ShipName={item.ShipName}
            ShipMoblie={item.ShipMoblie}
            ToTalPrice={item.ToTalPrice}
        /> 
        }
      />
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
    marginTop:60
  },
  listItem:{
    margin:5,
    backgroundColor:"#fff",
    width:"90%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  },
  loader:{
    marginTop:10,
    alignItems:"center"
  },
  address:{
    fontWeight: '400'
  },
  buttonXem:{
    paddingHorizontal: 10,
    justifyContent:"center",
    alignItems:"center", 
    backgroundColor:'#FF00FF'
  }
});