import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,ImageBackground, Linking, Pressable } from 'react-native';

import axios from "axios"

const image = { uri: "https://images.pexels.com/photos/6802048/pexels-photo-6802048.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" };


const ChartScreen = ({ navigation, route }) => {
    const { userData, data, cryptoPrice } = route.params;

    const webView = () => {
        navigation.navigate("WebviewNav", { userData, data });
    }
    const walletFun = () => {
        navigation.navigate("WalletNav", { userData, data })
    }
    const buyFun = () => {
        let GetUserData = {email: userData.email, price: cryptoPrice}

        axios.post("https://foreexapp.herokuapp.com/api/user/buy", GetUserData).then(() => {
            console.log("data updated")
          })
          .catch((e) => {
            alert('Your wallet is empty')
          })
    }
    const sellFun = () => {
        let GetUserData = {email: userData.email, price: cryptoPrice}

        axios.post("https://foreexapp.herokuapp.com/api/user/sell", GetUserData).then(() => {
            console.log("data updated")
          })
          .catch((e) => {
            alert('Your wallet is empty')
          })
    }

  return (
    <ImageBackground source={image} style={styles.image}>
        <View style={styles.userInfo}>
       <Image source={{uri: `${userData.photo_url}`}} style={{width:80, height:80,borderRadius:30,marginLeft : 160,marginTop:-40, marginBottom: 30}} />
        <Text style={styles.userInfoTxt}>{userData.name}</Text>
        </View>
        <View style={{fontWeight: "bold",flexDirection: "row", alignItems: "center"}} >
            <Pressable onPress={webView} style={styles.BTN1}>
                <Text style={{fontWeight: "bold",textAlign:"center", color: "white"}} >View chart</Text>
            </Pressable>
            <Pressable onPress={walletFun} style={styles.BTN}>
                <Text style={{fontWeight: "bold",textAlign:"center", color: "white"}} >YOUR WALLET</Text>
            </Pressable> 
        </View>
            <Pressable onPress={buyFun} style={styles.BTN2}>
                <Text style={{fontWeight: "bold",textAlign:"center", color: "white"}} >BUY CURRENCY</Text>
            </Pressable>
            <Pressable onPress={sellFun} style={styles.BTN3}>
                <Text style={{fontWeight: "bold",textAlign:"center", color: "white"}} >SELL CURRECNCY</Text>
            </Pressable>          
    </ImageBackground>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    userInfoTxt: {
        color:"lightblue",
        fontWeight: "bold", 
        textAlign : "center",
        fontSize : 25,
        marginBottom: 150,
        opacity: 30
    },
    btnGroup: {
     justifyContent: 'center',
        alignItems: "center"
    },
        BTN: {
        width: 170,
        marginLeft: -10,
        padding: 20,
        borderRadius: 10,
        color:"white",
        textAlign: "center",
        backgroundColor: "#ff7b54",
        margin: 20,
    },
    BTN1: {
        width: 170,
        padding: 20,
        borderRadius: 10,
        color:"white",
        textAlign: "center",
        backgroundColor: "#ff7b54",
        margin: 20,
    },
    BTN2: {
        alignItems: "center",
        justifyContent: "center",
        width: 170,
        padding: 20,
        borderRadius: 10,
        color:"white",
        textAlign: "center",
        backgroundColor: "green",
        margin: 20,
        marginLeft: 110,
        marginBottom: -10
    },
    BTN3: {
        alignItems: "center",
        justifyContent: "center",
        width: 170,
        padding: 20,
        borderRadius: 10,
        color:"white",
        textAlign: "center",
        backgroundColor: "red",
        margin: 20,
        marginLeft: 110
    },
});
