import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Dimensions, FlatList, Image, RefreshControl, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
const { width, height } = Dimensions.get('screen');
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
export default function Route_RatingView({ route, navigation }) {
    var searchContent = "";
    if (route.params != null) {
        const { content } = route.params.id;
        searchContent = route.params.id;
    }
    return (
        <RatingView
            content={searchContent}
            navigation={navigation}
        />
    );
};
export class RatingView extends Component {
    constructor (props) {
        super(props);
        this.itemRef = database();
        this.state = {
            List_Comment: [],
            modalVisible: false,
            refreshing: false,
            idsanpham: this.props.content,
            RatingInfor: {},
            bough: 0,
            rating: 0,
            sao1: 0,
            sao2: 0,
            sao3: 0,
            sao4: 0,
            sao5: 0,
            isloading: true,
        };
    }
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
    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.getData();
    };
    componentDidMount() {
        this.getData();
    }
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
                    rating: point / count,
                    List_Comment: items,
                    bough: count,
                    sao1: sao1,
                    sao2: sao2,
                    sao3: sao3,
                    sao4: sao4,
                    sao5: sao5,
                    refreshing: false,
                    isloading: false
                });
            });
    };
    render() {
        const { List_Comment, bough, rating, sao1, sao2, sao3, sao4, sao5, isloading } = this.state;
        return (
            <View style={styles.screenContainer}>
                <StatusBar barStyle="light-content" backgroundColor="#a2459a" translucent={false} />
                <View style={styles.headconteiner}>
                    <TouchableOpacity style={{ width: 60, borderRadius: 10 }} onPress={() => this.props.navigation.goBack()}>
                        <FontAwesome name="angle-left" size={30} color="#fff" style={{ marginLeft: width / 40 }} />
                    </TouchableOpacity>
                    <Text style={styles.texthead}>Đánh giá sản phẩm</Text>
                </View>
                {isloading ?
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <ActivityIndicator size="large" color="dodgerblue" />
                    </View>
                    :
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        <View style={{ backgroundColor: '#fff', height: height / 3.2 }}>
                            <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between' }}>
                                <Text bold size={12} style={{ marginLeft: width / 40, fontWeight: 'bold', color: '#000' }}>Khách Hàng Nhận Xét </Text>
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
                                        <Text style={styles.numstar}>{sao5}</Text>
                                    </View>
                                    <View style={styles.star}>
                                        <RatingUI rating={4} size={17} />
                                        <Text style={styles.numstar}>{sao4}</Text>
                                    </View>
                                    <View style={styles.star}>
                                        <RatingUI rating={3} size={17} />
                                        <Text style={styles.numstar}>{sao3}</Text>
                                    </View>
                                    <View style={styles.star}>
                                        <RatingUI rating={2} size={17} />
                                        <Text style={styles.numstar}>{sao2}</Text>
                                    </View>
                                    <View style={styles.star}>
                                        <RatingUI rating={1} size={17} />
                                        <Text style={styles.numstar}>{sao1}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 5 }} />
                        <FlatList
                            data={List_Comment}
                            showsVerticalScrollIndicator={false}
                            pagingEnabled={true}
                            renderItem={({ item }) =>
                                <this.CommentItem
                                    item={item}
                                />
                            }
                        />
                    </ScrollView>

                }

            </View>
        );
    }
};
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,

    },
    texthead: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: width / 20
    },
    headconteiner: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        flexDirection: 'row',
        backgroundColor: "#a2459a",
    },
    star: {
        height: height / 20,
        flexDirection: 'row',
    },
    numstar: {
        marginLeft: width / 12,
        color: '#a2459a',
        fontWeight: 'bold'
    }
})