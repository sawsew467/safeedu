import { Image, View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";

import HeaderShown from "@/components/ui/HeaderShown";
import image_1 from "@/assets/images/contest/details/phongchongmatuy_1.png"
import chrven_bottom from "@/assets/icons/chevron_bottom.png"
import chrven_top from "@/assets/icons/chevron_top.png"
import share_android from "@/assets/icons/share_android.png"

function DrawPictureContest() {
    const [isExpanded, setExpanded] = React.useState(false);

    const toggleExpanded = () => {
        setExpanded(!isExpanded);
    }
    const handleShare = () => { }

    return (
        <HeaderShown title="Vẽ tranh cổ động" rightIcon={{ image: share_android, onPress: handleShare }}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={image_1} style={styles.image}></Image>
                </View>
                <View style={styles.flexBoxMetadata}>
                    <View style={styles.metadataContainer}>
                        <Text style={styles.titleMetadata}>Tác giả:</Text>
                        <Text style={styles.metadata} className="font-pmedium">Võ Thị Thuý Sương</Text>
                    </View>
                    <View style={styles.metadataContainer}>
                        <Text style={styles.titleMetadata}>Ngày sinh:</Text>
                        <Text style={styles.metadata} className="font-pmedium">28/08/2010</Text>
                    </View>
                    <View style={styles.metadataContainer}>
                        <Text style={styles.titleMetadata} >Thể loại:</Text>
                        <Text style={styles.metadata} className="font-pmedium">Tranh vẽ máy</Text>
                    </View>
                </View>
                <View style={styles.flexBoxDesc}>
                    <Text style={styles.text} numberOfLines={isExpanded ? undefined : 3}>
                        {"    "}“Cái chết của ma túy” là một bức tranh mạnh mẽ và đầy cảm xúc, mô tả sự tàn phá của ma túy đối với con người và xã hội. Bối cảnh trung tâm là một hình tượng con người, gầy gò và mệt mỏi, chìm trong bóng tối, với đôi mắt trống rỗng và khuôn mặt mòn mỏi. Những dây xích vô hình của nghiện ngập đang siết chặt quanh cơ thể, như thể họ đang bị giam cầm trong một vòng xoáy không lối thoát. Xung quanh là những mảnh vụn của cuộc đời họ — những mảnh ký ức, niềm vui, hạnh phúc đã bị ma túy phá hủy, rơi rớt như tàn tro.
                    </Text>
                    <TouchableOpacity onPress={toggleExpanded} style={styles.expandButtonContainer}>
                        <View style={styles.expandButtonContent}>
                            <Text style={styles.readMoreText}>
                                {isExpanded ? 'Lược bớt' : 'Xem thêm'}
                            </Text>
                            <View style={styles.expandButtonIcon} >
                                <Image source={isExpanded ? chrven_top : chrven_bottom} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </HeaderShown>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginTop: 20
    },
    textContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: 'pbold',
        color: '#000',
        textAlign: 'center',
    },
    imageContainer: {
        width: "100%",
        borderRadius: 24,
        overflow: "hidden",
        aspectRatio: "19/28"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    subtitle: {
        fontSize: 48,
        fontFamily: 'pbold',
        color: '#000',
        textAlign: 'center',
    },
    flexBoxMetadata: {
        width: "100%",
        marginTop: 24,
        display: "flex",
        gap: 12
    },
    flexBoxDesc: {
        width: "100%",
        marginTop: 24,
        paddingBottom: 30,
    },
    expandButtonContainer: {
        marginTop: 8,
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 24,
        color: '#333',
    },
    expandButtonContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: "100%",
    },
    expandButtonIcon: {
        width: 8,
        height: 8,
    },
    readMoreText: {
        fontSize: 16,
        fontFamily: "Poppins-SemiBold",
        color: "#00000075",
    },
    metadataContainer: {
        width: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        position: "relative"
    },
    metadata: {
        fontSize: 16,
        display: "flex",
        justifyContent: "center"
    },
    titleMetadata: {
        fontSize: 16,
        fontFamily: "400",
        position: "absolute",
        left: 0
    }
});

export default DrawPictureContest;