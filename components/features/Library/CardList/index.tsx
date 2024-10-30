import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import arrow_icon from "@/assets/icons/arrow_icon.png";
import card_image_1 from "@/assets/images/library_images/card_image_1.png";
import card_image_2 from "@/assets/images/library_images/card_image_2.png";
import card_image_3 from "@/assets/images/library_images/card_image_3.png";
import card_image_4 from "@/assets/images/library_images/card_image_4.png";

type Props = {}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const scaleFont = (size: number) => (windowWidth / 400) * size;
const imageTop = windowHeight < 700 ? -30 : -50;
const imageRight = windowWidth > 400 ? 15 : -10;
const imageLeft = windowWidth > 400 ? 15 : 10;

const imageWidth = windowWidth * 0.45;
const imageHeight = imageWidth * 1.2;

const textContainerWidth = windowWidth > 400 ? (windowWidth * 0.25) : (windowWidth * 0.3);

const CardList = (props: Props) => {


    return (
        <View style={styles.cardListContainer}>

            <View style={[styles.cardContainer, styles.cardGreen]}>
                <View style={{ width: windowWidth * 0.45 }}>
                    <Text style={[styles.title, { fontSize: scaleFont(24), color: '#FFFFFF' }]}>
                        Tổng Quan Về Ma Tuý
                    </Text>
                    <View style={styles.infoRow}>
                        <Text style={[styles.subTitle, { fontSize: scaleFont(16), color: '#FFFFFF' }]}>
                            Xem thông tin
                        </Text>
                        <Image source={arrow_icon} style={[styles.arrow, { tintColor: "#FFFFFF" }]} resizeMode='cover' />
                    </View>
                </View>
                <View style={[styles.imageContainer, { top: imageTop, right: imageRight, width: imageWidth, height: imageHeight }]}>
                    <Image source={card_image_1} style={styles.image} resizeMode='contain' />
                </View>
            </View>

            <View style={[styles.cardContainer, styles.cardYellow, { flexDirection: 'row-reverse' }]}>
                <View style={{ width: windowWidth * 0.4, alignItems: 'flex-end' }}>
                    <Text style={[styles.title, { fontSize: scaleFont(24), color: '#000000', textAlign: 'right' }]}>
                        Tác Hại Của Ma Tuý
                    </Text>
                    <View style={[styles.infoRow, { justifyContent: 'flex-end' }]}>
                        <Text style={[styles.subTitle, { fontSize: scaleFont(16), color: '#000000', textAlign: 'right' }]}>
                            Xem thông tin
                        </Text>
                        <Image source={arrow_icon} style={[styles.arrow, { tintColor: '#000000', }]} resizeMode='cover' />
                    </View>
                </View>
                <View style={[styles.imageContainer, { top: imageTop, left: imageLeft, width: imageWidth, height: imageHeight }]}>
                    <Image source={card_image_2} style={styles.image} resizeMode='contain' />
                </View>
            </View>

            <View style={[styles.cardContainer, styles.cardGreen]}>
                <View style={{ width: windowWidth * 0.45 }}>
                    <Text style={[styles.title, { fontSize: scaleFont(24), color: '#FFFFFF' }]}>
                        Cai Nghiện Và Hỗ Trợ
                    </Text>
                    <View style={styles.infoRow}>
                        <Text style={[styles.subTitle, { fontSize: scaleFont(16), color: '#FFFFFF' }]}>
                            Xem thông tin
                        </Text>
                        <Image source={arrow_icon} style={[styles.arrow, { tintColor: "#FFFFFF" }]} resizeMode='cover' />
                    </View>
                </View>
                <View style={[styles.imageContainer, { top: imageTop, right: imageRight, width: imageWidth, height: imageHeight }]}>
                    <Image source={card_image_3} style={styles.image} resizeMode='contain' />
                </View>
            </View>

            <View style={[styles.cardContainer, styles.cardYellow, { flexDirection: 'row-reverse' }]}>
                <View style={{ width: textContainerWidth, alignItems: 'flex-end' }}>
                    <Text style={[styles.title, { fontSize: scaleFont(24), color: '#000000', textAlign: 'right' }]}>
                        Hotline Hỗ Trợ
                    </Text>
                    <View style={[styles.infoRow, { justifyContent: 'flex-end' }]}>
                        <Text style={[styles.subTitle, { fontSize: scaleFont(16), color: '#000000', textAlign: 'right' }]}>
                            Xem thông tin
                        </Text>
                        <Image source={arrow_icon} style={[styles.arrow, { tintColor: '#000000', }]} resizeMode='cover' />
                    </View>
                </View>
                <View style={[styles.imageContainer, { top: imageTop, left: imageLeft, width: imageWidth, height: imageHeight }]}>
                    <Image source={card_image_4} style={styles.image} resizeMode='contain' />
                </View>
            </View>

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
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    cardGreen: {
        backgroundColor: '#75A815',
    },
    cardYellow: {
        backgroundColor: "#F6CB1E",
    },
    textContainer: {
        width: windowWidth * 0.45,
        // flexWrap: 'wrap',
    },
    title: {
        width: '100%',
        fontWeight: '900',
        // fontSize: 24,
        lineHeight: 34,
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    subTitle: {
        fontWeight: '400',
        // fontSize: 16,
        lineHeight: 38.6,
        opacity: 0.6,
    },
    arrow: {
        width: 6,
        height: 10,
        opacity: 0.6,
        marginTop: 2,
        marginLeft: 8,
    },
    imageContainer: {
        position: 'absolute',
        // top: -40,
        // right: 50,
    },
    image: {
        width: '100%',
        height: '100%',
    },
})