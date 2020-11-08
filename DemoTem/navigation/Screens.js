import React from 'react';
import { Easing, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Block, Text, theme } from "galio-framework";

import ComponentsScreen from '../screens/Components';
import HomeScreen from '../screens/Home';
import ItemsScreen from '../screens/Items';
import ProfileScreen from '../screens/Profile';
import ProScreen from '../screens/Pro';
import Signup from '../screens/Signup'
import SettingsScreen from '../screens/Settings';
import LoginScreen from '../screens/Login'
import AccountScreen from '../screens/Account'
import ProductScreen from '../screens/Product'

import CustomDrawerContent from './Menu';
import { Icon, Header } from '../components';
import { Images, materialTheme } from "../constants/";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              white
              transparent
              title="Profile"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function CategoryStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Category"
      mode="card"
      headerMode="screen"
    >
      <Stack.Screen
        name="Category"
        component={ProductScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Category" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function ComponentsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Components"
        component={ComponentsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Laptop" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header 
              search
              tabs
              title="Home"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
      <Stack.Screen 
        name="Pro"
        component={ProScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header back white transparent title="" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

export function AppStack(props) {
  return (
    <Drawer.Navigator
    style={{ flex: 1 }}
    // drawerContent={props => (
    //   <CustomDrawerContent {...props} profile={profile} />
    // )}
    drawerStyle={{
      backgroundColor: "white",
      width: width * 0.8
    }}
    drawerContentOptions={{
      activeTintColor: "white",
      inactiveTintColor: "#000",
      activeBackgroundColor: materialTheme.COLORS.ACTIVE,
      inactiveBackgroundColor: "transparent",
      itemStyle: {
        width: width * 0.74,
        paddingHorizontal: 12,
        // paddingVertical: 4,
        justifyContent: "center",
        alignContent: "center",
        // alignItems: 'center',
        overflow: "hidden"
      },
      labelStyle: {
        fontSize: 18,
        fontWeight: "normal"
      }
    }}
      initialRouteName="Home"
    >
 

      <Drawer.Screen
        name="Home"
        component={HomeStack}

        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={24}
              name="shop"
              family="entypo"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      >
      </Drawer.Screen>

      <Drawer.Screen
        name="Laptop"
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={24}
              name="laptop"
              family="entypo"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginLeft: 4, marginRight: 4 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Phone"
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={24}
              name="mobile1"
              family="antdesign"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Accesories"
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={24}
              name="cpu"
              family="feather"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Sale"
        component={ProScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={24}
              name="burst-sale"
              family="foundation"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={24}
              name="profile"
              family="antdesign"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={24}
              name="gears"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: -3 }}
            />
          )
        }}
      />
     
      
      <Drawer.Screen
        name="Sign In"
        component={LoginScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={24}
              name="ios-log-in"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      
      <Drawer.Screen
        name="Sign Up"
        component={Signup}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={24}
              name="md-person-add"
              family="ionicon"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      /> 
    </Drawer.Navigator>
    
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      {/* <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        option={{
          headerTransparent: true
        }}
      /> */}
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pro" component={ProScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Setting" component={SettingsScreen} />
      <Stack.Screen name="Components" component={ComponentsScreen} />
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name='Account' component={AccountScreen}/>
      <Stack.Screen name="Product" component={ProductScreen}/>
      <Stack.Screen name="Items" component={ItemsScreen}/>
    </Stack.Navigator>
  );
}

