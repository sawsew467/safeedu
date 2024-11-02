import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import arrow_icon from "@/assets/icons/arrow_icon.png";
import { LibraryDataType } from '@/healper/type/library-type';
import { router } from 'expo-router';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const scaleFont = (size: number) => (windowWidth / 400) * size;
const imageTop = windowHeight < 700 ? -30 : -50;
const imageRight = windowWidth > 400 ? 15 : -10;
const imageLeft = windowWidth > 400 ? 15 : 10;

const imageWidth = windowWidth * 0.45;
const imageHeight = imageWidth * 1.2;

const textContainerWidth = windowWidth > 400 ? (windowWidth * 0.25) : (windowWidth * 0.3);

const CardList = ({ data }: { data: LibraryDataType[] }) => {

    const getTextContainer = (index: number) => {
        switch (index) {
            case 0:
                return styles.textContainer_1;
            case 1:
                return styles.textContainer_2;
            case 2:
                return styles.textContainer_3;
            case 3:
                return styles.textContainer_4;
        }
    };

    return (
        <View style={styles.cardListContainer}>

            {data.map((item, index) => (
                <TouchableOpacity key={item.id} onPress={() => {
                    router.push(`/library/${item?.id}`);
                }}>
                    <View style={[styles.cardContainer, index % 2 === 0 ? styles.cardGreen : styles.cardYellow]}>
                        <View style={[getTextContainer(index)]}>
                            <Text style={[styles.title, index % 2 === 0 ? styles.whiteTitle : styles.blackTitle]}>
                                {item.title}
                            </Text>
                            <View style={styles.infoRow}>
                                <Text style={[
                                    styles.readMoreText,
                                    index % 2 === 0 ? styles.whiteReadMoreText : styles.blackReadMoreText
                                ]}>
                                    Xem thông tin
                                </Text>
                                <Image source={arrow_icon} style={[
                                    styles.arrow,
                                    index % 2 === 0 ? styles.whiteArrow : styles.blackArrow
                                ]} resizeMode='cover' />
                            </View>
                        </View>
                        <View style={index % 2 === 0 ? styles.imageContainerRight : styles.imageContainerLeft}>
                            <Image source={item.image} style={styles.image} resizeMode='contain' />
                        </View>
                    </View>
                </TouchableOpacity>
            ))
            }

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
        width: windowWidth * 0.45,
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