import SafeViewAndroid from '@/components/ui/SafeViewAndroid'
import React from 'react'
import { Dimensions, FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import bg_game_1 from "@/assets/images/game_images/bg_game_test_theory.png"
import CountdownTimer from './count_down'
import { THEORY_TEST_DATA } from '@/healper/data/theory_test'
import { router } from 'expo-router'

const { height } = Dimensions.get("window")

const RenderItemAnswer = ({ correctAnswer, stateAnswer, item, index, choiceIndex, handleChoice }) => {
    let itemStyle;
    if (index === 0) itemStyle = styles.topLeft;
    else if (index === 1) itemStyle = styles.topRight;
    else if (index === 2) itemStyle = styles.bottomLeft;
    else if (index === 3) itemStyle = styles.bottomRight;

    const cellRender = () => {
        switch (stateAnswer) {
            case "answering":
                return (
                    <TouchableHighlight underlayColor="#FFDE16"
                        onPress={() => handleChoice(index)}
                        style={[styles.answer, itemStyle, choiceIndex === index && styles.choice_answer]}
                    >
                        <Text style={[styles.text_answer, choiceIndex === index && styles.text_choice_answer]}>{item}</Text>
                    </TouchableHighlight>
                );
            case "correct":
                return (
                    <View
                        style={[styles.answer, itemStyle, choiceIndex === index && styles.correct_answer]}
                    >
                        <Text style={[styles.text_answer, choiceIndex === index && styles.text_choice_answer]}>{item}</Text>
                    </View>)
            case "incorrect":
                return (
                    <View
                        style={[styles.answer, itemStyle, choiceIndex === index && styles.incorrect_answer, correctAnswer === index && styles.correct_answer]}
                    >
                        <Text style={[styles.text_answer, (choiceIndex === index || correctAnswer === index) && styles.text_choice_answer]}>{item}</Text>
                    </View>)
        }
    }
    return cellRender();
};
const { width } = Dimensions.get("window")
const GameTestTheoryModule = () => {

    const [choiceIndex, setChoiceIndex] = React.useState(null)
    const [isReset, setReset] = React.useState(false);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [stateAnswer, setStateAnswer] = React.useState<"correct" | "incorrect" | "answering">("answering");
    const [listAnswer, setListAnswer] = React.useState({
        correctAnswer: 0,
        listQuizz: []
    })
    const handleChoice = (index: number) => {
        setChoiceIndex(index);
    }

    const resetQuestion = () => {
        setReset(true);
        setQuestionIndex(questionIndex + 1);
        setChoiceIndex(null);
        setStateAnswer("answering");
    }

    const handleEndQuizz = () => {
        setListAnswer(() => ({
            correctAnswer: correctAnswer === choiceIndex ? listAnswer.correctAnswer + 1 : listAnswer.correctAnswer,
            listQuizz: [...listAnswer.listQuizz,
            {
                question: question,
                correctAnswer: answers[correctAnswer],
                answers: answers[choiceIndex],
                stateAnswer: correctAnswer === choiceIndex ? "correct" : "incorrect"
            }]
        }))
        if (correctAnswer === choiceIndex) {
            setStateAnswer("correct")
        } else
            setStateAnswer("incorrect")
        if (questionIndex + 1 < THEORY_TEST_DATA.length) {
            setTimeout(() => {
                resetQuestion();
            }, 5000)
        } else {
            const item = JSON.stringify({
                ...listAnswer,
                totalQuizz: THEORY_TEST_DATA.length
            });
            router.push({
                pathname: "leaderboard_game/1", params: {
                    item
                }
            })
        }
    }
    const answers = React.useMemo(() => {
        return THEORY_TEST_DATA[questionIndex].answer.sort(() => Math.random() - 0.5)
    }, [questionIndex])

    console.log('THEORY_TEST_DATA', answers)
    const question = React.useMemo(() => {
        return THEORY_TEST_DATA[questionIndex].question
    }, [questionIndex])

    const correctAnswer = React.useMemo(() => {
        return answers.findIndex((answer) => answer === THEORY_TEST_DATA[questionIndex].correctAnswer)
    }, [questionIndex])

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <ImageBackground source={bg_game_1} style={styles.bg} resizeMode='cover' />
            <View style={styles.container_game}>
                <CountdownTimer style={styles.count_down} handleEndQuizz={handleEndQuizz} isReset={isReset} setReset={setReset} />
                <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <View style={styles.container_question}>
                        <Text style={styles.number_questions} className='font-pregular'>Câu {questionIndex + 1} trên {THEORY_TEST_DATA.length}</Text>
                    </View>
                    <View style={styles.question}>
                        <Text style={styles.text_question} className='font-psemibold'>
                            {question}
                        </Text>
                    </View>
                </View>
                <View style={styles.container_control_game}>
                    <FlatList
                        style={{ width: "100%" }}
                        data={answers}
                        contentContainerStyle={styles.answers}
                        keyExtractor={(item) => item}
                        renderItem={({ item, index }) => <RenderItemAnswer correctAnswer={correctAnswer} stateAnswer={stateAnswer} item={item} index={index} choiceIndex={choiceIndex} handleChoice={handleChoice} />}
                    />
                </View>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    number_questions: {
        color: "#ffffff53",
        fontSize: 18,
    },
    container_question: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    number_question: {
        fontSize: 16,
        color: "#75A815"
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
        backgroundColor: "#FFDE16",
    },
    text_answer: {
        textAlign: "center",
        textTransform: "capitalize"
    },
    answer: {
        width: "100%",
        padding: 15,
        borderRadius: 16,
        backgroundColor: "#fff",
        overflow: 'hidden',
        borderWidth: 2,
    },
    answers: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignContent: "space-between",
        paddingHorizontal: 16,
        gap: 10
    },
    text_question: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
        textTransform: "capitalize"
    },
    question: {
        width: "100%",
        padding: 20,
        borderRadius: 32,
        overflow: 'hidden',
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
        // flex: 1,
        position: "relative",
        display: "flex",
        width: "100%",
        height: height * 0.85,
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    bg: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    topLeft: {
        alignSelf: 'flex-start',
    },
    topRight: {
        alignSelf: 'flex-end',
    },
    bottomLeft: {
        alignSelf: 'flex-start',
    },
    bottomRight: {
        alignSelf: 'flex-end',
    },
})

export default GameTestTheoryModule