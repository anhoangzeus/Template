import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, Dimensions, ScrollView, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from '../components/HeaderComponent';
import NumberFormat from 'react-number-format';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
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

const { width, height } = Dimensions.get('screen');

export default function Route_OrderDetail({ route, navigation }) {
  var searchContent = "";
  if (route.params != null) {
    const { content } = route.params.id;
    console.log(content);
    searchContent = route.params.id;
  }
  return (
    <Detail_Order
      content={searchContent}
      navigation={navigation}
    />
  );
};
export class Detail_Order extends Component {
  constructor (props) {
    super(props);
    this.state = {
      OrderID: "",
      CreatedDate: "",
      Status: "",
      ShipName: "",
      ShipMoblie: "",
      ShipAddress: "",
      Payment: "",
      Total: 0,
      ShipPayment: 0,
      ListProduct: [],
      modalVisible: false,
      modalVisibleWarning: false,
    };
  }
  setModalVisible = (visible) => {
    if (auth().currentUser) {
      this.setState({ modalVisible: visible });
    }
  };
  handleCloseWar =()=>{
    this.setState({
      modalVisibleWarning: false,
      modalVisible: false,   
    });
    this.props.navigation.goBack()
  }
  handleClose = () => {
    this.setState({
      modalVisible: false,   
    });
  };
  setModalVisibleWarning = (visible) => {
    this.setState({ modalVisibleWarning: visible }, () => { setTimeout(this.handleCloseWar, 3000) });
  };
  getListOrder = () => {
    database().ref('Orders').child(this.props.content)
      .once('value').then((snapshot) => {
        if (snapshot.val().Status == "1") {
          this.setState({ Status: "Chờ xác nhận" })
        } else if (snapshot.val().Status == "2") {
          this.setState({ Status: "Chờ lấy hàng" })
        } else if (snapshot.val().Status == "3") {
          this.setState({ Status: "Đang vận chuyển" })
        } else if (snapshot.val().Status == "4") {
          this.setState({ Status: "Đã giao" })
        } else if (snapshot.val().Status == "5") {
          this.setState({ Status: "Đã huỷ" })
        } else if (snapshot.val().Status == "6") {
          this.setState({ Status: "Trả hàng" })
        }
        if (snapshot.val().Payment == "01") {
          this.setState({ Payment: "Thanh toán khi nhận hàng" })
        } else if (snapshot.val().Payment == "02") {
          this.setState({ Payment: "Thanh toán bằng thẻ tín dụng" })
        }
        var item = [];
        snapshot.child('OrderDetails').forEach((child) => {
          var product = {
            ProductName: '',
            ProductImage: 'https://ibb.co/mbtRJGd',
            Brand_Product: '',
            Quantity: '',
            Price: '',
            id: '',
            cate_Name: '',
          }
          product.Price = child.val().Price;
          product.Quantity = child.val().Quantity;
          product.ProductImage = child.val().Picture;
          product.ProductName = child.val().Name;
          product.Brand_Product = child.val().BrandName;
          product.cate_Name = child.val().CategoryName;
          product.id = child.val().OrderDetailID;
          item.push(product);
        })
        this.setState({
          OrderID: snapshot.val().OrderID,
          CreatedDate: snapshot.val().CreatedDate,
          ShipName: snapshot.val().ShipName,
          ShipMoblie: snapshot.val().ShipMoblie,
          ShipAddress: snapshot.val().ShipAddress,
          Total: snapshot.val().Total,
          ShipPayment: snapshot.val().ShipPayment,
          ListProduct: item,
        })
      })
  }
  GetCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var gio = new Date().getHours();
    var phut = new Date().getMinutes();
    var giay = new Date().getSeconds();
    return date + '/' + month + "/" + year + " " + gio + ":" + phut + ":" + giay;
  }
  huy_Order = () => {
    database().ref('Orders').child(this.props.content).child("TimeLine").update({
      DaHuy: this.GetCurrentDate(),
    });
    database().ref('Orders').child(this.props.content).update({
      Status: 5,
    }).then(
      this.setModalVisibleWarning(true),

    ).catch()
  }
  componentDidMount() {
    this.getListOrder();
  }
  RenderList = ({ ProductName, BrandName, ProductImage, Quantity, Price, cate_Name }) => (
    <View style={styles.userContainer}>
      <View>
        <Image source={{ uri: ProductImage }} style={styles.sectionImage} />
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ ...styles.titletext, marginRight: width / 4 }}>{ProductName}</Text>
        <Text numberOfLines={3} style={styles.welcomeText}>Sản phẩm: {cate_Name}</Text>
        <Text style={styles.welcomeText}>Nhà cung cấp: {BrandName}</Text>
        <Text style={{ color: '#1e88e5', fontWeight: 'bold', fontSize: 20, marginTop: 10 }}><ReactNativeNumberFormat value={Price} />
          <Text style={{ fontSize: 15, color: "black" }}>  x {Quantity}</Text></Text>
      </View>
    </View>
  );
  render() {
    return (
      <View style={styles.screenContainer}>
        <StatusBar backgroundColor='#a2459a' barStyle="light-content" />
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.cartContainer} onPress={() => this.props.navigation.goBack()}>
            <FontAwesome name="angle-left" size={30} color="#fff" style={{ marginLeft: width / 40 }} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Chi tiết đơn hàng</Text>
        </View>
        <ScrollView >
          <View style={styles.bodyContainer}>
            <View style={styles.userContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.titletext}>Mã đơn hàng: {this.state.OrderID}</Text>
                <Text style={styles.welcomeText}>Ngày đặt hàng: {this.state.CreatedDate}</Text>
                <Text style={styles.welcomeText}>Trạng thái: {this.state.Status}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.userContainer}>
              <View style={styles.textContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.titletext}>Địa chỉ người nhận</Text>
                  {this.state.Status == "Chờ xác nhận" ?
                    <TouchableOpacity
                      onPress={() => { this.props.navigation.navigate("AddressScreen") }}
                    >
                      <Text style={{ color: 'green', fontSize: 20 }}>Sửa</Text>
                    </TouchableOpacity>
                    : null
                  }
                </View>
                <Text style={styles.welcomeText}>Họ tên: {this.state.ShipName}</Text>
                <Text style={styles.welcomeText}>Số điện thoại: {this.state.ShipMoblie}</Text>
                <Text style={styles.welcomeText}>Địa chỉ: {this.state.ShipAddress}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.userContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.titletext}>Hình thức thanh toán</Text>
                <Text style={styles.welcomeText}>{this.state.Payment}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={{ backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.textorder}>Thông tin đơn hàng</Text>
              <Text style={styles.textorder}>{this.state.ListProduct.length} Loại</Text>
            </View>
            <View style={{ height: 2, backgroundColor: '#1e88e5', marginHorizontal: 10 }} />
            {/*  */}
            <FlatList
              pagingEnabled={false}
              data={this.state.ListProduct}
              renderItem={({ item }) =>
                <this.RenderList
                  ProductName={item.ProductName}
                  BrandName={item.Brand_Product}
                  ProductImage={item.ProductImage}
                  Price={item.Price}
                  Quantity={item.Quantity}
                  cate_Name={item.cate_Name}
                />}
            />
          </View>
          <View style={styles.divider} />
          <View style={{ backgroundColor: '#fff', paddingTop: 5, paddingBottom: 10, paddingHorizontal: 10, }}>
            <Text style={styles.textorder}>Thông tin thanh toán</Text>
            <View style={{ height: 2, backgroundColor: '#1e88e5', marginTop: 2 }} />
            <Text style={{ margin: 10, fontSize: 20, color: '#000' }}>Phí vận chuyển: <ReactNativeNumberFormat value={this.state.ShipPayment} /></Text>
            <Text style={{ marginHorizontal: 10, fontSize: 20, color: '#000' }}>Tổng tiền: <ReactNativeNumberFormat value={this.state.Total} /></Text>
          </View>
          {this.state.Status == "Chờ xác nhận" ?
            <TouchableOpacity
              style={styles.totalContainer}
              onPress={() => { this.setModalVisible(true) }}
            >
              <Text style={styles.titletext2}>Huỷ đơn hàng</Text>
            </TouchableOpacity>
            :
            this.state.Status == "Chờ lấy hàng" ?
              <View
                style={styles.totalContainer}
                onPress={() => { this.setModalVisible(true) }}
              >
                <Text style={styles.titletext2}>Huỷ đơn hàng</Text>
              </View>
              : null
          }
        </ScrollView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={{ ...styles.modalView, padding: width / 15, }}>
              <Text style={styles.modalText}>Bạn có chắc huỷ đơn hàng?</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#2196F3", width: width / 2.5 }}
                  onPress={() => {
                    this.handleClose();
                  }}
                >
                  <Text style={styles.textStyle}>Giữ lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#2196F3", width: width / 2.5, marginLeft: 5, }}
                  onPress={() => {
                    this.huy_Order();
                  }}
                >
                  <Text style={styles.textStyle}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisibleWarning}

          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView1}>
              <FontAwesome5 name="grin-beam-sweat" size={40} color="#a2459a" />
              <Text style={styles.modalText1}>Huỷ thành công</Text>
              <Text style={styles.modalText1}>Hãy kiểm tra lại trạng thái đơn hàng!</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  userContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  totalContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 5,
    borderRadius: 4,
    marginBottom: 2,
    borderColor: 'red',
    borderWidth: 2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    color: 'black',
  },
  divider: {
    height: 10,
  },
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: '#a2459a',
    paddingBottom: 12,
  },
  cartContainer: {
    paddingHorizontal: 20,
    width: 70
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titletext: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  titletext1: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20
  },
  textorder: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
    color: '#1e88e5'
  },
  sectionImage: {
    width: width / 4,
    height: height / 8,
    borderRadius: 4,
    resizeMode: 'contain'
  },
  titletext2: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
  },
  modalView1:{
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    width:width,
    height:height/4,
    alignItems:'center'
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    color: '#2196F3',
    textAlign:'center'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText1: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: '#a2459a'
  }
});
