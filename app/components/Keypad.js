import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Keypad = ({ onPress }) => {
  const handleKeyPress = (key) => {
    onPress(key);
  };

  return (
    <View style={styles.keypad}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleKeyPress(1)} style={styles.button}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleKeyPress(2)} style={styles.button}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleKeyPress(3)} style={styles.button}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleKeyPress(4)} style={styles.button}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleKeyPress(5)} style={styles.button}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleKeyPress(6)} style={styles.button}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleKeyPress(7)} style={styles.button}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleKeyPress(8)} style={styles.button}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleKeyPress(9)} style={styles.button}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleKeyPress('backspace')} style={styles.backButton}>
          <Text style={styles.buttonText}>Backspace</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleKeyPress(0)} style={styles.button}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleKeyPress('enter')} style={styles.enterButton}>
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keypad: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  button: {
    width: 110,
    height: 70,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 5
  },
  backButton: {
    width: 110,
    height: 70,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 5
  },
  enterButton: {
    width: 110,
    height: 70,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 5
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Keypad;
