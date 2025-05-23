import SafeViewAndroid from "@/components/ui/SafeViewAndroid";
import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  useGetQuestionByQuizzIdQuery,
  useSubmissionQuestionMutation,
} from "@/services/quiz/quiz.api";
import { skipToken } from "@reduxjs/toolkit/query";
import TimerProgress from "./TimerProgress";
import LoadingPage from "@/components/ui/LoadingPage";
import QuizBackground from "./quiz-background";

const { height } = Dimensions.get("window");

const RenderItemAnswer = ({
  stateAnswer,
  item,
  index,
  choiceIndex,
  handleChoice,
}) => {
  let itemStyle;
  if (index === 0) itemStyle = styles.topLeft;
  else if (index === 1) itemStyle = styles.topRight;
  else if (index === 2) itemStyle = styles.bottomLeft;
  else if (index === 3) itemStyle = styles.bottomRight;

  const cellRender = () => {
    switch (stateAnswer) {
      case "answering":
        return (
          <TouchableHighlight
            underlayColor="#F7941D"
            onPress={() => handleChoice(index, item)}
            style={[
              styles.answer,
              itemStyle,
              choiceIndex === index && styles.choice_answer,
            ]}
          >
            <Text
              style={[
                styles.text_answer,
                choiceIndex === index && styles.text_choice_answer,
              ]}
            >
              {item}
            </Text>
          </TouchableHighlight>
        );
      case "correct":
        return (
          <View
            style={[
              styles.answer,
              itemStyle,
              choiceIndex === index && styles.correct_answer,
            ]}
          >
            <Text
              style={[
                styles.text_answer,
                choiceIndex === index && styles.text_choice_answer,
              ]}
            >
              {item}
            </Text>
          </View>
        );
      case "incorrect":
        return (
          <View style={[styles.answer, itemStyle]}>
            <Text style={[styles.text_answer]}>{item}</Text>
          </View>
        );
    }
  };
  return cellRender();
};
const QuizModule = () => {
  const { quizID, contestID }: { quizID: string; contestID: string } =
    useLocalSearchParams();

  const [choiceIndex, setChoiceIndex] = React.useState(null);
  const [timer, setTime] = React.useState(0);
  const [isReset, setReset] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [stateAnswer, setStateAnswer] = React.useState<
    "correct" | "incorrect" | "answering"
  >("answering");

  const [submission, { isLoading }] = useSubmissionQuestionMutation();

  const { questions, isFetching, isError } = useGetQuestionByQuizzIdQuery(
    quizID ? { id: quizID } : skipToken,
    {
      selectFromResult: ({ data, isFetching, isError }) => ({
        questions: data?.data?.data?.filter((item) => item?.isActive),
        isFetching,
        isError,
      }),
    }
  );

  const answers = React.useMemo(() => {
    return questions?.[questionIndex]?.answer;
  }, [questionIndex, questions?.length]);

  // console.log('questions', answers)
  const question = React.useMemo(() => {
    return questions?.[questionIndex]?.question;
  }, [questionIndex, questions?.length]);

  const timeLimit = React.useMemo(() => {
    return questions?.[questionIndex]?.time_limit ?? 15;
  }, [questionIndex, questions?.length]);

  React.useEffect(() => {
    if (questionIndex > 0) {
      resetQuestion();
      setTime(0);
    }
    const time = setInterval(() => {
      setTime((prev) => (prev < timeLimit ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(time);
  }, [questionIndex]);

  React.useEffect(() => {
    if (timer >= timeLimit) {
      setTimeout(() => {
        if (questionIndex >= questions?.length - 1) handleEndQuizz();
        else setQuestionIndex(questionIndex + 1);
      }, 1000);
    }
  }, [timer]);

  const handleChoice = async (index: number, answer) => {
    try {
      await submission({ question_id: questions[questionIndex]?._id, answer });
      setChoiceIndex(index);
      if (questionIndex >= questions?.length - 1) handleEndQuizz();
      else {
        setQuestionIndex(questionIndex + 1);
      }
    } catch {}
  };

  const resetQuestion = () => {
    setReset(true);
    setChoiceIndex(null);
    setStateAnswer("answering");
  };

  const handleEndQuizz = () => {
    router.replace(`/contest/${contestID}/quiz/${quizID}/result`);
  };
  if (isError && !isFetching) {
    handleEndQuizz();
  }

  return (
    <QuizBackground>
      <LoadingPage isLoading={isFetching} />

      <View style={styles.container_game}>
        <View className="mx-3 mt-2">
          <TimerProgress value={timer} max={timeLimit} />
        </View>
        <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <View style={styles.container_question}>
            <Text style={styles.number_questions} className="font-pregular">
              Câu {questionIndex + 1} trên {questions?.length}
            </Text>
          </View>
          <View style={styles.question}>
            <Text style={styles.text_question} className="font-psemibold">
              {question}
            </Text>
          </View>
        </View>
        <View style={styles.container_control_game}>
          <FlatList
            style={{ width: "100%" }}
            data={answers}
            scrollEnabled={false}
            contentContainerStyle={styles.answers}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <RenderItemAnswer
                stateAnswer={stateAnswer}
                item={item}
                index={index}
                choiceIndex={choiceIndex}
                handleChoice={handleChoice}
              />
            )}
          />
        </View>
      </View>
    </QuizBackground>
  );
};

const styles = StyleSheet.create({
  number_questions: {
    color: "#ffffff53",
    fontSize: 18,
  },
  container_question: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  correct_answer: {
    backgroundColor: "#75A815",
  },
  incorrect_answer: {
    backgroundColor: "#CD0A09",
  },
  container_number_question: {
    position: "absolute",
    top: 15,
    left: 8,
    zIndex: 99,
    width: 100,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  number_question: {
    fontSize: 16,
    color: "#75A815",
  },
  count_down: {
    position: "absolute",
    top: height * 0.005,
    right: 10,
    zIndex: 99,
  },
  text_choice_answer: {
    color: "#fff",
  },
  choice_answer: {
    backgroundColor: "#F7941D",
  },
  text_answer: {
    textAlign: "center",
    textTransform: "capitalize",
  },
  answer: {
    width: "100%",
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    borderWidth: 2,
  },
  answers: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignContent: "space-between",
    paddingHorizontal: 16,
    gap: 10,
  },
  text_question: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    textTransform: "capitalize",
  },
  question: {
    width: "100%",
    padding: 20,
    borderRadius: 32,
    overflow: "hidden",
  },
  container_control_game: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // height: 300,
    gap: 20,
  },
  container_game: {
    flex: 1,
    position: "relative",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 1,
  },
  topLeft: {
    alignSelf: "flex-start",
  },
  topRight: {
    alignSelf: "flex-end",
  },
  bottomLeft: {
    alignSelf: "flex-start",
  },
  bottomRight: {
    alignSelf: "flex-end",
  },
});

export default QuizModule;
