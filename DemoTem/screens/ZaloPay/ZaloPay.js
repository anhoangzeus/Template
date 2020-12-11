import * as React from 'react';
import { StyleSheet, Text, ScrollView, KeyboardAvoidingView, NativeModules, NativeEventEmitter } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import CryptoJS from 'crypto-js';


const { PayZaloBridge } = NativeModules;


const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

const subscription = payZaloBridgeEmitter.addListener(
    'EventPayZalo',
    (data) => {
      console.log("kết quả giao dịch");
        if(data.returnCode == 1){
          alert('Pay success!');
        }else{
          alert('Pay errror! ' + data.returnCode);
        }
    }
);


export default function App({route,navigation}) {
  const [money,setMoney] = React.useState('10000')
  const [token,setToken] = React.useState('')
  const [returncode,setReturnCode] = React.useState('')
  

  function getCurrentDateYYMMDD() {
    var todayDate = new Date().toISOString().slice(2,10);
    return todayDate.split('-').join('');
  }

  

  async function createOrder(money) {
    let apptransid = getCurrentDateYYMMDD()+ '_'+new Date().getTime()
  
    let appid = 553
    let amount = route.params.amount;
    let appuser = "TiAn"
    let apptime = (new Date).getTime()
    let embeddata = "{}"
    let item = "[id : 12]"
    let description = "mua san pham tren TiAn" + apptransid
    let hmacInput = appid +"|"+ apptransid +"|"+ appuser +"|"+ amount +"|" + apptime +"|"+ embeddata +"|" +item
    let mac = CryptoJS.HmacSHA256(hmacInput, "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q")
    console.log('====================================');
    console.log("hmacInput: " + hmacInput);
    console.log("mac: " + mac)
    console.log('====================================');
    var order = {
      'appid':appid,
      'appuser': appuser,
      'apptime' : apptime,
      'amount' : amount,
      'apptransid': apptransid,
      'embeddata' : embeddata,
      'item':item,
      'description': description,
      'mac': mac
    }
  
    console.log(order)
  
    let formBody = []
    for (let i in order) {
      var encodedKey = encodeURIComponent(i);
      var encodedValue = encodeURIComponent(order[i]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    await fetch('https://sandbox.zalopay.com.vn/v001/tpe/createorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(response => response.json())
    .then(resJson => {
      setToken(resJson.zptranstoken)
      setReturnCode(resJson.returncode)
      payOrder()
    })
    .catch((error)=>{
      console.log("error ", error)
    })
  }

  function payOrder() {
    var payZP = NativeModules.PayZaloBridge;
    payZP.payOrder(token);
   
    console.log( Object.keys(subscription));
    console.log("subscrip: "+subscription.subscriber);
    console.log("emit: "+subscription.emitter);
    console.log("listen: "+subscription.listener);
    console.log("context: "+subscription.context);
    console.log("event: "+subscription.eventType);
    console.log("key: "+subscription.key);
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.welcomeHead} >
          Xác nhận thanh toán
        </Text>
        <Text style={styles.welcome} >
          Amount: {route.params.amount}
        </Text>
        <Button
          title="Create order"
          type="outline"
          onPress={() => {createOrder(route.params.amount)}}
        />
        <Text style={styles.welcome}>ZpTranstoken: {token}</Text>
        <Text style={styles.welcome}>returncode: {returncode}</Text>
        { returncode == 1 ?
          <Button
            title="Pay order"
            type="outline"
            onPress={()=>{payOrder()}}
          /> : null
        }
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  welcomeHead: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  inputText: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center'
  },
});
