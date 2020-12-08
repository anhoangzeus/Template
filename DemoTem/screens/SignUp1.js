import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    ScrollView,
    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';
import {fbApp} from "../firebaseconfig";
import "firebase/auth";

const {height,width}=Dimensions.get("screen");



const SignUp1 = (navigation) => {

  const [data, setData] = React.useState({
    username: '',
    password: '',
    phone:'',
    fullname:'',
    Createby:"User",
    CreateDate:"06/11/2020",
    Status:"true",
    UserID:"",
    Avatar:"https://i.ibb.co/HDzz1rC/avartarnone.png",
    check_textInputChange: false,
    check_textInputChange1: false, 
    check_textInputChange2: false, 
    secureTextEntry: true,
    confirm_secureTextEntry: true,
});
const { signIn } = React.useContext(AuthContext);

const GetCurrentDate =()=>{
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1; 
    var year = new Date().getFullYear();
    setData({
        ...data,
        CreateDate: date + '/' +month+ "/" +year 
    }); 
}

const textInputChange2 = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            phone: val,
            check_textInputChange2: true
        });
    } else {
        setData({
            ...data,
            phone: val,
            check_textInputChange2: false
        });
    }
  }

const textInputChange = (val) => {
  if( val.length !== 0 ) {
      setData({
          ...data,
          fullname: val,
          check_textInputChange: true
      });
  } else {
      setData({
          ...data,
          fullname: val,
          check_textInputChange: false
      });
  }
}
const textInputChange1 = (val) => {
    if( val.length !== 0 ) {
        setData({
            ...data,
            username: val,
            check_textInputChange1: true
        });
    } else {
        setData({
            ...data,
            username: val,
            check_textInputChange1: false
        });
    }
  }

const handlePasswordChange = (val) => {
  setData({
      ...data,
      password: val
  });
}

const updateSecureTextEntry = () => {
  setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
  });
}

const registerHandle = (userName, password, fullname , phone ) => {
    if ( data.username.length == 0 || data.password.length == 0 || data.fullname.length == 0 
        || data.phone.length == 0) {
        Alert.alert('Lỗi!', 'Bạn chưa điền đầy đủ thông tin', [
            {text: 'Okay'}
        ]);
        return;
    }
    GetCurrentDate();
    fbApp
    .auth()
    .createUserWithEmailAndPassword(userName,password)
    .then(() =>{
        fbApp.database().ref("Users").child(fbApp.auth().currentUser.uid).set({
            FullName: data.fullname,
            Phone: data.phone,
            CreatedDate: data.CreateDate,
            CreatedBy: data.Createby,
            Status: data.Status,
            UserID: fbApp.auth().currentUser.uid,
            Password:data.password,
            Email:userName,
            Avatar:data.Avatar,
        });
        Alert.alert(
            'Thông báo',
            'Đăng kí thành công ' + data.username,
            [
                {text: 'OK', onPress:() =>{signIn()}}
            ],
            {cancelable: false}
        )
        setData({
            username:"",
            password:"",
            CreateDate:"",
            fullname:"",
            phone:"",
            UserID:""
        })
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert('Lỗi mạng!', error.message, [
            {text: 'Okay'}
        ]);                  
        return;
    });   
}
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#1ba8ff' barStyle="light-content"/>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView >
            <Text style={styles.text_footer}>Họ tên</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Họ tên"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>


            <Text style={[styles.text_footer, {
                            marginTop: 10
                        }]}>Số điện thoại</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Số điện thoại"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange2(val)}
                />
                {data.check_textInputChange2 ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>


            <Text style={[styles.text_footer, {
                            marginTop: 10
                        }]}>Tài khoản</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Tài khoản"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange1(val)}
                />
                {data.check_textInputChange1 ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            

            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Mật khẩu</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Mật khẩu"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

           
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {registerHandle(data.username, data.password, data.fullname, data.phone)}}
                >
                <LinearGradient
                      colors={['red', 'red']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Đăng kí</Text>
                </LinearGradient>
                </TouchableOpacity>

            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignUp1;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#1ba8ff',
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
      margin: height / 100
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: 'black',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
   textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#000',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});