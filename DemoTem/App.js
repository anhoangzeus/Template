import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Dimensions, StatusBar, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Screens from './navigation/Screens';
import ProjectScreen from './navigation/ProjectScreen';
import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { localNoti } from './screens/Contents/localNotification';
import { fcmService } from './screens/Contents/FCMService';
const { width, height } = Dimensions.get('screen');

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userToken: null
  };

  const [isLoading, setisLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);


  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', token: userToken })
    }, 2500)
  }, []);

  useEffect(()=>{
    if(auth().currentUser){
      const options ={
        soundName: 'default',
        playSound: true
      }
      database().ref('Orders').on('child_changed',snapshot =>{
        if(snapshot.val().CustomerID==auth().currentUser.uid){
          var notify={
            title:"Cập nhật trạng thái đơn hàng",
            body:"Đơn hàng " +snapshot.val().OrderID+" đã cập nhật trạng thái",
            id:snapshot.val().OrderID
          }
          localNoti.showNotificaton(
            0,
            notify.title,
            notify.body,
            notify,
            options
          )
        }    
      })
    }
   
  })

  useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification , onOpenNotifiaton)
    localNoti.configure(onOpenNotifiaton)

    function onRegister (token){
      console.log(token);
    }

    function onNotification(notify){
      console.log(notify);
      const options ={
        soundName: 'default',
        playSound: true
      }

      localNoti.showNotificaton(
        0,
        notify.title,
        notify.body,
        notify.message,
        notify,
        options
      )
    }

    function onOpenNotifiaton(notify){
      console.log(notify);
      return()=>{
        fcmService.unRegister();
        localNoti.unregister()
      }
    }

  }, []);
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token,
        };
      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false
        };
      case 'REGISTER':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async () => {
      let userToken;
      userToken = 'anhchangdeptrai';
      try {
        await AsyncStorage.setItem('userToken', userToken)
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'LOGIN', token: userToken });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      setUserToken(null);
      setisLoading(false);
      dispatch({ type: 'LOGOUT' });
    },
    signUp: async () => {
      let userToken;
      userToken = 'anhchangdeptrai';
      try {
        await AsyncStorage.setItem('userToken', userToken)
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'REGISTER', token: userToken })
    }
  }), []);
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar barStyle='light-content' backgroundColor='white' />
        <Image source={require("./assets/whitelogo.png")} style={{ width: width, height: height, resizeMode: 'contain' }} />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken == null ?
          auth().currentUser == null ?
            <Screens />
            :
            <Screens />
          :
          <ProjectScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
export default App;