import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import trophy_image from "@/assets/images/game_images/trophy_image.png";
const GameResult = () => {
    return (
        <SafeAreaView>

            <View style={styles.container}>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Tuyệt! Bạn đã trả lời gần đúng hết!</Text>
                    <View style={styles.headerImageContainer}>
                        <Image style={styles.headerImage} source={trophy_image} />
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default GameResult

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 40,
        width: "100%",
        height: "100%",
    },
    headerContainer: {
        display: "flex",
        flexDirection: "row",
    },
    headerText: {
        fontWeight: "700",
        fontSize: 24,
        lineHeight: 32,
        color: "#75A815",
    },
    headerImageContainer: {
        width: "25%",
        aspectRatio: 90 / 100,
    },
    headerImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
})