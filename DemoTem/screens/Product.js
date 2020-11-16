import React,{Component} from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'react-native-linear-gradient';
import { HeaderBackButton } from "@react-navigation/stack";
import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import CateImg from "../assets/images/phone/laptop.jpg"

import {fbApp} from "../firebaseconfig";
import "firebase/auth";
import { Route } from 'react-router-dom';

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
    return (

      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={{uri : this.state.Image}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
 
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
              <Text color="Black" size={28} style={{ paddingBottom: 8 }}>{this.state.Name}</Text>
             
              </Block>
            </Block>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
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
              <Text size={12} color={theme.COLORS.PRIMARY} >Add Cart</Text>
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
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
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
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
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
  texthead:{
    position:'absolute',
    color:"black",
    fontSize:30
  }
});