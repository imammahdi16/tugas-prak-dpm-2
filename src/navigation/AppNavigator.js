import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";

const AppNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState("Home");
  const [params, setParams] = useState(null); // Untuk menyimpan parameter antar layar

  const navigate = (screenName, params = null) => {
    setCurrentScreen(screenName);
    setParams(params);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "Home":
        return <HomeScreen navigate={navigate} />;
      case "Quiz":
        return <QuizScreen navigate={navigate} route={{ params }} />;
      default:
        return <HomeScreen navigate={navigate} />;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator;
