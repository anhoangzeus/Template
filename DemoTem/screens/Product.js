import React,{Component} from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Alert,View,Button,Text,StatusBar ,FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fbApp} from "../firebaseconfig";
import "firebase/auth";
import NumberFormat from 'react-number-format';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

function ReactNativeNumberFormat({ value }) {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      renderText={formattedValue => <Text>{formattedValue} đ</Text>} 
    />
  );
}
class Product extends Component {
  constructor(props) {
    super(props);
    this.itemRef = fbApp.database();
    this.state = {
      Decription: "",
      Image: "",
      Name: "",
      Price: "",
      Waranty:"",
      List_Productlienquan:[],
      idsanpham:this.props.content
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
  getItemRespon=()=>{

    var CategoryID = this.props.CategoryID;
    var BrandID = this.props.BrandID;
    console.log(CategoryID, BrandID);
    this.itemRef.ref('Products').once('value').then((snapshot)=>{
      var items= [];
      snapshot.forEach(function(snapshot){
        var product={
          image:'https://i.ibb.co/dj6fBrX/empty.jpg',
          Name:'',
          Price:'',
          proid:''
        }
        if(snapshot.val().CategoryID == CategoryID){
          if(snapshot.val().BrandID==BrandID){
            product.image=snapshot.val().Image;
            product.Name=snapshot.val().Name;
            product.Price=snapshot.val().Price;
            product.proid=snapshot.val().ProductID;
            console.log(product);
            items.push(product);    
          }                      
        }
      })
      console.log(items);
      this.setState({
        List_Productlienquan:items
      })
    })
  }
  getData =()=>{
    this.itemRef.ref('/Products/').child(this.state.idsanpham)
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
  ProductItem = ({image, Name, Price}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: image}} style={styles.itemImage1}/>
      <Text style={styles.itemName} numberOfLines={2}>
        {Name}
      </Text>
      <ReactNativeNumberFormat value={Price} />
    </View>
  );
  componentDidMount(){
    this.getData();
    this.getItemRespon();
  }
  componentDidUpdate(prevProps, prevState){
    if(this.state.idsanpham != prevState.idsanpham){
      this.getData();
    }
  }
  render() {
    const { navigation } = this.props;
    return (
        <View  style={{flex:1,backgroundColor:"#ededed"}}>
              <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
             <View style={styles.headerFont} >
             <TouchableOpacity style={{width:50,backgroundColor:'#1e88e5', borderRadius:25,alignItems:'center',marginLeft:5,justifyContent:'center'}} onPress={()=> navigation.goBack()}> 
                    <FontAwesome name="chevron-left" size={25} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity style={{width:50,backgroundColor:'#1e88e5', borderRadius:25,marginLeft:width*0.45,alignItems:'center',justifyContent:'center'}} onPress={()=> {}}> 
                    <FontAwesome name="search" size={25} color="white"/>
            </TouchableOpacity>
               <TouchableOpacity style={{width:50,backgroundColor:'#1e88e5', borderRadius:25,marginLeft:width*0.01,alignItems:'center',justifyContent:'center'}} onPress={() => navigation.navigate("App")}>
               <FontAwesome name="home" size={30} color="white" />
               </TouchableOpacity>
               <TouchableOpacity style={{width:50,backgroundColor:'#1e88e5', borderRadius:25,marginLeft:width*0.01,alignItems:'center',justifyContent:'center'}} onPress={() => navigation.navigate("Cart")} >
               <FontAwesome name="shopping-cart" size={30} color="white" />
               </TouchableOpacity>      
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
              <View backgroundColor="white">
              <Image source={{uri : this.state.Image}}
                      style={styles.profileContainer}
                      imageStyle={styles.profileImage}/>
                </View>
          <View  style={styles.options}>
          <View>
              <View >
              <Text color="Black"  style={{ paddingBottom: 8 ,fontSize:18,marginLeft:width/40}}>{this.state.Name}</Text>
              <View style={{flexDirection:'row'}}>
                <Image source={require("../assets/images/star.jpg")} style={{width:width/4,height:height/40,marginLeft:width/40}}/>
                <TouchableOpacity style={{marginLeft:10,}}><Text style={{ color:'green'}}>(Xem 518 đánh giá)</Text></TouchableOpacity>
              </View>
              <View style={{flexDirection:'row', alignItems:'center', marginVertical:10}}>
                <Text color="Black"  style={{ fontSize:24,marginLeft:width/40, color:'black', fontWeight:'bold' }}><ReactNativeNumberFormat value={this.state.Price}/> </Text>
                <Text style={{textDecorationLine:"line-through", fontSize:15, marginLeft:15, color:"#696969"}}>3000000 đ</Text>
                <Text style={{marginLeft:10, color:'red'}}>-20%</Text>
              </View>   
                <View>  
                    <Text  style={{marginBottom: 10,fontSize:15,fontWeight:"bold",marginLeft:width/40}}>{this.state.Waranty} tháng bảo hành</Text>
              </View>      
              </View>
            </View>
          <View> 
        </View>      
        </View>
        <View style={{height:5}}/>
        <View style={{backgroundColor:'#fff',height:height/3.5}}>
          <Text bold size={12} style={{marginVertical: 10,marginLeft:width/40, fontWeight:'bold'}}>Sản phẩm tương tự</Text>
          <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{marginHorizontal:10}}
              data={this.state.List_Productlienquan}
                  renderItem={({item})=>
                  <TouchableOpacity  onPress={() => this.setState({idsanpham:item.proid})}>
                      <this.ProductItem           
                      image={item.image}
                      Name={item.Name}
                      Price={item.Price}
                  />
                  </TouchableOpacity>                    
              }
              keyExtractor={item => item.proid}                
          />        
        </View>   
          <View style={{height:5}}/>
          <View style={{backgroundColor:'#fff'}}>
          <Text bold size={12} style={{marginVertical: 10,marginLeft:width/40,fontWeight:'bold'}}>Mô tả sản phẩm</Text>
          <Text muted size={12} style={{marginHorizontal:width/40}}>  {this.state.Decription}</Text>         
          <View style={{height:25}}/>
          </View>
        </ScrollView>
        <View style={styles.devide} />
        <View style={{backgroundColor:"#fff",flexDirection:"row",height:height/16, justifyContent:'center'}}>
          <TouchableOpacity style={{width:width/1.1, backgroundColor:"#FF3333", justifyContent:'center',borderRadius:5, marginVertical:5,alignItems:'center' }} onPress={this.addCart}>
            <Text style={{color:'#fff', fontSize:15}}>Chọn mua</Text>
          </TouchableOpacity>
        </View>
        </View> 
    );
  }
}
export default Product;
const styles = StyleSheet.create({
 headerFont:{
   flexDirection:"row",
   backgroundColor:"#fff"
 },
 devide:{
   height:2
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
itemContainer: {
  width: width/3.5,
  marginRight: 12,
  marginTop: 10,
},
itemImage1: {
  width: 100,
  height: 120,
  resizeMode:'contain'
},
});