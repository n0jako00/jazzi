// Author: Konsta Jäske, TIK21KM
import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight || 100
  },
  text: {
    padding: 10,
  },
  totalText: {
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 10
  },
  textInput: {
    backgroundColor: '#d9d9d7',
  },
  header: {
    FontSize: 30,
    backgroundColor: 'skyblue',
    textAlign: 'center'
  },
  footer: {
    MarginTOp: 10,
    backgroundColor: 'skyblue',
    textAlign: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },

  item: {
    margin: 15,
    padding: 5
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    backgroundColor: '#86fcb8',
    width: 150
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  result: {
    fontSize: 20,
    marginLeft: 170,
    marginRight: 170,
    textAlign: 'center'
  },
  gameboard: {
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
});