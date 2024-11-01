import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import arrow_icon from "@/assets/icons/arrow_icon.png";
import card_image_1 from "@/assets/images/library_images/card_image_1.png";
import card_image_2 from "@/assets/images/library_images/card_image_2.png";
import card_image_3 from "@/assets/images/library_images/card_image_3.png";
import card_image_4 from "@/assets/images/library_images/card_image_4.png";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const scaleFont = (size: number) => (windowWidth / 400) * size;
const imageTop = windowHeight < 700 ? -30 : -50;
const imageRight = windowWidth > 400 ? 15 : -10;
const imageLeft = windowWidth > 400 ? 15 : 10;

const imageWidth = windowWidth * 0.45;
const imageHeight = imageWidth * 1.2;

const textContainerWidth = windowWidth > 400 ? (windowWidth * 0.25) : (windowWidth * 0.3);

const CardList = () => {


    return (
        <View style={styles.cardListContainer}>

            <TouchableOpacity >
                <View style={[styles.cardContainer, styles.cardGreen]}>
                    <View style={styles.textContainer_1}>
                        <Text style={[styles.title, styles.whiteTitle]}>
                            Tổng Quan Về Ma Tuý
                        </Text>
                        <View style={styles.infoRow}>
                            <Text style={[styles.readMoreText, styles.whiteReadMoreText]}>
                                Xem thông tin
                            </Text>
                            <Image source={arrow_icon} style={[styles.arrow, styles.whiteArrow]} resizeMode='cover' />
                        </View>
                    </View>
                    <View style={styles.imageContainerRight}>
                        <Image source={card_image_1} style={styles.image} resizeMode='contain' />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={[styles.cardContainer, styles.cardYellow]}>
                    <View style={styles.textContainer_2}>
                        <Text style={[styles.title, styles.blackTitle]}>
                            Tác Hại Của Ma Tuý
                        </Text>
                        <View style={[styles.infoRow]}>
                            <Text style={[styles.readMoreText, styles.blackReadMoreText]}>
                                Xem thông tin
                            </Text>
                            <Image source={arrow_icon} style={[styles.arrow, styles.blackArrow]} resizeMode='cover' />
                        </View>
                    </View>
                    <View style={styles.imageContainerLeft}>
                        <Image source={card_image_2} style={styles.image} resizeMode='contain' />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={[styles.cardContainer, styles.cardGreen]}>
                    <View style={styles.textContainer_3}>
                        <Text style={[styles.title, styles.whiteTitle]}>
                            Cai Nghiện Và Hỗ Trợ
                        </Text>
                        <View style={styles.infoRow}>
                            <Text style={[styles.readMoreText, styles.whiteReadMoreText]}>
                                Xem thông tin
                            </Text>
                            <Image source={arrow_icon} style={[styles.arrow, styles.whiteArrow]} resizeMode='cover' />
                        </View>
                    </View>
                    <View style={styles.imageContainerRight}>
                        <Image source={card_image_3} style={styles.image} resizeMode='contain' />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity>
                <View style={[styles.cardContainer, styles.cardYellow]}>
                    <View style={styles.textContainer_4}>
                        <Text style={[styles.title, styles.blackTitle]}>
                            Hotline Hỗ Trợ
                        </Text>
                        <View style={[styles.infoRow]}>
                            <Text style={[styles.readMoreText, styles.blackReadMoreText]}>
                                Xem thông tin
                            </Text>
                            <Image source={arrow_icon} style={[styles.arrow, styles.blackArrow]} resizeMode='cover' />
                        </View>
                    </View>
                    <View style={styles.imageContainerLeft}>
                        <Image source={card_image_4} style={styles.image} resizeMode='contain' />
                    </View>
                </View>
            </TouchableOpacity>

        </View >
    )
}

export default CardList

const styles = StyleSheet.create({
    cardListContainer: {
        paddingVertical: 18,
        paddingHorizontal: 12,
        gap: 30,
    },
    cardContainer: {
        width: '100%',
        height: windowWidth * 0.3 * 1.2,
        borderRadius: 24,
        paddingVertical: 24,
        paddingHorizontal: 20,
        display: 'flex',
        pointerEvents: "none"
    },
    cardGreen: {
        backgroundColor: '#75A815',
    },
    cardYellow: {
        backgroundColor: "#F6CB1E",
        flexDirection: 'row-reverse',
    },
    textContainer_1: {
        width: windowWidth * 0.45,
    },
    textContainer_2: {
        width: windowWidth * 0.4,
        alignItems: 'flex-end',
    },
    textContainer_3: {
        width: windowWidth * 0.45,
    },
    textContainer_4: {
        width: textContainerWidth,
        alignItems: 'flex-end'
    },
    title: {
        width: '100%',
        fontWeight: '900',
        fontSize: scaleFont(24),
        lineHeight: 34,
    },
    whiteTitle: {
        color: '#FFFFFF',
    },
    blackTitle: {
        color: '#000000',
        textAlign: 'right',
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    readMoreText: {
        fontWeight: '400',
        fontSize: scaleFont(16),
        lineHeight: 38.6,
        opacity: 0.6,
    },
    whiteReadMoreText: {
        color: '#FFFFFF',
    },
    blackReadMoreText: {
        color: '#000000',
        textAlign: 'right',
    },
    arrow: {
        width: 6,
        height: 10,
        opacity: 0.6,
        marginTop: 2,
        marginLeft: 8,
    },
    whiteArrow: {
        tintColor: "#FFFFFF",
    },
    blackArrow: {
        tintColor: "#000000"
    },
    imageContainerRight: {
        width: imageWidth,
        height: imageHeight,
        position: 'absolute',
        top: imageTop,
        right: imageRight,
    },
    imageContainerLeft: {
        width: imageWidth,
        height: imageHeight,
        position: 'absolute',
        top: imageTop,
        left: imageLeft,
    },
    image: {
        width: '100%',
        height: '100%',
    },
})