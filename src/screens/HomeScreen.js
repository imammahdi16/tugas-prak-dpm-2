import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// Menggunakan path relatif yang benar sesuai struktur folder
import QuizScreen from "../screens/QuizScreen"; // Perbaiki path sesuai folder

const HomeScreen = () => {
  const [difficulty, setDifficulty] = useState("medium");
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const goBackToHome = () => {
    setQuizStarted(false);
  };

  if (quizStarted) {
    return <QuizScreen difficulty={difficulty} goBack={goBackToHome} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trivia Quiz</Text>

      <View style={styles.difficultyContainer}>
        <Text style={styles.difficultyTitle}>Pilih Tingkat Kesulitan:</Text>
        {["easy", "medium", "hard"].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.difficultyButton,
              difficulty === level && styles.selectedDifficulty,
            ]}
            onPress={() => setDifficulty(level)}
          >
            <Text style={styles.difficultyButtonText}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
        <Text style={styles.startButtonText}>Mulai Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50", // Ganti latar belakang dengan warna solid
  },
  title: {
    fontSize: 36,
    color: "white",
    marginBottom: 30,
    fontWeight: "bold",
  },
  difficultyContainer: {
    width: "80%",
    alignItems: "center",
  },
  difficultyTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 15,
  },
  difficultyButton: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
  },
  selectedDifficulty: {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  difficultyButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  startButton: {
    marginTop: 30,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    width: "80%",
  },
  startButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});

export default HomeScreen;
