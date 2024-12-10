import React, { Component } from "react";
import { View, Text, StyleSheet, AppState, BackHandler } from "react-native";
import QuestionCard from "../components/QuestionCard";
import ScoreDisplay from "../components/ScoreDisplay";
import {
  shuffleArray,
  calculateScore,
  getQuizFeedback,
} from "../utils/quizLogic";
import { triviaQuestions } from "../data/question";

class QuizScreen extends Component {
  constructor(props) {
    super(props);

    // Inisialisasi state
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      gameOver: false,
      appState: AppState.currentState,
      timeRemaining: 300, // 5 menit
    };

    // Binding method
    this.handleAnswer = this.handleAnswer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  // Lifecycle Method: componentDidMount
  componentDidMount() {
    console.log("Quiz Screen Mounted");

    // Persiapan pertanyaan
    const shuffledQuestions = shuffleArray([...QUIZ_QUESTIONS]);
    this.setState({
      questions: shuffledQuestions,
    });

    // Tambahkan event listener
    AppState.addEventListener("change", this.handleAppStateChange);

    // Tambahkan hardware back button handler
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );

    // Mulai timer
    this.startTimer();
  }

  // Lifecycle Method: componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    // Cek perubahan pertanyaan
    if (prevState.currentQuestionIndex !== this.state.currentQuestionIndex) {
      console.log(
        `Perpindahan ke pertanyaan ${this.state.currentQuestionIndex + 1}`
      );
    }

    // Cek game over
    if (prevState.gameOver !== this.state.gameOver && this.state.gameOver) {
      this.handleGameOver();
    }
  }

  // Lifecycle Method: componentWillUnmount
  componentWillUnmount() {
    console.log("Quiz Screen Unmounted");

    // Bersihkan event listener
    AppState.removeEventListener("change", this.handleAppStateChange);

    // Hapus back handler
    if (this.backHandler) {
      this.backHandler.remove();
    }

    // Hentikan timer jika masih berjalan
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  // Handler untuk perubahan state aplikasi
  handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      // Lakukan sesuatu saat app kembali aktif
    }
    this.setState({ appState: nextAppState });
  };

  // Handler untuk tombol back
  handleBackPress = () => {
    // Konfirmasi keluar
    Alert.alert("Konfirmasi", "Apakah Anda yakin ingin keluar dari kuis?", [
      {
        text: "Tidak",
        style: "cancel",
      },
      {
        text: "Ya",
        onPress: () => this.props.navigation.goBack(),
      },
    ]);
    return true;
  };

  // Memulai timer
  startTimer() {
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        // Kurangi waktu tersisa
        const newTimeRemaining = prevState.timeRemaining - 1;

        // Cek jika waktu habis
        if (newTimeRemaining <= 0) {
          clearInterval(this.timer);
          return {
            gameOver: true,
            timeRemaining: 0,
          };
        }

        return { timeRemaining: newTimeRemaining };
      });
    }, 1000);
  }

  // Handler menjawab pertanyaan
  handleAnswer(selectedAnswer) {
    const { questions, currentQuestionIndex, score } = this.state;
    const currentQuestion = questions[currentQuestionIndex];

    // Hitung skor
    const newScore =
      selectedAnswer === currentQuestion.correctAnswer ? score + 1 : score;

    // Cek apakah ini pertanyaan terakhir
    if (currentQuestionIndex < questions.length - 1) {
      this.setState({
        currentQuestionIndex: currentQuestionIndex + 1,
        score: newScore,
      });
    } else {
      // Akhiri kuis
      this.setState({
        score: newScore,
        gameOver: true,
      });
    }
  }

  // Handler saat game over
  handleGameOver() {
    // Hentikan timer
    if (this.timer) {
      clearInterval(this.timer);
    }

    // Hitung skor akhir
    const finalScore = calculateScore(
      this.state.questions.length,
      this.state.score
    );

    // Tampilkan feedback
    Alert.alert(
      "Kuis Selesai",
      `${getQuizFeedback(finalScore.grade)}\n` +
        `Skor: ${finalScore.score}\n` +
        `Persentase: ${finalScore.percentage}%\n` +
        `Grade: ${finalScore.grade}`,
      [
        {
          text: "Kembali",
          onPress: () => this.props.navigation.goBack(),
        },
      ]
    );
  }

  render() {
    const { questions, currentQuestionIndex, score, gameOver, timeRemaining } =
      this.state;

    // Tampilan game over
    if (gameOver) {
      return (
        <View style={styles.container}>
          <Text style={styles.gameOverText}>Kuis Selesai</Text>
          <ScoreDisplay
            currentScore={score}
            totalQuestions={questions.length}
          />
        </View>
      );
    }

    // Tampilan pertanyaan
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <View style={styles.container}>
        <Text style={styles.timerText}>
          Waktu Tersisa: {Math.floor(timeRemaining / 60)}:
          {(timeRemaining % 60).toString().padStart(2, "0")}
        </Text>

        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswer={this.handleAnswer}
        />

        <ScoreDisplay currentScore={score} totalQuestions={questions.length} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  timerText: {
    fontSize: 18,
    marginBottom: 10,
  },
  gameOverText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default QuizScreen;
