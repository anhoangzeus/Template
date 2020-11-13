import React ,  { useEffect }from 'react';
import { Images, products, materialTheme } from './constants/';
import { NavigationContainer } from '@react-navigation/native';
import Screens from './navigation/Screens';
import ProjectScreen from './navigation/ProjectScreen';
import { AuthContext } from './components/context';
import 'firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { 
  Provider as PaperProvider, 
} from 'react-native-paper';
import { fbApp } from './firebaseconfig';

const App = () => {
  const initialLoginState = {
    userName: null,
  };
  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn:async() => {
      dispatch({ type: 'LOGIN'});
    },
    signOut: async() => {
      try {
        await fbApp.auth().signOut();
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
  }), []);


  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
          {fbApp.auth().currentUser !== null ? (
          <ProjectScreen />
          )
          :
            <Screens/>
          }
    </NavigationContainer>
    </AuthContext.Provider>
  );        
}
export default App;
