import React,{Component} from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Platform,View } from 'react-native';
import { Block, Text, theme,Button } from 'galio-framework';
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
  
  getData =()=>{
    console.log(this.props.content);
    this.itemRef.ref('/Products/').child(this.props.content)
    .on('value', snapshot => {
      this.setState({
        Decription:snapshot.val().Description,
        Image:snapshot.val().Image,
        Name:snapshot.val().Name,
        Price:snapshot.val().Price,
        Waranty:snapshot.val().Warranty,
      })
      console.log(snapshot.val());
    });
  }
  componentDidMount(){
    this.getData()
  }

  render() {
    const { navigation } = this.props;
    console.log("vao product");
    return (
      // <View style={styles.profile}>
      //   <ScrollView
      //   horizontal={true}
      //   pagingEnabled={true}
      //   style={{height:100}}     
      //   >
      //    <View style={styles.ImageContainer}>
      //        <Image source={{uri:this.state.Image}} style={styles.profileImage}></Image>
            
      //    </View>
      //   </ScrollView>
      //   <View>
      //   <Text>{this.state.Name}</Text>
      //   </View>
      // </View>
      <Block flex style={styles.profile}>
        <View style={styles.headerFont}>
          <TouchableOpacity onPress={()=> navigation.goBack()}> 
              <FontAwesome name="angle-left" size={30} color="#1e88e5" />
          </TouchableOpacity>
         
          <FontAwesome name="search" size={24} color="#1e88e5" style={{marginLeft:width*0.6}}/>
          <FontAwesome name="home" size={30} color="#1e88e5" style={{marginLeft:width*0.05}}/>
          <FontAwesome name="shopping-cart" size={30} color="#1e88e5" style={{marginLeft:width*0.05}}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex backgroundColor="white">
          <ScrollView horizontal = {true}
          pagingEnabled={true}
          >
          <Image
            source={{uri : this.state.Image}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            
          </Image>
          </ScrollView>
          
        </Block>
        <Block flex style={styles.options}>
          
         
          <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
              <Text color="Black" size={18} style={{ paddingBottom: 8 }}>{this.state.Name}</Text>
              <Text color="Black" size={28} style={{ paddingBottom: 0 }}>{this.state.Price} đ</Text>
              </Block>
              
            </Block>
            <Block row space="between" style={{ }}>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>136</Text>
                <Text muted size={12}>sản phẩm</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>5</Text>
                <Text muted size={12}>Đánh giá</Text>
              </Block>
              <Block middle>
              <Text bold size={12} style={{marginBottom: 8}}>{this.state.Waranty} tháng</Text>
                <Text muted size={12}>Bảo hành</Text>
              </Block>
            </Block>
            <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
              <Text size={16}>Ảnh sản phẩm</Text>
              <Text size={12} color={theme.COLORS.PRIMARY} >Buy now</Text>
            </Block>
            <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
              <Block row space="between" style={{ flexWrap: 'wrap' }} >
                
                  <Image
                    source={{uri: this.state.Image}}
                   
                    style={{width:300,height:200}}
                    style={styles.thumb}
                  ></Image>
               
              </Block>
            </Block>
          <Block>  
          <Text bold size={12} style={{marginBottom: 8}}>Decription</Text>
              <Text muted size={12}>{this.state.Decription}</Text>
          </Block>
         
        </Block>
        </ScrollView>
        <View style={{backgroundColor:"#fff"}}>
          
          <Button style={styles.btnSubmit}>thêm vào giỏ hàng</Button>
        </View>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    flex:1,
  },
  headerFont:{
    position: 'relative', 
    zIndex: 1, 
    flexDirection:"row",
    borderRadius: 27,
    backgroundColor: 'white', 
    opacity: 1 ,
    marginLeft:10,
  },
  ImageContainer:{
      marginTop:5,
      paddingLeft:10,
      paddingBottom:height/2,    
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
  profileDetails: {
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    paddingTop: -5,
    marginTop: -theme.SIZES.BASE ,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
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
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
  btnSubmit:{
    width:width*0.9,
    marginLeft:width*0.05,
  }
});