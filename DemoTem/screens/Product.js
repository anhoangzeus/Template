import React,{Component} from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Platform,View,Button,Text } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";


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
    
  }
  console.log(temp);
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
        <View  style={{flex:1}}>
             <View style={styles.headerFont} >
             <TouchableOpacity onPress={()=> navigation.goBack()}> 
                    <FontAwesome name="angle-left" size={30} color="#1e88e5" />
                </TouchableOpacity>
         
                <FontAwesome name="search" size={24} color="#1e88e5" style={{marginLeft:width*0.6}}/>
                <FontAwesome name="home" size={30} color="#1e88e5" style={{marginLeft:width*0.05}}/>
                <FontAwesome name="shopping-cart" size={30} color="#1e88e5" style={{marginLeft:width*0.05}}/>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
              <View backgroundColor="white">
                  <ScrollView horizontal = {true}
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
          
         
          <View  style={styles.profileDetails}>
              <View style={styles.profileTexts}>
              <Text color="Black"  style={{ paddingBottom: 8 ,fontSize:18}}>{this.state.Name}</Text>
              <Text color="Black"  style={{ paddingBottom: 0,fontSize:24 }}>{this.state.Price} đ</Text>
              </View>
              
            </View>
            <View  >
              <View >
                <Text bold size={12} style={{marginBottom: 8}}>136</Text>
                <Text muted size={12}>sản phẩm</Text>
              </View>
             
              <View >
              <Text  style={{marginBottom: 8,fontSize:12,fontWeight:"bold"}}>{this.state.Waranty} tháng</Text>
                <Text muted size={12}>Bảo hành</Text>
              </View>
            </View>
            <View  style={{ paddingVertical: 16, alignItems: 'baseline' }}>
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
          <Text bold size={12} style={{marginBottom: 8}}>Decription</Text>
              <Text muted size={12}>{this.state.Decription}</Text>
          </View>
         
        </View>

        </ScrollView>
        <View style={{backgroundColor:"#fff"}}>

          <Button style={styles.btnSubmit} title="thêm vào giỏ hàng" onPress={this.addCart}>thêm vào giỏ hàng</Button>
        </View>
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
 headerFont:{
   flexDirection:"row",
   
 },
 profileImage: {
  width: width*0.95 ,
  height: height*0.6,
},
profileContainer: {
  paddingTop:5,
  paddingLeft:10,
  width: width,
  height: height*0.5,
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
  height: thumbMeasure
},
btnSubmit:{
  width:width*0.9,
  marginLeft:width*0.05,
  backgroundColor:"red",
}
});