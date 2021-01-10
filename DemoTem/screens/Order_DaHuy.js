import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, RefreshControl,ScrollView,Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
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
}
const noOder = require('../assets/process3.jpg');

export default class Order_Xuli extends Component {
  constructor (props) {
    super(props);
    this.state = {
      listOrder: [],
      loading: true,
      refreshing: false,
    };
  }
  RenderList = ({ CreatedDate, ShipAddress, ShipName, ShipMoblie, ToTalPrice, id }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => { this.props.navigation.navigate('View_OrderDetail', { id: id }) }}>
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#000' }}>{ShipName}</Text>
        <View style={{ height: 1, backgroundColor: 'silver', marginTop: 5 }} />
        <View style={{ flexDirection: 'row', marginTop: 10 }} >
          <MaterialIcons name='phone-in-talk' size={20} color="#1e88e5" />
          <Text style={{ marginLeft: 10, color: '#000' }}>{ShipMoblie}</Text>
        </View>
        <View style={{ flexDirection: 'row' }} >
          <MaterialIcons name='event-available' size={20} color="#1e88e5" />
          <Text style={{ marginLeft: 10, color: '#000' }}>{CreatedDate}</Text>
        </View>
        <View style={{ flexDirection: 'row' }} >
          <MaterialIcons name='location-on' size={20} color="#1e88e5" />
          <Text numberOfLines={1} style={styles.address}>{ShipAddress}</Text>
        </View>
        <Text style={{ fontSize: 20, color: "#1e88e5", fontWeight: 'bold', color: '#000' }}>Tổng tiền: <ReactNativeNumberFormat value={ToTalPrice} /></Text>
      </View >
      <Text style={{ color: "white", textAlign: 'center' }}>Xem</Text>
    </TouchableOpacity>
  );
  componentDidMount() {
    this.ListenForOrder();
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.ListenForOrder();
  };
  ListenForOrder = () => {
    database().ref('Orders').on('value',snapshot => {
      var items = [];
      snapshot.forEach(function (childSnapshot) {
        if (childSnapshot.val().CustomerID == auth().currentUser.uid) {
          if (childSnapshot.val().Status == "5") {
            items.push({
              CreatedDate : childSnapshot.val().CreatedDate,
              ShipAddress : childSnapshot.val().ShipAddress,
              ShipName : childSnapshot.val().ShipName,
              ShipMoblie : childSnapshot.val().ShipMoblie,
              id : childSnapshot.val().OrderID,
              ToTalPrice : childSnapshot.val().Total,
            })
          }
        }
      });
      this.setState({
        listOrder: items,
        loading: false,
        refreshing: false
      })
    })
  }
  renderNull = () => {
    return (
      <TouchableOpacity style={styles.containerNull}
        onPress={() => { this.ListenForOrder() }}
      >
        <Image source={noOder} style={{ width: 50, height: 50, }} />
        <Text style={{ fontSize: 20, color: "#1ba8ff" }}>Chưa có đơn hàng</Text>
      </TouchableOpacity>
    )
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      )
    }
    return (
      <FlatList
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }
      pagingEnabled={false}
      data={this.state.listOrder}
      initialNumToRender={10}
      renderItem={({ item }) =>
        <this.RenderList
          CreatedDate={item.CreatedDate}
          ShipAddress={item.ShipAddress}
          ShipName={item.ShipName}
          ShipMoblie={item.ShipMoblie}
          ToTalPrice={item.ToTalPrice}
          id={item.id}
          key={item.id}
        />
      }
      ListEmptyComponent={this.renderNull}
    />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
    marginTop: 60
  },
  listItem: {
    margin: 5,
    backgroundColor: "#fff",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  },
  loader: {
    marginTop: 10,
    alignItems: "center"
  },
  address: {
    fontWeight: '400',
    marginLeft: 10,
    color: '#000'
  },
  buttonXem: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FF00FF'
  },
  containerNull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'white',
    height: height / 1.27
  }
});