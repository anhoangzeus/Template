import React from 'react';
import { Easing, Animated, Dimensions, View , StyleSheet, Image} from 'react-native';
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Block, Text, theme } from "galio-framework";

import ComponentsScreen from '../screens/Components';
import HomeScreen from '../screens/Home';
import ItemsScreen from '../screens/Items';
import ProScreen from '../screens/Pro';
import Signup from '../screens/Signup';
import SettingsScreen from '../screens/Settings';
import AccountScreen from '../screens/Account';
import ProductScreen from '../screens/Product';
import Login1 from '../screens/Login1';
import Signup1 from '../screens/SignUp1';

import CustomDrawerContent from './Menu';
import { Icon, Header } from '../components';
import { Images, materialTheme } from "../constants/";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Profile_User from '../screens/Profile_User';
import ProfileScreen from '../screens/Profile';

const { width } = Dimensions.get("screen");


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Stack.Screen name="Setting" component={SettingsScreen} />
      <Stack.Screen name="Components" component={ComponentsScreen} />
      <Stack.Screen name='Account' component={AccountScreen}/>
      <Stack.Screen name="Product" component={ProductScreen}/>
      <Stack.Screen name="Items" component={ItemsScreen}/>
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
    containner: {
      flex: 1,
    },
    image: {
        width:"100%",
        height:"20%",
    },
    headderButton:{
      position: "absolute",
      color: "red"
    },
    texthead:{
      position: "absolute",
    }
  });