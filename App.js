import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, Text, ScrollView, Pressable, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import {styles } from './styles/styles.js';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Author: Konsta Jäske

export default function App() {

  let board = [];
  const NBR_OF_DICES = 6;
  const NBR_OF_THROWS = 3;

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState("");
  const [selectedDices, setSelectedDices] =
    useState(new Array(NBR_OF_DICES).fill(false));

    useEffect(() => {
      checkWinner();
      if (nbrOfThrowsLeft === NBR_OF_THROWS) {
        setStatus('Game has not started');
      }
      if (nbrOfThrowsLeft < 0) {
        setNbrOfThrowsLeft(NBR_OF_THROWS-1);
      }
    }, [nbrOfThrowsLeft]);

  function getDiceColor(i) {
    if (board.every((val, i, arr) => val === arr[0])) {
      return "orange";
    }
    else {
      return selectedDices[i] ? "black" : "steelblue";
    }
  }

  function selectDice(i) {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  function throwDices() {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
  }

  function checkWinner() {
    if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
      setStatus('You won');
    }
    else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
      setStatus('You won, game over');
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else if (nbrOfThrowsLeft === 0) {
      setStatus('Game over');
      setSelectedDices(new Array(NBR_OF_DICES),fill(false));
    }
    else {
      setStatus('Keep on throwing');
    }
  }

  

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable
        key={"row" + i}
        onPress={() => selectDice(i)}>
      <MaterialCommunityIcons
        name={board[i]}
        key={"row" + i}
        size={50}
        color={getDiceColor(i)}>
        </MaterialCommunityIcons>
      </Pressable>
    );
  }

  const [bonus, setBonus] = useState(0)


  return (
    <ScrollView style={styles.container}>
    <View>
      <View style={styles.flex}>{row}</View>
      <Text style={styles.header}>Mini-Yahtzee</Text>
      <Text>Throws left: {nbrOfThrowsLeft}</Text>
      <Text>{status}</Text>
      <Pressable style={styles.button}
      onPress={() => throwDices()}>
        <Text style={styles.buttonText}>
          Throw dices
        </Text>
      </Pressable>
      <Text style={styles.totalText}>Total:</Text>
      <Text style={styles.text}>You are {bonus} points away from bonus</Text>
      <Text style={styles.footer}>Author: Konsta Jäske</Text>
    </View>
    </ScrollView>
  );
}

