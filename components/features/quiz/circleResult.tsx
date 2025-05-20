import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function ProgressScore({ percent = 20 }: { percent?: number }) {
    const size = 150;
    const strokeWidth = 15;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const getColor = (value: number) => {
        if (value >= 80) return "#4CAF50"; // green
        if (value >= 50) return "#FFC107"; // yellow
        return "#F44336"; // red
    };

    const strokeDashoffset = circumference - (circumference * percent) / 100;

    return (
        <View style={styles.container}>
            <Svg width={size} height={size} style={styles.svg}>
                {/* Background Circle */}
                <Circle
                    stroke={getColor(percent)}
                    fill="none"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    opacity={0.2}
                />
                {/* Progress Circle */}
                <Circle
                    stroke={getColor(percent)}
                    fill="none"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${center} ${center})`}
                />
            </Svg>
            <View style={styles.textContainer}>
                <Text style={[styles.percentText, { color: getColor(percent) }]}>
                    {percent.toFixed(0)}%
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: 150,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
    },
    svg: {
        position: "absolute",
        transform: [{ rotateZ: "0deg" }],
    },
    textContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    percentText: {
        fontSize: 32,
        fontWeight: "bold",
    },
});