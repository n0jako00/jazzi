import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles/styles.js'

let board = [];
let dicevalues = []
let pointvalues = [1, 2, 3, 4, 5, 6]
const NBR_OF_THROWS = 3;
const DICE = 5;
const bonus = 63;

export default function Gameboard() {

    const [throws, setThrows] = useState(NBR_OF_THROWS)
    const [status, setStatus] = useState('')
    const [bonusText, setBonusText] = useState(`You are ${bonus} points away from bonus`)
    const [total, setTotal] = useState(0)
    const [isSelected, setIsSelected] = useState(false)
    const [selectedDice, setSelectedDice] = useState(new Array(DICE).fill(false))
    const [points, setPoints] = useState(new Array(6).fill(0))
    const [selectedPoints, setSelectedPoints] = useState(new Array(6).fill(false))

    const row = [];
    for (let i = 0; i < DICE; i++) {
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
        )
    }

    const pointsRow = []
    for (let i = 0; i < 6; i++) {
      pointsRow.push(
        <Pressable key={'pointsrow' + i} onPress={() => selectPoint(i)}>
          <Text style={{ textAlign: 'center' }}>{points[i]}</Text>
          <MaterialCommunityIcons
            name={`numeric-${i + 1}-circle`}
            key={'pointsrow' + i}
            size={36}
            color={getPointsColor(i)}
          ></MaterialCommunityIcons>
        </Pressable>
      )
    }

    useEffect(() => {
        checkBonusPoints()
        if (checkWinner()) {
          return
        } else if (throws === NBR_OF_THROWS) {
          setStatus('Throw dice.')
        } else if (isSelected) {
          setThrows(NBR_OF_THROWS)
          setIsSelected(false)
        }
      }, [throws, isSelected])

    function getDiceColor(i) {
        if(board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        } else {
            return selectedDice[i] ? 'black' : '#1a76a1';
        }
    }

    function getPointsColor (i) {
        return selectedPoints[i] ? 'black' : '#1a76a1'
    }

    function selectDice (i) {
        if (throws !== NBR_OF_THROWS) {
          let dices = [...selectedDice]
          dices[i] = selectedDice[i] ? false : true
          setSelectedDice(dices)
        } else {
          setStatus('You have to throw dices first.')
        }
      }

    function selectPoint (i) {
        if (throws === 0 && points[i] === 0 && !isSelected) {
          let selected = [...points]
          selected[i] = points[i] ? false : true
          setSelectedPoints(selected)
          setIsSelected(!isSelected)
          let dicesum = 0
          for (let index = 0; index < dicevalues.length; index++) {
            if (dicevalues[index] === pointvalues[i] && selectedDice[index]) {
              dicesum += dicevalues[index]
            }
          }
          let pointsArray = [...points]
          pointsArray[i] = dicesum
          setPoints(pointsArray)
          setTotal(total + pointsArray[i])
          setSelectedDice(new Array(DICE).fill(false))
        } else if (points[i] !== 0) {
          setStatus('You already selected points for ' + (i + 1))
        } else {
          setStatus('Throw 3 times before setting points.')
        }
      }

    function throwDice() {
        if (throws === 0 && !isSelected) {
          setStatus('Select your points before the next throw.')
        } else {
          for (let i = 0; i < DICE; i++) {
            if (!selectedDice[i]) {
              let randomNumber = Math.floor(Math.random() * 6 + 1)
              board[i] = 'dice-' + randomNumber
              dicevalues[i] = randomNumber
            }
          }
          setThrows(throws - 1)
        }
      }

    function checkWinner() {
        if (selectedPoints.every((val, i, arr) => val === true)) {
            return true
          } else {
            return false
          }
    }

    function checkBonusPoints () {
        setBonusText(`You are ${bonus - total} points away from bonus`)
        if (checkWinner()) {
          setStatus('Game over. All points selected.')
          setSelectedDice(new Array(NBR_OF_DICES).fill(false))
          setThrows(0)
        } else if (throws === 0) {
          setStatus('Select your points.')
        } else {
          setStatus('Keep throwing')
        }
        if (bonus - total <= 0) {
          setBonusText('You got the bonus!')
        }
      }

    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.text}>Throws left: {throws}</Text>
            <Text style={styles.text}>{status}</Text>
            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => throwDice()}>
                <Text style={styles.buttonText}>Throw dice</Text>
            </TouchableOpacity>
            <Text style={styles.totalText}>Total: {total}</Text>
            <View style={styles.flex}>{pointsRow}</View>
            <Text style={styles.text}>{bonusText}</Text>
        </View>
    )
}