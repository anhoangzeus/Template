import React,{useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { fbApp } from '../firebaseconfig';

const Order = ({navigation}) => {
  function GetListOrder = ()=>{

      fbApp.database().ref("Orders").on('value', snapshot=>{
        var items = [];
        snapshot.forEach(function(order_Snapshot){
          items.push({
            OrderID:order_Snapshot.val().OrderID,
            CreatedDate:order_Snapshot.val().CreatedDate,
            ShipAddress:order_Snapshot.val().ShipAddress,
            ShipName:order_Snapshot.val().ShipName,
            ShipMoblie:order_Snapshot.val().ShipMoblie,
          })
        }) 
      })
  }
  const [data, setdata]  = useState(initialState);
    return (
      <View style={styles.container}>
        <Text>InfoUser Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});