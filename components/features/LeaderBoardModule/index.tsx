import HeaderShown from '@/components/ui/HeaderShown'
import { View, Image, StyleSheet, Text, FlatList } from 'react-native'
import React from 'react'
import bg_leaderboard from '@/assets/images/contest/details/bg_leaderboard.png'
import ranking from '@/assets/icons/ranking.png'
import frame_ranking_1 from "@/assets/icons/frame_ranking_1.png"
import frame_ranking_2 from "@/assets/icons/frame_ranking_2.png"
import bg_ranking from "@/assets/images/contest/bg_ranking.png"
import { DATA, LEADERBOARD_DATA } from '@/healper/data/contest'
import { TypeLeaderBoard } from '@/healper/type/Contest'
import { useLocalSearchParams } from 'expo-router'
import { DataType, ContentType } from '../Contest'

const ListItem = ({ name, point, avatar, index }: TypeLeaderBoard & { index: number }) => {
    return (
        <View style={styles.container_board}>
            <Text style={styles.index}>{index + 1}. </Text>
            <View style={styles.board}>
                <View style={styles.infor_board}>
                    <Image source={avatar} style={styles.image_board} />
                    <Text style={styles.name_board} className='font-pmedium'>{name}</Text>
                </View>
                <Text style={styles.point_board} className='font-psemibold'>{point} Điểm</Text>
            </View>
        </View>)
}

const LeaderBoardModule = () => {
    const { contestID } = useLocalSearchParams();

    const detailContest = React.useMemo(() => {
        return DATA.find((item: DataType) => {
            return (item.content.some((content: ContentType) => content?.id === contestID))
        }).content.find((content) => content.id === contestID)
    }, [contestID])
    return (
        <HeaderShown title="Bảng xếp hạng" HeaderComponent={() => (
            <View style={styles.bg_container}>
                <Image style={styles.bg_image} source={bg_leaderboard} resizeMode='cover' />
            </View>
        )}>
            <View style={styles.content_container}>
                <View style={styles.container_title}>
                    <Text style={styles.title} className='font-pbold'>
                        {detailContest?.desc}
                    </Text>
                </View>
                <View style={styles.icon_ranking}>
                    <Image source={ranking} />
                </View>
                <View style={styles.top3_leaderboard}>
                    <View style={styles.top1_ranking}>
                        <View style={[styles.avatar_container_1, styles.container_ranking]}>
                            <Image source={frame_ranking_1} style={styles.frame_avatar_1}></Image>
                            <Image source={LEADERBOARD_DATA[0]?.avatar} style={[styles.avatar]} />
                        </View>
                        <View style={styles.container_content}>
                            <Text style={styles.name}>
                                {LEADERBOARD_DATA[0]?.name}
                            </Text>
                            <Text style={styles.point}>
                                {LEADERBOARD_DATA[0]?.point}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.top2_ranking}>
                        <View style={[styles.avatar_container_2, styles.container_ranking]}>
                            <Image source={frame_ranking_2} style={styles.frame_avatar_2}></Image>
                            <Image source={LEADERBOARD_DATA[1]?.avatar} style={styles.avatar} />
                        </View>
                        <View style={styles.container_content}>
                            <Text style={styles.name}>
                                {LEADERBOARD_DATA[1]?.name}
                            </Text>
                            <Text style={styles.point}>
                                {LEADERBOARD_DATA[1]?.point}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.top3_ranking}>
                        <View style={[styles.avatar_container_2, styles.container_ranking]}>
                            <Image source={frame_ranking_2} style={styles.frame_avatar_2}></Image>
                            <Image source={LEADERBOARD_DATA[2]?.avatar} style={styles.avatar} />
                        </View>
                        <View style={styles.container_content}>
                            <Text style={styles.name}>
                                {LEADERBOARD_DATA[2]?.name}
                            </Text>
                            <Text style={styles.point}>
                                {LEADERBOARD_DATA[2]?.point}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container_image_ranking}>
                    <Image source={bg_ranking} style={styles.image_ranking} />
                </View>
                <FlatList
                    scrollEnabled={false}
                    contentContainerStyle={styles.list_leaderboard}
                    data={LEADERBOARD_DATA} keyExtractor={(item) => item.name}
                    renderItem={({ item, index }: { item: TypeLeaderBoard, index: number }) => (<ListItem {...item} index={index} />)}>
                </FlatList>

            </View>
        </HeaderShown >
    )
}
const styles = StyleSheet.create({
    title: {
        width: "80%",
        textAlign: "center",
        fontSize: 24,
        color: "#fff"
    },
    container_title: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginBottom: 20
    },
    point_board: {
        fontSize: 20,
        color: "#03622F",
    },
    infor_board: {
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
        alignItems: "center",
        gap: 20
    },
    image_board: {
        width: 60,
        height: 60,
        borderRadius: 999
    },
    name_board: {
        fontSize: 16,
        color: "#03622F"
    },
    index: {
        fontSize: 22,
        color: "#fff"
    },
    board: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 366,
        height: 68,
        borderRadius: 999,
        padding: 4,
        paddingRight: 32,
        backgroundColor: "#fff"
    },
    container_board: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 20,
    },
    list_leaderboard: {
        marginTop: 20,
        display: "flex",
        alignContent: "center",
        gap: 20,
    },
    container_image_ranking: {
        marginTop: 20,
        width: 400,
        aspectRatio: "19/6"
    },
    image_ranking: {
        width: "100%",
        height: "100%"
    },
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
    },
    content_container: {
        marginTop: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 16,
        paddingBottom: 40
    },
    icon_ranking: {
        width: 70,
        height: 43
    },
    top3_leaderboard: {
        position: "relative",
        height: 220,
        width: 320,
        marginTop: 20
    },
    top1_ranking: {
        position: "absolute",
        top: 0,
        left: 100,
    },
    top2_ranking: {
        position: "absolute",
        bottom: -40,
        left: 0,
    },
    top3_ranking: {
        position: "absolute",
        bottom: -40,
        right: 0,
    },
    container_ranking: {
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    avatar: {
        borderRadius: 999,
        width: "100%",
        height: "100%",
    },
    avatar_container_1: {
        position: "relative",
        borderRadius: 999,
        width: 120,
        height: 120,
        borderWidth: 10,
        borderStyle: "solid",
        borderColor: "#FFFFFFAD",
    },
    avatar_container_2: {
        position: "relative",
        borderRadius: 999,
        width: 100,
        height: 100,
        borderWidth: 6,
        borderStyle: "solid",
        borderColor: "#FFFFFFAD",
    },
    frame_avatar_1: {
        position: "absolute",
        top: -20,
        left: -20,
        width: 140,
        height: 140,
    },
    frame_avatar_2: {
        position: "absolute",
        top: -15,
        left: -15,
        width: 120,
        height: 120,
    },
    name: {
        fontSize: 16,
        fontWeight: "700",
        width: "100%",
        textAlign: "center",
        color: "#fff"
    },
    point: {
        fontSize: 20,
        fontWeight: "700",
        width: "100%",
        textAlign: "center",
        color: "#fff"
    },
    container_content: {
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    }
})

export default LeaderBoardModule