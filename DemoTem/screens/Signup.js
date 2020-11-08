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
      Address:"",
      avartar:"https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/123200100_1101399953612537_216885686923555778_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_ohc=BR0xDD-HJ28AX86xIFo&_nc_ht=scontent.fvca1-1.fna&oh=ce2f67f79f51f78bfa3ab446777536a0&oe=5FCAEEB4",
      CMND:"000000",
      Createby:"User",
      CreateDate:"06/11/2020",
      email: "",
      fullname: "",
      lastname:"",
      modby:"",
      moddate:"",
      password: "",
      phone: "",
      statetus:"true",
      UserID:"",
      username:""    
    };
  }
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
    
    
  });
  this.PushData();
}

PushData = () =>{
  
  this.itemRef.ref('Users').push({
    Address:this.state.Address,
    Avatar:this.state.avartar,
    CMND:this.state.CMND,
    CreatedBy:this.state.Createby,
    CreatedDate:this.state.CreateDate,
    Email: this.state.email,
    FirstName: this.state.fullname,
    LastName:this.state.lastname,
    ModifiedBy:this.state.modby,
    ModifiedDate:this.state.moddate,
    Passwords:this.state.password,
    Phone: this.state.phone,
    Status:this.state.statetus,
   
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
