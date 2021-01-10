import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  View,
  Text,
  StatusBar,
  FlatList,
  Modal,
  TouchableHighlight,
  ActivityIndicator,
  Animated
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NumberFormat from 'react-number-format';
import Swiper from 'react-native-swiper';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
function ReactNativeNumberFormat({ value }) {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      renderText={formattedValue => <Text style={{ color: "#000" }}>{formattedValue} đ</Text>}
    />
  );
}
function RatingUI({ rating, size }) {
  var point = parseInt(rating);
  switch (point) {
    case 1: return (
      <View style={{ flexDirection: "row" }}>
        <FontAwesome name="star" size={size} color="#ffd700" style={styles.reviewimg} />
        <FontAwesome name="star" size={size} color='#000' style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color='#000' style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color='#000' style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color='#000' style={{ marginLeft: 5 }} />
      </View>
    );
    case 2: return (
      <View style={{ flexDirection: "row" }}>
        <FontAwesome name="star" size={size} color="#ffd700" style={styles.reviewimg} />
        <FontAwesome name="star" size={size} color="#ffd700" style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color='#000' style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color='#000' style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color='#000' style={{ marginLeft: 5 }} />
      </View>
    );
    case 3: return (
      <View style={{ flexDirection: "row" }}>
        <FontAwesome name="star" size={size} color="#ffd700" style={styles.reviewimg} />
        <FontAwesome name="star" size={size} color="#ffd700" style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color="#ffd700" style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color='#000' style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color='#000' style={{ marginLeft: 5 }} />
      </View>
    );
    case 4: return (
      <View style={{ flexDirection: "row" }}>
        <FontAwesome name="star" size={size} color="#ffd700" style={styles.reviewimg} />
        <FontAwesome name="star" size={size} color="#ffd700" style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color="#ffd700" style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color="#ffd700" style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color='#000' style={{ marginLeft: 5 }} />
      </View>
    );
    case 5: return (
      <View style={{ flexDirection: "row" }}>
        <FontAwesome name="star" size={size} color="#ffd700" style={styles.reviewimg} />
        <FontAwesome name="star" size={size} color="#ffd700" style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color="#ffd700" style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color="#ffd700" style={{ marginLeft: 5 }} />
        <FontAwesome name="star" size={size} color="#ffd700" style={{ marginLeft: 5 }} />
      </View>
    );
    default: return null;
  }
}
export default class Product extends React.Component {
  constructor (props) {
    super(props);
    this.itemRef = database();
    this.state = {
      numcart: 0,
      Decription: "",
      Image: "",
      Name: "",
      Price: "",
      Waranty: "",
      PromotionPrice: "",
      MetaDescription: "",
      List_Productlienquan: [],
      List_MoreImage: [],
      List_Comment: [],
      idsanpham: this.props.content,
      listcart: [],
      modalVisible: false,
      scrollY: new Animated.Value(0),
      isloaing: true,
      BrandName: "",
      CategoryName: "",
      rating: 0,
      bough: 0,
      sao1: 0,
      sao2: 0,
      sao3: 0,
      sao4: 0,
      sao5: 0,
    };
  };
  getNameBrandCate = () => {
    this.itemRef.ref("/Catogorys/" + this.props.CategoryID).once('value').then((snapshot) => {
      this.setState({ CategoryName: snapshot.val().Name });
    });
    this.itemRef.ref("/Brands/" + this.props.BrandID).once('value').then((snapshot) => {
      this.setState({ BrandName: snapshot.val().Name });
    });
  }
  addCart = () => {
    const Id_Item = this.state.idsanpham;
    var key;
    var product = {
      image: 'https://i.ibb.co/dj6fBrX/empty.jpg',
      Name: '',
      Price: '',
      ProductID: '',
      Quantity: 0,
    }
    var temp = 0;
    this.state.listcart.forEach(function (element) {
      if (element.Id == Id_Item) {
        element.Quantity += 1;
        temp += 1;
        product.image = element.Picture;
        product.Name = element.Name;
        key = element.key;
        product.Price = element.Price;
        product.ProductID = element.Id;
        product.Quantity = element.Quantity;
      }
    })
    if (auth().currentUser != null) {
      if (temp == 0) {
        this.itemRef.ref('/Cart/' + auth().currentUser.uid).child(this.props.content).set({
          Id: this.props.content,
          CategoryID: this.props.CategoryID,
          BrandID: this.props.BrandID,
          CategoryName: this.state.CategoryName,
          BrandName: this.state.BrandName,
          Name: this.state.Name,
          Picture: this.state.Image,
          Price: this.state.Price,
          Quantity: 1,
        })
      }
      else {
        this.itemRef.ref('/Cart/' + auth().currentUser.uid + "/" + key).set({
          Id: product.ProductID,
          CategoryID: this.props.CategoryID,
          BrandID: this.props.BrandID,
          CategoryName: this.state.CategoryName,
          BrandName: this.state.BrandName,
          Name: product.Name,
          Picture: product.image,
          Price: product.Price,
          Quantity: product.Quantity,
        })
      }
      this.GetCartData();
    }
    else {
      this.props.navigation.navigate("Top");
    }
    this.setModalVisible(true);
  }
  getnumcart = () => {
    if (auth().currentUser) {
      this.itemRef.ref('Cart/' + auth().currentUser.uid).on('value',snapshot => {
        var dem = 0;
        snapshot.forEach(function (childSnapshot) {
          dem += childSnapshot.val().Quantity;
        });
        this.setState({
          numcart: dem,
        });
      });
    }
  }
  getItemRespon = () => {
    var CategoryID = this.props.CategoryID;
    var BrandID = this.props.BrandID;
    var ProductID = this.state.idsanpham;
    this.itemRef.ref('Products').once('value').then((snapshot) => {
      var items = [];
      snapshot.forEach(function (snapshot) {
        if (snapshot.val().ProductID != ProductID) {
          if (snapshot.val().CategoryID == CategoryID) {
            if (snapshot.val().BrandID == BrandID) {
              items.push({
                image: snapshot.val().Image,
                Name: snapshot.val().Name,
                Price: snapshot.val().Price,
                proid: snapshot.val().ProductID,
              });
            }
          }
        }
      });
      this.setState({
        List_Productlienquan: items
      });
    });
  };
  getData = () => {
    var ImageItems = [];
    this.itemRef.ref('/Products/').child(this.state.idsanpham)
      .once('value').then((snapshot) => {
        var point = 0;
        var count = 0;
        var sao1 = 0;
        var sao2 = 0;
        var sao3 = 0;
        var sao4 = 0;
        var sao5 = 0;
        var items = [];
        snapshot.child("Rating").forEach((child) => {

          if (child.val().Point == "1")
            sao1++;
          else if (child.val().Point == "2")
            sao2++;
          else if (child.val().Point == "3")
            sao3++;
          else if (child.val().Point == "4")
            sao4++;
          else if (child.val().Point == "5")
            sao5++;
          point += child.val().Point;
          count++;
          items.push({
            Avatar: child.val().Avatar,
            Comment: child.val().Comment,
            Date: child.val().Date,
            Point: child.val().Point,
            UserName: child.val().UserName,
          });
        })
        this.setState({
          Decription: snapshot.val().Description,
          Image: snapshot.val().Image,
          Name: snapshot.val().Name,
          Price: snapshot.val().Price,
          Waranty: snapshot.val().Warranty,
          MetaDescription: snapshot.val().MetaDescription,
          PromotionPrice: snapshot.val().PromotionPrice,
          rating: point / count,
          List_Comment: items,
          bough: count,
          sao1: sao1,
          sao2: sao2,
          sao3: sao3,
          sao4: sao4,
          sao5: sao5,
        });
        ImageItems.push(snapshot.val().Image);
      });
    this.itemRef.ref('/Products/').child(this.state.idsanpham).child('MoreImages')
      .once('value').then((snapshot) => {
        snapshot.forEach((child) => {
          ImageItems.push(child.val().Image)
        })
      })
    this.setState({
      List_MoreImage: ImageItems,
      isloaing: false
    })
  };
  GetCartData = () => {
    if (auth().currentUser) {
      this.itemRef.ref('Cart/' + auth().currentUser.uid).once('value').then((snapshot) => {
        var items = [];
        snapshot.forEach(function (childSnapshot) {
          var product = {
            key: '',
            Id: '',
            Name: '',
            Picture: '',
            Price: '',
            Quantity: 0,
          }
          product.key = childSnapshot.key;
          product.Id = childSnapshot.val().Id;
          product.Name = childSnapshot.val().Name;
          product.Picture = childSnapshot.val().Picture;
          product.Price = childSnapshot.val().Price;
          product.Quantity = childSnapshot.val().Quantity;
          items.push(product);
        });
        this.setState({
          listcart: items,
        });
      });
    };
  };
  ProductItem = ({ image, Name, Price }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: image }} style={styles.itemImage1} />
      <Text style={{ color: "#000" }} numberOfLines={2}>{Name}</Text>
      <ReactNativeNumberFormat value={Price} />
    </View>
  );
  CommentItem = ({ item }) => (
    <View style={{ backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
        <RatingUI rating={item.Point} size={20} />
        <Text style={{ color: '#000' }}>{item.Date}</Text>
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: '#000' }}>{item.UserName}</Text>
        <Image source={{ uri: item.Avatar }} style={{ width: 50, height: 50, borderRadius: 25, marginVertical: 5 }} />
        <Text muted style={{ color: '#000' }}>{item.Comment}</Text>
      </View>
      <View style={{ backgroundColor: '#DDDDDD', height: 1, marginHorizontal: 20, marginTop: 20 }}></View>
    </View>
  )
  renderNofiCart = () => {
    if (this.state.numcart == 0) {
      return null;
    }
    else {
      return (
        <View style={styles.cartposition}>
          <Text style={{ color: "white" }}>{this.state.numcart}</Text>
        </View>
      );
    }
  };
  setModalVisible = (visible) => {
    if (auth().currentUser) {
      this.setState({ modalVisible: visible }, () => { setTimeout(this.handleClose, 3000) });
    }
  };
  handleClose = () => {
    this.setState({
      modalVisible: false
    });
  };
  componentDidMount() {
    this.getData();
    this.getNameBrandCate();
    this.getItemRespon();
    this.GetCartData();
    this.getnumcart();
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.idsanpham != prevState.idsanpham) {
      this.getData();
      this.getItemRespon();
    }
  };

  render() {
    const { navigation } = this.props;
    const { modalVisible, PromotionPrice, Price, List_Productlienquan, rating, bough, sao1, sao2, sao3, sao4, sao5, List_Comment } = this.state;
    const HEADER_MAX_HEIGHT = height / 10;
    const HEADER_MIN_HEIGHT = height / 30;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT;
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [HEADER_MAX_HEIGHT / 2.5, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
      extrapolate: 'clamp',
    });
    if (this.state.isloaing) {
      return (
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}>
          <ActivityIndicator size='large' color="'#a2459a" />
        </View>
      )
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#ededed" }}>
        <StatusBar barStyle='dark-content' backgroundColor="transparent" translucent={true} />
        <Animated.View style={[styles.headerFont1, { height: headerHeight }]} >
          <TouchableOpacity style={{ width: 50, height: 30, backgroundColor: '#a2459a', borderRadius: 25, alignItems: 'center', marginLeft: 5, justifyContent: 'center', marginTop: 10 }} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 50, height: 30, backgroundColor: '#a2459a', borderRadius: 25, marginLeft: width * 0.45, alignItems: 'center', justifyContent: 'center', marginTop: 10 }} onPress={() => navigation.navigate("Setting")}>
            <FontAwesome name="search" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 50, height: 30, backgroundColor: '#a2459a', borderRadius: 25, marginLeft: width * 0.01, alignItems: 'center', justifyContent: 'center', marginTop: 10 }} onPress={() => navigation.navigate("App")}>
            <FontAwesome name="home" size={30} color="white" />
          </TouchableOpacity>
          <View>
            <TouchableOpacity style={{ width: 50, height: 30, backgroundColor: '#a2459a', borderRadius: 25, marginLeft: width * 0.01, alignItems: 'center', justifyContent: 'center', marginTop: 10 }} onPress={() => navigation.navigate("Cart")} >
              <FontAwesome name="shopping-cart" size={30} color="white" />
            </TouchableOpacity>
            {this.renderNofiCart()}
          </View>
        </Animated.View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
          )}
        >
          <Swiper
            loop={true}
            showsPagination={true}
            index={0}
            width={width}
            height={height / 2}
          >
            {this.state.List_MoreImage.map((item) =>
              <View backgroundColor="white" style={styles.profileContainer}>
                <Image source={{ uri: item }}
                  style={styles.profileImage} />
              </View>
            )}
          </Swiper>
          <View style={styles.headerFont} >
            <TouchableOpacity style={{ width: 50, backgroundColor: '#a2459a', borderRadius: 25, alignItems: 'center', marginLeft: 5, justifyContent: 'center', marginTop: 10 }} onPress={() => navigation.goBack()}>
              <FontAwesome name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 50, backgroundColor: '#a2459a', borderRadius: 25, marginLeft: width * 0.45, alignItems: 'center', justifyContent: 'center', marginTop: 10 }} onPress={() => navigation.navigate("Setting")}>
              <FontAwesome name="search" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 50, backgroundColor: '#a2459a', borderRadius: 25, marginLeft: width * 0.01, alignItems: 'center', justifyContent: 'center', marginTop: 10 }} onPress={() => navigation.navigate("App")}>
              <FontAwesome name="home" size={30} color="white" />
            </TouchableOpacity>
            <View>
              <TouchableOpacity style={{ width: 50, backgroundColor: '#a2459a', borderRadius: 25, marginLeft: width * 0.01, alignItems: 'center', justifyContent: 'center', marginTop: 10 }} onPress={() => navigation.navigate("Cart")} >
                <FontAwesome name="shopping-cart" size={30} color="white" />
              </TouchableOpacity>
              {this.renderNofiCart()}
            </View>
          </View>
          <View style={styles.options}>
            <View>
              <View >
                <Text style={{ paddingBottom: 8, fontSize: 18, marginLeft: width / 40, color: 'black' }}>{this.state.Name}</Text>

                {bough != 0 ?
                  <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <RatingUI rating={rating} size={17} />
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { this.props.navigation.navigate('RatingView', { id: this.state.idsanpham }) }}>
                      <Text style={{ color: 'green' }}>(Xem {bough} đánh giá)
                      </Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <Text style={{ color: 'green', marginLeft: 10 }}>Chưa có đánh giá</Text>}

                <Text style={{ marginVertical: 10, fontSize: 25, fontWeight: "bold", marginLeft: width / 40, color: '#000' }}>{this.state.MetaDescription}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Text style={{ fontSize: 24, marginLeft: width / 40, color: 'black', fontWeight: 'bold' }}><ReactNativeNumberFormat value={Price} /> </Text>
                  {Price === PromotionPrice ?
                    null :
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ textDecorationLine: "line-through", fontSize: 15, marginLeft: 15, color: "#696969" }}>
                        <ReactNativeNumberFormat value={PromotionPrice} />
                      </Text>
                      <Text style={{ marginLeft: 5, color: 'red' }}>
                        -{((PromotionPrice - Price) / PromotionPrice * 100).toFixed(0)}%</Text>
                    </View>
                  }
                </View>
                <View>
                  <Text style={{ marginBottom: 10, fontSize: 15, fontWeight: "bold", marginLeft: width / 40 }}>{this.state.Waranty} tháng bảo hành</Text>
                </View>
              </View>
            </View>
            <View>
            </View>
          </View>
          <View style={{ height: 5 }} />
          {List_Productlienquan.length == 0 ? null :
            <View style={{ backgroundColor: '#fff', height: height / 3.5 }}>
              <Text bold size={12} style={{ marginVertical: 10, marginLeft: width / 40, fontWeight: 'bold', color: '#000' }}>Sản Phẩm Tương Tự</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: 10 }}
                data={List_Productlienquan}
                renderItem={({ item }) =>
                  <TouchableOpacity onPress={() => this.setState({ idsanpham: item.proid })}>
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
          }
          <View style={{ height: 5 }} />
          <View style={{ backgroundColor: '#fff' }}>
            <Text bold size={12} style={{ marginVertical: 10, marginLeft: width / 40, fontWeight: 'bold', color: '#000' }}>Mô Tả Sản Phẩm</Text>
            <Text muted size={12} style={{ marginHorizontal: width / 40, color: '#000', textAlign: 'justify' }}>  {this.state.Decription}</Text>
            <View style={{ height: 25 }} />
          </View>
          <View style={{ height: 5 }} />
          {bough != 0 ?
            <View style={{ backgroundColor: '#fff', height: height / 3.2 }}>
              <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between' }}>
                <Text bold size={12} style={{ marginLeft: width / 40, fontWeight: 'bold', color: '#000' }}>Khách Hàng Nhận Xét </Text>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('RatingView', { id: this.state.idsanpham }) }}>
                  <Text style={{ color: '#a2459a', marginRight: width / 40 }}>XEM TẤT CẢ</Text></TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', marginHorizontal: width / 6, marginVertical: height / 30 }}>
                  <Text style={{ fontSize: 50, color: "#000" }}>{rating.toFixed(1)}</Text>
                  <RatingUI rating={rating} size={10} />
                  <Text style={{ fontSize: 15, color: "green", marginTop: 5 }}>{bough} nhận xét</Text>
                </View>
                <View style={{ width: 1, backgroundColor: '#DDDDDD' }}></View>
                <View style={{ marginLeft: 5 }}>

                  <View style={styles.star}>
                    <RatingUI rating={5} size={17} />
                    <Text style={{ marginLeft: width / 12, color: '#a2459a', fontWeight: 'bold' }}>{sao5}</Text>
                  </View>
                  <View style={styles.star}>
                    <RatingUI rating={4} size={17} />
                    <Text style={{ marginLeft: width / 12, color: '#a2459a', fontWeight: 'bold' }}>{sao4}</Text>
                  </View>
                  <View style={styles.star}>
                    <RatingUI rating={3} size={17} />
                    <Text style={{ marginLeft: width / 12, color: '#a2459a', fontWeight: 'bold' }}>{sao3}</Text>
                  </View>
                  <View style={styles.star}>
                    <RatingUI rating={2} size={17} />
                    <Text style={{ marginLeft: width / 12, color: '#a2459a', fontWeight: 'bold' }}>{sao2}</Text>
                  </View>
                  <View style={styles.star}>
                    <RatingUI rating={1} size={17} />
                    <Text style={{ marginLeft: width / 12, color: '#a2459a', fontWeight: 'bold' }}>{sao1}</Text>
                  </View>
                </View>
              </View>
            </View>
            : null
          }
          <View style={{ height: 5 }} />
          <FlatList
            data={List_Comment}
            showsVerticalScrollIndicator={false}
            initialNumToRender={3}
            pagingEnabled={true}
            renderItem={({ item }) =>
              <this.CommentItem
                item={item}
              />
            }
          />
        </ScrollView>
        <View style={styles.centeredView}>
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}

            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: 'green', fontWeight: 'bold' }}><Feather name="check-circle" color="green" size={18}
                  />  Sản phẩm đã được thêm vào giỏ hàng      </Text>
                  <TouchableOpacity style={{ width: width / 15, borderRadius: 10 }}
                    onPress={() => { this.handleClose() }}
                  >
                    <FontAwesome5 name="times-circle" color="red" size={20} />
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Image source={{ uri: this.state.Image }} style={{ height: height / 8, width: width / 5, resizeMode: 'contain' }} />
                  <View style={{ flexDirection: "column", marginTop: 10, marginLeft: 10 }}>
                    <Text numberOfLines={1} style={{ color: '#000',width:width/1.8 }}>{this.state.Name}</Text>
                    <Text style={{ color: '#000' }}>Cung cấp bởi {this.state.BrandName}</Text>
                    <Text><ReactNativeNumberFormat value={Price} /></Text>
                  </View>
                </View>
                <TouchableHighlight style={{ backgroundColor: '#a2459a', width: width / 1.2, height: height / 17, borderRadius: 15, justifyContent: 'center' }}
                  onPress={() => navigation.navigate("Cart")}>
                  <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', fontWeight: '800' }}>Xem giỏ hàng</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.devide} />
        <View style={{ backgroundColor: "#fff", flexDirection: "row", height: height / 16, justifyContent: 'center' }}>
          <TouchableOpacity style={styles.btnmua} onPress={this.addCart}>
            <Text style={{ color: '#fff', fontSize: 20, }}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
};
const styles = StyleSheet.create({
  headerFont: {
    flexDirection: "row",
    position: 'absolute',
    width: width
  },
  headerFont1: {
    flexDirection: "row",
    paddingTop: height / 30,
    overflow: 'hidden',
    backgroundColor: '#fff',
    width: width
  },
  devide: {
    height: 2
  },
  profileImage: {
    width: width,
    height: height / 2,
    resizeMode: 'contain',
  },
  profileContainer: {
    width: width,
    height: height / 2,
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
    marginLeft: 10
  },
  itemContainer: {
    width: width / 3.5,
    marginRight: 12,
    marginTop: 10,
  },
  itemImage1: {
    width: 100,
    height: 120,
    resizeMode: 'contain',

  },
  cartposition: {
    position: "absolute",
    borderRadius: 15,
    backgroundColor: "red",
    height: 15,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: width / 11,
    marginTop: height / 70
  },
  btnmua: {
    width: width / 1.1,
    backgroundColor: "#a2459a",
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',

  },
  centeredView: {
    justifyContent: "center",
    flex: 1
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: height / 4,
    width: width / 1.1
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 22,
    color: '#a2459a'
  },
  star: {
    height: height / 20,
    flexDirection: 'row',
  }
});