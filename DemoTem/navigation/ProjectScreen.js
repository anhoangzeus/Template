import React from 'react';
import { Easing, Animated, Dimensions, View , StyleSheet, Image, } from 'react-native';
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Block, Text, theme } from "galio-framework";

import ComponentsScreen from '../screens/Components';
import HomeScreen from '../screens/Home';
import ItemsScreen from '../screens/Items';
import ProScreen from '../screens/Pro';
import SettingsScreen from '../screens/Settings';
import ProductScreen from '../screens/Product';
import Login1 from '../screens/Login1';
import Signup1 from '../screens/SignUp1';
import InfoUser from '../screens/InfoUser';
import Order from '../screens/Order';
import OrderXuli from '../screens/OrderXuli';
import Order_Payment from '../screens/Order_Payment';
import Order_DaGiao from '../screens/Order_DaGiao';
import Order_DangVanChuyen from '../screens/Order_DangVanChuyen';
import Order_DaHuy from '../screens/Order_DaHuy';

import CustomDrawerContent from './Menu';
import { Icon, Header } from '../components';
import { Images, materialTheme } from "../constants/";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Profile_User from '../screens/Profile_User';
import ProfileScreen from '../screens/Profile';
// import NotificationScreen from '../screens/NotificationScreen';

const { width } = Dimensions.get("screen");


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopStackOrder = createMaterialTopTabNavigator();
const StackProfile = createStackNavigator();

export function TopOrder(props){
  return(
    <View style={styles.containner}>
      <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 5}}>
      <Ionicons name="arrow-back-outline" color={'white'}  size={30} onPress={() =>props.navigation.navigate("App")}/>
      <Text style={styles.texthead}>ĐƠN HÀNG CỦA TÔI</Text>
      <Ionicons name="arrow-undo" color={'#1e88e5'} size={26} />
      </View>
          <TopStackOrder.Navigator
          tabBarOptions={{
          activeTintColor: 'blue',
          scrollEnabled: true
        }}      
      >
      <Tab.Screen name="Order" component={Order} 
      options={{
        title :"Tất cả đơn",
      }}/>
      <Tab.Screen name="Order_Payment" component={Order_Payment}
       options={{
        title :"Chờ thanh toán",
      }}/>
      <Tab.Screen name="OrderXuli" component={OrderXuli}
       options={{
        title :"Đang xử lí",
      }}/>
      <Tab.Screen name="Order_DangVanChuyen" component={Order_DangVanChuyen}
       options={{
        title :"Đang vận chuyển",
      }}/>
      <Tab.Screen name="Order_DaGiao" component={Order_DaGiao}
       options={{
        title :"Đã giao",
      }}/>
      <Tab.Screen name="Order_DaHuy" component={Order_DaHuy}
       options={{
        title :"Đã huỷ",
      }}/>

      </TopStackOrder.Navigator>
      </View>
  );
}


export function AppStack(props) {
  return (
    <Tab.Navigator
      style={{ flex: 1 }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}

        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              size={24}
              name="home"
              family="ionicons"
              color={focused ? "blue" : materialTheme.COLORS.MUTED}
              family="antdesign"
              color={focused ? "#1e88e5" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      >
      </Tab.Screen>

     
      <Tab.Screen
        name="Danh mục"
        component={ProScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              size={24}
              name="appstore1"
              family="antdesign"
              color={focused ? "blue" : materialTheme.COLORS.MUTED}
              name="burst-sale"
              family="foundation"
              color={focused ? "#1e88e5" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile_User}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              size={24}
              name="user"
              family="antdesign"
              color={focused ? "blue" : materialTheme.COLORS.MUTED}
              color={focused ? "#1e88e5" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              size={24}
              name="gears"
              family="font-awesome"
              color={focused ? "blue" : materialTheme.COLORS.MUTED}
              color={focused ? "#1e88e5" : materialTheme.COLORS.MUTED}
              style={{ marginRight: -3 }}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function ProjectStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pro" component={ProScreen} />
      <Stack.Screen name="Profile_User" component={Profile_User}/>
      <Stack.Screen 
        name="TopOrder" 
        component={TopOrder}
       />
      <Stack.Screen name="Setting" component={SettingsScreen} />
      <Stack.Screen name="Components" component={ComponentsScreen} />
      <Stack.Screen name="Product" component={ProductScreen}/>
      <Stack.Screen name="Items" component={ItemsScreen}/>
      {/* <Stack.Screen name="NotificationScreen" component={NotificationScreen}/> */}
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
    containner: {
      flex: 1,
      backgroundColor:"#1e88e5",
    },
    texthead:{
      color:"white",
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    }
  });