import { Image, FlatList, SafeAreaView, ScrollView, View, StyleSheet, Animated, Platform, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";
import GlobalStyles from '@/components/ui/SafeViewAndroid';
import frog_draw from "@/assets/icons/frog_draw.png"
import React from "react";

import { DRAW_DATA } from "@/healper/data/contest";
import chevron_left from "@/assets/icons/chevron_left.png"
import { router, useLocalSearchParams, usePathname } from "expo-router";
import HeaderShown from "@/components/ui/HeaderShown";


type ItemProps = {
    image: any,
    slug: string
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    item: {
        flex: 1,
        width: "50%",
        borderRadius: 24,
        aspectRatio: "19/28",
        overflow: "hidden"
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        justifyContent: 'center'
    },
    frog_draw: {
        position: "absolute",
        right: 4,
        top: 36.5,
    },
    animatedHeader: {
        height: 80,
        width: "100%",
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        position: 'absolute',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 0,
        top: 0, // -150 -> 0
        left: 0,
        right: 0,
        opacity: 1,
        ...Platform.select({
            android: {
                elevation: 4,
            },
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.4,
                shadowRadius: 16,
                shadowOffset: {
                    width: 4,
                    height: 3,
                },
            },
        }),
    },
    safeAreaView: {
        ...GlobalStyles.AndroidSafeArea,
        paddingTop: 0,
        backgroundColor: "#fff"
    },
    headerContainer: {
        overflow: 'hidden',
        borderBottomLeftRadius: 24,
        height: 64,
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: 'white',
        elevation: 4,

    },
    headerContent: {
        display: "flex",
        marginLeft: 10,
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignContent: "center"
    },
    backButtonContainer: {
        width: 28,
        height: 28,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    headerTitle: {
        fontWeight: '500',
        fontSize: 20,
        width: '100%',
    },
});

const ListItem = ({ image, slug }: ItemProps) => {
    const pathname = usePathname();
    const handleClickBtn = () => {
        router.push(`${pathname}/${slug}`)
    }
    return (
        <TouchableOpacity onPress={handleClickBtn} style={styles.item}>
            <View >
                <Image source={image} style={{ width: "100%", height: "100%" }} />
            </View>
        </TouchableOpacity>
    )
};

function DrawPictureContest() {
    const { contestID }: { contestID: string } = useLocalSearchParams();
    const [isExpanded, setIsExpanded] = React.useState(false);

    const content = React.useMemo(() => {
        return DRAW_DATA.find((data) => data?.slug === "ve-tranh-co-dong");
    }, [contestID])

    const scrollY = new Animated.Value(0)
    const stickyOpacity = scrollY.interpolate({
        outputRange: [0, 1],
        inputRange: [0, 160],
        extrapolate: 'clamp'
    })
    const stickyTop = scrollY.interpolate({
        outputRange: [-60, 20],
        inputRange: [0, 160],
        extrapolate: 'clamp'
    })

    const handleClickBtn = () => {
        router.back();
    }

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <HeaderShown title="Vẽ tranh cổ động">
            <View style={styles.frog_draw}>
                <Image source={frog_draw}></Image>
            </View>
            <FlatList
                scrollEnabled={false}
                data={content?.content}
                numColumns={2}
                columnWrapperStyle={{ gap: 20 }}
                key={"key"}
                renderItem={({ item }: { item: { image: string, slug: string } }) => <ListItem image={item?.image} slug={item?.slug} />}
                keyExtractor={(item: { image: string, slug: string }) => item?.slug}
                contentContainerStyle={{ gap: 20, paddingHorizontal: 16, marginTop: 100, width: "100%", paddingBottom: 100 }}
            />
        </HeaderShown>
    );
}

export default DrawPictureContest;