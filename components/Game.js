import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../utils/supabase.js";
import ProduceList from "./ProduceList";

export default function Game() {
  const [modalVisible, setModalVisible] = useState(false);
  const [produce, setProduce] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  useEffect(() => {
    setCurrentIndex(Math.floor(Math.random() * produce.length));
    loadProduce();
  }, []);
  async function loadProduce() {
    try {
      const { data, error, status } = await supabase
        .from("produce")
        .select(`*`);
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProduce(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  function correct() {
    Alert.alert(
      "Correct!",
      `The PLU code for ${currentProduce.produce_name} is ${guess}.`
    );
    setCurrentIndex(Math.floor(Math.random() * produce.length));
  }
  return (
    <View contentContainerStyle={styles.container}>
      <View style={styles.itemContainer}>
        {produce[currentIndex] && (
          <>
            <Text style={styles.itemText}>
              {produce[currentIndex].produce_name}
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: produce[currentIndex].produce_image }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </>
        )}
      </View>
      <TouchableOpacity onPress={toggleModal} style={styles.squareButton}>
        <Text style={styles.buttonText}>Open Produce List</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 30,
          }}
        >
          <ProduceList />
          <TouchableOpacity onPress={toggleModal} style={styles.squareButton}>
            <Text style={styles.buttonText}>Close Produce List</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingBottom: 50 }}></View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  itemContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  itemText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 70,
  },
  imageContainer: {
    width: 350,
    height: 350,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  squareButton: {
    width: 100,
    height: 40,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginLeft:20
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});
