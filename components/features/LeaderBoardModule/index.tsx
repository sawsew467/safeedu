import HeaderShown from '@/components/ui/HeaderShown'
import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import bg_leaderboard from '@/assets/images/contest/details/bg_leaderboard.png'
const LeaderBoardModule = () => {
    return (
        <HeaderShown title="Bảng xếp hạng" HeaderComponent={() => (<View>
            <Image source={bg_leaderboard} ></Image>
        </View>)}>
            <View></View>
        </HeaderShown>
    )
}
const styles = StyleSheet.create({
    bg_container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    bg_image: {
        width: "100%",
        height: "100%"
    }
})

export default LeaderBoardModule