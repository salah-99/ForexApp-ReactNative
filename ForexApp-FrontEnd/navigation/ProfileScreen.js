import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView,ImageBackground, ScrollView, Pressable } from "react-native";


const image = { uri: "https://images.pexels.com/photos/6802045/pexels-photo-6802045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" };

const ProfileScreen = ({ route, navigation }) => {
  const DATA= [
    {
      id: 1,
      symbol: "SPX",
      name: "EUR / U.S. DOLLAR",
      img: "https://www.expertinvestor.net/images/logos/forexcom-logo-sq.png",
      redirectTo: "https://www.tradingview.com/symbols/SPX/",
      price: 10
    },
    {
      id: 2,
      symbol: "TVC-IXIC",
      name: "BRITISH POUND / U.S. DOLLAR",
      img: "https://www.expertinvestor.net/images/logos/forexcom-logo-sq.png",
      redirectTo: "https://www.tradingview.com/symbols/TVC-IXIC/",
      price: 20
    },
  ]

  const { userData, user } = route.params;
  console.log("user from google", userData);

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.userInfo}>
       <Image source={{uri: `${userData.photo_url}`}} style={{width:80, height:80,borderRadius:30,marginLeft : 160,marginTop:30}} />
        <Text style={styles.userInfoTxt}>{userData.name}</Text>
      </View>
      <SafeAreaView style={styles.areaView}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.cryptoLists}>
            {
              DATA.map((data, i) => {
                return (
                  <View style={styles.cryptoListsData} key={i}>
                    <View style={styles.cryptoListsTopData}>
                      <Text>{data.symbol}</Text>
                      <Text>{data.name}</Text>
                      <Text>{data.price} $</Text>
                      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() =>{ navigation.navigate("Chart", { userData, data: data.redirectTo, cryptoPrice: data.price }); }}>
                      <Text style={{color: "white"}}>Explore</Text>
                    </Pressable>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  userInfoTxt: {
    fontWeight: "bold", 
    color: "lightblue",
    marginTop : 20,
    textAlign : "center",
    fontSize : 30
  },
  cryptoLists: {
    marginTop: 10
  },
  cryptoListsData: {
    padding: 20,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10
  },
  scrollView: {
    marginHorizontal: 20,
  },
  areaView: {
    marginTop: 40,
    marginBottom: 60
  },
  cryptoListsTxt: {
    fontSize: 20,
    fontWeight: "bold"
  },
  cryptoListsTopData: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  button: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#ff7b54",
    marginTop : 20
  }
});
