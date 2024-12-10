import React from 'react';

import { StyleSheet } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';



const App = () => {

  return <AppNavigator />;

};



const styles = StyleSheet.create({

  container: {

    flex: 1,

  },

});



export default App;
