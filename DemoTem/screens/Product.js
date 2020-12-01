import React,{Component} from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Alert,View,Button,Text,StatusBar } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fbApp} from "../firebaseconfig";
import "firebase/auth";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.itemRef = fbApp.database();
    this.state = {
      Decription: "",
      Image: "",
      Name: "",
      Price: "",
      Waranty:"",  
    };
  }
  addCart =()=>{
    console.log("da vao:"+this.props.content);
    const Id_Item = this.props.content;
    var temp =0;
    if(fbApp.auth().currentUser != null){
      console.log('Cart/'+fbApp.auth().currentUser.uid);
      this.itemRef.ref('Cart/'+fbApp.auth().currentUser.uid).once('value').then((snapshot) => {
      console.log("snapshot: "+snapshot.val());
      snapshot.forEach(function (childSnapshot){   
        console.log(Id_Item +" và "+childSnapshot.val().Id);
        if(childSnapshot.val().Id == Id_Item){
          return 0;
        }
      }) 
    })  
    if(temp == 0){
      console.log("khac khong");
      this.itemRef.ref('/Cart/'+fbApp.auth().currentUser.uid).push({
        Id :this.props.content,
        Name:this.state.Name,
        Picture:this.state.Image,
        Price: this.state.Price,
        Quantity:1, 
      })
    } 
    Alert.alert("thêm thành công");
  }
  else{
    const {navigation}= this.props;
    navigation.navigate("Top");
  }
}
  getData =()=>{
    this.itemRef.ref('/Products/').child(this.props.content)
    .on('value', snapshot => {
      this.setState({
        Decription:snapshot.val().Description,
        Image:snapshot.val().Image,
        Name:snapshot.val().Name,
        Price:snapshot.val().Price,
        Waranty:snapshot.val().Warranty,
      })
      
    });
  }
  componentDidMount(){
    this.getData()
  }
  render() {
    const { navigation } = this.props;

    return (
        <View  style={{flex:1,backgroundColor:"silver"}}>
              <StatusBar barStyle="light-content" backgroundColor="white"/>
             <View style={styles.headerFont} >
             <TouchableOpacity onPress={()=> navigation.goBack()}> 
                    <FontAwesome name="angle-left" size={30} color="#1e88e5" style={{marginLeft: width/25}} />
                </TouchableOpacity>
         <TouchableOpacity>
         <FontAwesome name="search" size={24} color="#1e88e5" style={{marginLeft:width*0.6}}/>
         </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate("App")}>
               <FontAwesome name="home" size={30} color="#1e88e5" style={{marginLeft:width*0.05}}/>
               </TouchableOpacity>
               <TouchableOpacity>
               <FontAwesome name="shopping-cart" size={30} color="#1e88e5" style={{marginLeft:width*0.05}}/>
               </TouchableOpacity>      
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
              <View backgroundColor="white">
                  <ScrollView 
                    horizontal = {true}
                    pagingEnabled={true}
                    >
                        <Image
                          source={{uri : this.state.Image}}
                          style={styles.profileContainer}
                          imageStyle={styles.profileImage}>
                            
                    </Image>
                </ScrollView>
                </View>
          <View  style={styles.options}>
          <View >
              <View >
              <Text color="Black"  style={{ paddingBottom: 8 ,fontSize:18,marginLeft:width/40}}>{this.state.Name}</Text>
              <Image source={require("../assets/images/star.jpg")} style={{width:width/2,height:height/20,marginLeft:width/40}}/>
              <Text color="Black"  style={{ paddingBottom: 0,fontSize:24,marginLeft:width/40 }}>{this.state.Price} đ</Text>
              </View>
            </View>
            <View  >   
            <Text muted size={12} style={{marginLeft:width/40}}>Bảo hành</Text>
              <View >
              <Text  style={{marginBottom: 8,fontSize:12,fontWeight:"bold",marginLeft:width/40}}>{this.state.Waranty} tháng</Text>
              </View>
            </View>
            <View  style={{ paddingVertical: 16, alignItems: 'baseline',marginLeft:width/40 }}>
              <Text size={16}>Ảnh sản phẩm</Text>   
            </View>
            <View >
              <View  style={{ flexWrap: 'wrap' }} >
                  <Image
                    source={{uri: this.state.Image}}
                    style={{width:300,height:200}}
                    style={styles.thumb}
                  ></Image>
              </View>
            </View>
          <View>  
          <Text bold size={12} style={{marginBottom: 8,marginLeft:width/40}}>Mô tả</Text>
              <Text muted size={12} style={{marginLeft:width/40}}>{this.state.Decription}</Text>
          </View>    
        </View>
        </ScrollView>
        <View style={{backgroundColor:"#fff",flexDirection:"row",height:height/20}}>
          <FontAwesome name="comments" size={24} color="#1e88e5" style={{marginLeft:width*0.1}}/>
          <View style={{marginLeft:width*0.1,marginBottom:height*0.01,width:width*0.7}}>
              <Button style={styles.btnSubmit} color="red" title="thêm vào giỏ hàng" onPress={this.addCart}/>
          </View>
        </View>
        </View>
      
    );
  }
}
const styles = StyleSheet.create({
 headerFont:{
   flexDirection:"row",
   backgroundColor:"#fff"
 },
 profileImage: {
  width: width*0.95 ,
  height: height*0.6,

},
profileContainer: {
  paddingTop:5,
  paddingLeft:10,
  marginLeft:10,
  width: width-20,
  height: height*0.5,
  resizeMode:"contain",
},
options: {
  position: 'relative',
  paddingTop: -5,
  marginTop: 5 ,
  borderTopLeftRadius: 13,
  borderTopRightRadius: 13,
  backgroundColor: "#fff",
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 0 },
  shadowRadius: 8,
  shadowOpacity: 0.2,
  zIndex: 2,
},
thumb: {
  borderRadius: 4,
  marginVertical: 4,
  alignSelf: 'center',
  width: thumbMeasure,
  height: thumbMeasure,
  resizeMode: 'contain',
  marginLeft:10
},
btnSubmit:{
  width:width*0.7,
  marginLeft:width*0.3,
  
}
});