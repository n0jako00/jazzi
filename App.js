import {View} from 'react-native';
import React from 'react';
import Gameboard from './components/Gameboard'
import Header from './components/Header'
import Footer from './components/Footer'
import {styles} from './styles/styles.js'

// Author: Konsta Jäske

export default function App() {

  return (
      <View style={styles.container}>
        <Header />
        <Gameboard />
        <Footer />
      </View>
  );
}
