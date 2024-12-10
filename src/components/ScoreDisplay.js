import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const ScoreDisplay = ({ currentScore, totalQuestions, style }) => {
  const calculatePercentage = () => {
    return ((currentScore / totalQuestions) * 100).toFixed(0);
  };

  const getScoreColor = () => {
    const percentage = calculatePercentage();
    if (percentage < 50) return "red";
    if (percentage < 75) return "orange";
    return "green";
  };

  // Menggunakan useEffect untuk efek samping
  useEffect(() => {
    // Logika ketika komponen pertama kali dimuat atau saat nilai currentScore berubah
    console.log(`Current Score: ${currentScore}`);
    console.log(`Total Questions: ${totalQuestions}`);
    console.log(`Percentage: ${calculatePercentage()}%`);
  }, [currentScore, totalQuestions]); // Efek ini dipicu setiap kali currentScore atau totalQuestions berubah

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.scoreText}>
        Skor: {currentScore} / {totalQuestions}
      </Text>
      <Text style={[styles.percentageText, { color: getScoreColor() }]}>
        {calculatePercentage()}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  percentageText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ScoreDisplay;
