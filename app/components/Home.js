import React, { useState, useEffect } from "react";
import {router} from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../utils/supabase.js";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/banana-logo.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.menu}>
        <Text style={styles.header}>PLU Mastery Quest!</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={()=> router.push("/components/Game")}><Text style={styles.optionText}>Play</Text></TouchableOpacity>
        <TouchableOpacity style={styles.selectContainer} onPress={()=> router.push("/components/ProduceList")}><Text style={styles.optionText}>Search</Text></TouchableOpacity>
        <TouchableOpacity style={styles.selectContainer}><Text style={styles.optionText}>Leaderboard</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    width: 175,
    height: 175,
    borderRadius: 125,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  menu: {
    alignItems: "center",

  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    fontFamily: "Papyrus",
    color: "#333",
    padding: 10,
  },
  selectContainer: {
        backgroundColor: '#fff',
        height: 100,
        width: 330,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 10,
        justifyContent: 'center',
        
  },
  optionText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Verdana",
    color: "#333",
    textAlign: 'center'
  }
});
