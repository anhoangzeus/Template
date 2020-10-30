import React from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "react-native-button";
import { AppStyles } from "../AppStyles";
//import firebase from "react-native-firebase";
import {fbApp} from "../firebaseconfig";
import "firebase/auth";

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.itemRef = fbApp.database();
    this.state = {
      
      fullname: "",
      phone: "",
      email: "",
      password: ""
    };
  }

//   componentDidMount() {
//     this.authSubscription = firebase.auth().onAuthStateChanged(user => {
//       this.setState({
//         loading: false,
//         user
//       });
//     });
//   }

//   componentWillUnmount() {
//     this.authSubscription();
//   }

//   onRegister = () => {
//     const { email, password } = this.state;
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then(response => {
//         const { navigation } = this.props;
//         const { fullname, phone, email } = this.state;
//         const data = {
//           email: email,
//           fullname: fullname,
//           phone: phone,
//           appIdentifier: "rn-android-universal-listings"
//         };
//         user_uid = response.user._user.uid;
//         firebase
//           .firestore()
//           .collection("users")
//           .doc(user_uid)
//           .set(data);
//         firebase
//           .firestore()
//           .collection("users")
//           .doc(user_uid)
//           .get()
//           .then(function(user) {
//             navigation.dispatch({ type: "Login", user: user });
//           })
//           .catch(function(error) {
//             const { code, message } = error;
//             alert(message);
//           });
//       })
//       .catch(error => {
//         const { code, message } = error;
//         alert(message);
//       });
//   };

onRegister =() =>{
  
  fbApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then(()=>{
    Alert.alert(
      'Alert Title',
      'đăng ký thành công '+this.setState.email,
      [
        {text: 'Cancel', onPress: ()=> console.log('Canceled'), style:'cancel'},
        {text:'OK', onPress:()=> {this.props.navigation.navigate("AppStack")}},
      ],
      {cancelable:false}
    )
    this.setState({
      email:'',
      password:''
    })
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    
    // ...
  });
  //this.PushData();
}

PushData = () =>{
  
  this.itemRef.ref('Users').push({
    FirstName: this.state.fullname,
    Phone: this.state.phone,
    Email: this.state.email,
    Passwords: this.state.password
  })
  console.log("done");
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Full Name"
             onChangeText={fullname => this.setState({ fullname })}
             value={this.state.fullname}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Phone Number"
             onChangeText={phone => this.setState({ phone })}
             value={this.state.phone}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="E-mail Address"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Password"
            secureTextEntry={true}
             onChangeText={password => this.setState({ password})}
            value={this.state.password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button
          containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
          style={styles.facebookText}
           onPress={() => this.onRegister()}
        >
          Sign Up
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  }
});

export default SignupScreen;
