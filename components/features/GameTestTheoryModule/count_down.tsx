import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ViewProps } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const circleCircumference = 2 * Math.PI * 45;

interface TypeProps extends ViewProps {
    isReset: boolean,
    handleEndQuizz: () => void,
    setReset: (isReset: boolean) => void
}

export default function CountdownTimer({ isReset, handleEndQuizz, setReset, ...props }: TypeProps) {
    const [time, setTime] = useState(15);
    const [isActive, setIsActive] = useState(true);
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            setIsActive(false);
            handleEndQuizz();
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [time]);


    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1 - time / 15,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [time]);


    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(true);
        setTime(15);
        animatedValue.setValue(0);
        setReset(false);
    };

    useEffect(() => {
        if (isReset) resetTimer()
    }, [isReset])


    const animatedStrokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, circleCircumference],
        extrapolate: 'clamp'
    });

    const interpolatedColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#03622F', '#CD0A09'],
        extrapolate: 'clamp'
    });


    return (
        <View style={styles.timerContainer}  {...props}>
            <Svg width={75} height={75} viewBox="0 0 100 100">
                <Circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke=""
                    strokeWidth="10"
                    fill="transparent"
                />
                <AnimatedCircle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={interpolatedColor}
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={animatedStrokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                />
            </Svg>
            <View style={styles.container_timer_text}>
                <Animated.Text style={[styles.timer_text, { color: interpolatedColor }]} className='font-pregular'>{time}</Animated.Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
    },
    timerContainer: {
        position: 'absolute',
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_timer_text: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: 'center',
        alignItems: "center"
    },
    timer_text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 32,
    },
    button: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});