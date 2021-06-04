import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Linking, Pressable } from 'react-native';

import axios from "axios"

const image = { uri: "https://images.pexels.com/photos/6801633/pexels-photo-6801633.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" };

const WalletNav = ({ navigation, route }) => {
    const { userData, data } = route.params;
    useEffect(() => {
        getWalletValue();
    });
    const [Wallet, SetWallet] = useState([])
    const [Sold, SetSold] = useState([])

    const getWalletValue = async () => {
        await axios.get(`https://foreexapp.herokuapp.com/api/user/info/${userData.email}`).then((walletdata) => {
            SetWallet(walletdata.data.walletSold)
            SetSold(walletdata.data.sold)
        })
        .catch((e) => {
            console.log(e)
        })
    }
  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.userInfo}>
        <Image source={{uri: `${userData.photo_url}`}} style={{width:80, height:80,borderRadius:30,marginLeft : 160,marginTop:-100, marginBottom: 30}} />
        <Text style={styles.userInfoTxt}>{userData.name}</Text>
      </View>
      <View style={styles.cont}>
        <Text style={styles.walletNum}>Your Wallet :</Text>
        <Text style={styles.walletNumm}>{Wallet}0,0 $</Text>
        <Text style={styles.walletNum}>Your Sold :</Text>
        <Text style={styles.soldNum}>{Sold}0,0 $</Text>
      </View>
    </ImageBackground>
  );
};

export default WalletNav;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  userInfoTxt: {
    color:"lightblue",
    fontWeight: "bold",
    marginTop : 2,
    textAlign : "center",
    fontSize : 25,
    marginBottom: 60
  },
  walletNum: {
    fontSize: 30,
    marginTop: 40,
    textAlign: "center",
    color:"lightblue",
  },
  walletNumm: {
    fontSize: 30,
    marginTop: 5,
    textAlign: "center",
    color:"#f6b8b8",
  },
  soldNum: {
    fontSize: 30,
    marginTop: 5,
    textAlign: "center",
    color:"#f6b8b8",
  },
  cont: {
    height: 300,
    backgroundColor: "#deeeea",
    marginTop: 13,
  }
});

