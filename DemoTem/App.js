import React ,  { useEffect }from 'react';
import { Images, products, materialTheme , } from './constants/';
import { StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Screens from './navigation/Screens';
import ProjectScreen from './navigation/ProjectScreen';
import { AuthContext } from './components/context';
import 'firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { 
  Provider as PaperProvider, ActivityIndicator
} from 'react-native-paper';
import { fbApp } from './firebaseconfig';
import { faSlack } from '@fortawesome/free-brands-svg-icons';

const App = () => {
  let an;
  const initialLoginState = {
    isLoading: true,
    userToken: null
  };

  const [isLoading , setisLoading]= React.useState(true);
  const [userToken, setUserToken]= React.useState(null);

  useEffect(() =>{
    setTimeout(async()=>{
      let userToken;
      userToken= null;
      try{
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e){
        console.log(e);
      }
      dispatch({ type: 'REGISTER', token: userToken})
    },1000)
  }, [])

 

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return{
          ...prevState,
          isLoading: false,
          userToken:action.token,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          isLoading:false,
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
          isLoading:false,
          userToken: action.token
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn:async() => {
      let userToken;
      userToken = 'abc';
      try{
        await AsyncStorage.setItem('userToken',userToken)
      } catch(e){
          console.log(e);
      }

      dispatch({ type: 'LOGIN', token: userToken});
    },
    signOut: async() => {
      try {
         await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      setUserToken(null);
      setisLoading(false);
      dispatch({ type: 'LOGOUT' });
    },
    signUp:()=>{
      setUserToken('abc');
      setisLoading(false);
    }
  }), []);
  if(loginState.isLoading){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
          {loginState.userToken == null ? (
             <Screens/> 
          )
          :
          <ProjectScreen />
          }
    </NavigationContainer>
    </AuthContext.Provider>
  );        
}
export default App;
