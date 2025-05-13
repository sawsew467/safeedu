import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'

const LeaderboardGameModule = () => {
    const params = useLocalSearchParams();
    const data = JSON.parse(params.item as string);
    // console.log('params', data)

    return (
        <Text>{params.listQuizz}</Text>
    )
}

export default LeaderboardGameModule