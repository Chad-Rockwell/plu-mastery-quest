import React, { useState, useEffect } from "react";
import {router} from "expo-router";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../utils/supabase.js";
import ProduceList from "./ProduceList";
import Keypad from "./Keypad.js";

export default function Game() {
  const [modalVisible, setModalVisible] = useState(false);
  const [produce, setProduce] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [itemsPerMin, setItemsPerMin] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  useEffect(() => {
    setCurrentIndex(Math.floor(Math.random() * produce.length));
    loadProduce();
    const startTime = Date.now();

    const timer = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = Math.floor((currentTime - startTime) / 1000); // Elapsed time in seconds
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(timer);
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

  function onPress(key) {
    if(key !== 'enter' && key !== 'backspace') {
      if(guess.length < 6) {
        setGuess(guess + key);
      }
    }
    if(key === 'backspace') {
      setGuess("");
    }
    if(key === 'enter') {
      checkAnswer(guess);
    }
  }
  function checkAnswer(guess) {
    if(guess == Number(produce[currentIndex].produce_code)) {
      correct();
    }
    else {
      incorrect();
    }
  }
  function correct() {
    Alert.alert(
      "Correct!",
      `The PLU code for ${produce[currentIndex].produce_name} is ${guess}.`
    );
    setCorrectAnswers(correctAnswers + 1);
    setCurrentIndex(Math.floor(Math.random() * produce.length));
    setGuess("");
  }
  function incorrect() {
    Alert.alert(
      "Nope!",
      `The PLU code for ${produce[currentIndex].produce_name} is not ${guess}.`
    );
    setGuess("");
  }
  function giveHint() {
    Alert.alert(`The first number of the PLU code for ${produce[currentIndex].produce_name} is ${produce[currentIndex].produce_code[0]}`)
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
              <Text style={styles.guessText}>{guess}</Text>
              <Text style={styles.ipmText}>IPM: {Math.floor(correctAnswers/(elapsedTime/60))}</Text>
            </View>
          </>
        )}
      </View>
      <View style={styles.navbar}>
      <TouchableOpacity onPress={toggleModal} style={styles.squareButton}>
        <Text style={styles.buttonText}>Open Produce List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.hintButton}>
        <Text onPress={giveHint} style={styles.buttonText}>Hint</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.exitButton}>
        <Text style={styles.buttonText} onPress={()=> router.push("/components/Home")}>Exit Game</Text>
      </TouchableOpacity>
      </View>
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
          <ProduceList isModalVisible={modalVisible}/>
          <TouchableOpacity onPress={toggleModal} style={styles.squareButton}>
            <Text style={styles.buttonText}>Close Produce List</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingBottom: 50 }}></View>
      </Modal>
      <Keypad onPress={onPress}></Keypad>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  itemContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  itemText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 50,
  },
  guessText: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 10,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  ipmText: {
    position: 'absolute',
    top: 20,
    left: 200,
    color: 'red',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 10,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  navbar: {
    flexDirection: 'row',
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
    marginBottom: 10,
    marginLeft:20,
    marginRight: 10
  },
  exitButton: {
    width: 100,
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginLeft:20,
    marginRight: 10
  },
  hintButton: {
    width: 100,
    height: 40,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginLeft:20,
    marginRight: 10
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
