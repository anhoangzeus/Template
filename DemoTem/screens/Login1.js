import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Image,
    Dimensions,
    Modal
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from "@react-native-community/google-signin";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const { height, width } = Dimensions.get("screen");
const Login1 = ({ navigation }) => {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        email: '',
        CreateDate: "06/11/2020",
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        modalVisibleWarning: false,
        modalReset: false,
        textAlert: '',
        textChangPass: '',
    });

    const { colors } = useTheme();
    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 6
        ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }
    const handleTextChangpass = (val) => {
        setData({
            ...data,
            textChangPass: val,
        });
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }
    const setModalVisibleWarning = (visible, text) => {
        setData({
            ...data,
            modalVisibleWarning: visible,
            textAlert: text
        }, setTimeout(handleClose, 2000));
    };
    const handleClose = () => {
        setData({
            ...data,
            modalVisibleWarning: false
        });
    };
    const setModalResetPass = (visible) => {
        setData({
            ...data,
            modalReset: visible,
        })
    };
    const handleResetPass = () => {
        setData({
            ...data,
            modalReset: false,
            textChangPass: '',
        });
    };
    function GetCurrentDate() {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var gio = new Date().getHours();
        var phut = new Date().getMinutes();
        var giay = new Date().getSeconds();
        return date + '/' + month + "/" + year + " " + gio + ":" + phut + ":" + giay;
    }
    const loginHandle = (userName, password) => {
        if (data.username.length < 6 || data.password.length < 6) {
            setModalVisibleWarning(true, "Quý khách chưa nhập đầy đủ thông tin");
            return;
        }
        database().ref('Users').on('value', snapshot => {
            var temp = false;
            snapshot.forEach((child) => {
                if (child.val().UserName == userName) {
                    temp = true;
                    if (child.val().Passwords == password) {
                        auth().signInWithEmailAndPassword(child.val().Email, password)
                            .then(() => signIn())
                            .catch(function (error) {
                                setModalVisibleWarning(true, "Quý khách vui lòng kiểm tra lại Internet");
                                return;
                            });
                    } else {
                        setModalVisibleWarning(true, "Mật khẩu không chính xác");
                    }
                }
            })
            if (temp == false) {
                setModalVisibleWarning(true, "Tài khoản không tồn tại");
            }
        });
    }
    const loginFacebook = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            setModalVisibleWarning(true, "Huỷ đăng nhập");
        }
        const data1 = await AccessToken.getCurrentAccessToken();
        if (!data1) {
            setModalVisibleWarning(true, "Lỗi đăng nhập!!!");
        }
        const facebookCredential = auth.FacebookAuthProvider.credential(data1.accessToken);
        var CreateDate = GetCurrentDate();
        auth().signInWithCredential(facebookCredential).then(() => {
            database().ref('Users').child(auth().currentUser.uid).update({
                Avatar: auth().currentUser.photoURL,
                CMND: "",
                CreatedBy: auth().currentUser.displayName,
                CreatedDate: CreateDate,
                Email: auth().currentUser.email != null ? auth().currentUser.email : "",
                FullName: auth().currentUser.displayName,
                Phone: auth().currentUser.phoneNumber,
                Status: true,
                UserID: auth().currentUser.uid,
            }).then(() => signIn()).catch((error) => {
                setModalVisibleWarning(true, "Đăng nhập thất bại");
            });
        }).catch(error => {
            setModalVisibleWarning(true, error);
        });
    }
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '933734030914-3v0h6jlkrpqtm58llk0qgnqgsiee2vs5.apps.googleusercontent.com',
            scopes: ["https://www.googleapis.com/auth/userinfo.email"],
            offlineAccess: true,
            forceCodeForRefreshToken: false
        });
    }, []);
    const loginGoogle = async () => {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        var CreateDate = GetCurrentDate();
        auth().signInWithCredential(googleCredential)
            .then(() =>{
                console.log(auth().currentUser);
                database().ref('Users').child(auth().currentUser.uid).update({
                    Avatar: auth().currentUser.photoURL,
                    CMND: "",
                    CreatedBy: auth().currentUser.displayName,
                    CreatedDate: CreateDate,
                    Email: auth().currentUser.email != null ? auth().currentUser.email : "",
                    FullName: auth().currentUser.displayName,
                    Phone: auth().currentUser.phoneNumber,
                    Status: true,
                    UserID: auth().currentUser.uid,
                }).then(() => signIn()).catch((error) => {
                    setModalVisibleWarning(true, "Đăng nhập thất bại");
                });
            }).catch(error => {
                setModalVisibleWarning(true, error);
            });;
    }
    const sentPass = () => {
        if (data.textChangPass == "") {
            setModalVisibleWarning(true, "Bạn chưa nhập Email");
        } else {
            try {
                auth()
                    .sendPasswordResetEmail(data.textChangPass)
                    .then(() => {
                        setModalVisibleWarning(true, "Kiểm tra tài khoản Email của bạn");
                        handleResetPass();
                    })
                    .catch(function (err) {
                        handleResetPass();
                        setModalVisibleWarning(true, "Email chưa được đăng kí");
                    })
            } catch {

            }
        }

    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#1ba8ff' barStyle="light-content" />
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Tài khoản</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Tài khoản"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
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
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Tài khoản ít nhất 6 kí tự</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Mật khẩu</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Mật khẩu"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
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
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Mật khẩu ít nhất 6 kí tự</Text>
                    </Animatable.View>
                }
                <TouchableOpacity
                    onPress={() => setModalResetPass(true)}
                >
                    <Text style={{ color: '#009387', marginTop: 15 }}>Quên mật khẩu?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { loginHandle(data.username, data.password) }}
                    >
                        <LinearGradient
                            colors={['red', 'red']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Đăng nhập</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ ...styles.signIn1, backgroundColor: '#3b5998', flexDirection: 'row' }}
                        onPress={() => { loginFacebook() }}
                    >
                        <Ionicons name="logo-facebook" size={30} color="#fff" />
                        <Text style={[styles.textSign, { color: '#fff', marginLeft: 5 }]}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ ...styles.signIn1, backgroundColor: '#ffffff', flexDirection: 'row',marginLeft:5,borderWidth:1,borderColor:'#000' }}
                        onPress={() => { loginGoogle() }}
                    >
                        <Image source={require("../assets/google.png")} style={{width:30,height:30,resizeMode:'center'}}/>
                        <Text style={[styles.textSign, { color: '#000000', marginLeft: 5 }]}>Google</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={data.modalReset}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.modalView1}>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <FontAwesome5 name="times-circle" color="#fff" size={20} style={{ marginLeft: 10 }} />
                            <Text style={{ color: '#000', textAlign: "center", fontSize: 17, }}>Nhập địa chỉ Email</Text>
                            <TouchableOpacity style={{ width: width / 15, borderRadius: 10 }}
                                onPress={() => { handleResetPass() }}
                            >
                            <FontAwesome5 name="times-circle" color="red" size={20} />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            autoFocus
                            placeholder="..."
                            style={styles.textPass}
                            textAlignVertical="top"
                            autoCapitalize="none"
                            onChangeText={(val) => handleTextChangpass(val)}
                        />
                        <TouchableOpacity style={styles.btnSubmit}
                            onPress={() => sentPass()}>
                            <Text style={styles.textSubmitPasss}>Xác nhận</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={data.modalVisibleWarning}

                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <FontAwesome5 name="grin-beam-sweat" size={40} color="red" />
                        <Text style={styles.modalText1}>{data.textAlert}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Login1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1ba8ff'
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
        color: '#1ba8ff',
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
        color: '#1ba8ff',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: width / 15
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    signIn1: {
        width: '49%',
        height: 53,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    modalView: {
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        color: '#a2459a'
    },
    modalText1: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        color: 'red'
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    modalView1: {
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: width / 1.1,
        height: height / 4.5
    },
    textPass: {
        borderColor: '#000',
        borderRadius: 15,
        width: width / 1.2,
        height: height / 10,
        marginVertical: 10,
        borderWidth: 2,
        padding: 10
    },
    textSubmitPasss: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
    btnSubmit: {
        backgroundColor: "#0077b5",
        borderRadius: 10,
        width: width / 3,
        height: height / 20,
        alignSelf: 'center',
        justifyContent: 'center'
    }
});
