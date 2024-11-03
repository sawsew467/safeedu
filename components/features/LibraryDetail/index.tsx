import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';

import HeaderShown from '@/components/ui/HeaderShown';
import { LIBRARY_DATA } from '@/healper/data/library';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const scaleFont = (size: number) => (windowWidth / 400) * size;

const LibraryDetail = () => {
    const { libraryID } = useLocalSearchParams();

    const [detailLibrary, index] = React.useMemo(() => {
        const foundIndex = LIBRARY_DATA.findIndex((item) => item.id === libraryID)
        return [LIBRARY_DATA[foundIndex], foundIndex];
    }, [libraryID]);

    const [selectedButton, setSelectedButton] = useState('primary');

    const bgColor = index % 2 === 0 ? styles.bgGreen : styles.bgYellow;
    const colorTitle = index % 2 > -1 ? styles.whiteTitle : styles.blackTitle;
    const textColor = index % 2 === 0 ? "#75A815" : "#F6CB1E";

    const selectedSubtitle = selectedButton === 'primary' ? detailLibrary.subtitle[0] : detailLibrary.subtitle[1];

    return (
        <HeaderShown title="Thông Tin Chi Tiết"
            HeaderComponent={() =>
                <View style={[styles.cardContainer, bgColor]}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.title, colorTitle]}>
                            {detailLibrary.title}
                        </Text>
                    </View>

                </View>
            }
        >

            <View style={styles.detailContainer}>

                <View style={styles.imageHeaderContainer}>
                    <Image source={detailLibrary.image} style={styles.imageHeader} resizeMode='contain' />
                </View>

                <View style={styles.buttonsContainer}>

                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'primary' ? bgColor : styles.secondaryButton]}
                        onPress={() => setSelectedButton('primary')}
                    >
                        <Text
                            style={[styles.buttonText, selectedButton === 'primary' ? styles.primaryText : [styles.secondaryText, { color: textColor }]]}
                        >
                            {detailLibrary.subtitle[0].title}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'secondary' ? bgColor : styles.secondaryButton]}
                        onPress={() => setSelectedButton('secondary')}
                    >
                        <Text
                            style={[styles.buttonText, selectedButton === 'secondary' ? styles.primaryText : [styles.secondaryText, { color: textColor }]]}
                        >
                            {detailLibrary.subtitle[1].title}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    {selectedSubtitle?.content.map((content, index) => (
                        <Text style={styles.contentText} key={`${selectedSubtitle.id}-content-${index}`}>{content}</Text>
                    ))}
                </View>

                <View style={styles.sectionContainer}>
                    {selectedSubtitle?.image.map((img, imgIndex) => (
                        <View style={styles.container} key={`${selectedSubtitle.id}-image-${imgIndex}`}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={img} />
                            </View>
                            <Text style={styles.imageDescription}>{selectedSubtitle.imageDescription[imgIndex]}</Text>
                        </View>
                    ))}
                </View>

            </View>
        </HeaderShown>
    )
}

export default LibraryDetail

const styles = StyleSheet.create({
    cardListContainer: {
        paddingVertical: 18,
        paddingHorizontal: 12,
        gap: 30,
    },
    cardContainer: {
        width: '100%',
        height: windowWidth * 0.4 * 1.2,
        position: "absolute",
        paddingVertical: 24,
        paddingHorizontal: 20,
        display: 'flex',
    },
    bgGreen: {
        backgroundColor: '#75A815',
    },
    bgYellow: {
        backgroundColor: "#F6CB1E",
    },
    textContainer: {
        width: windowWidth * 0.50,
        flex: 1,
    },
    title: {
        width: '100%',
        fontWeight: '900',
        fontSize: scaleFont(28),
        lineHeight: 34,
    },
    whiteTitle: {
        color: '#FFFFFF',
    },
    blackTitle: {
        color: '#000000',
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
    imageHeaderContainer: {
        width: windowWidth * 0.45,
        height: windowWidth * 0.38 * 1.2,
        position: 'absolute',
        top: windowHeight < 700 ? -30 : -110,
        right: windowWidth > 400 ? -20 : -10,
    },
    imageHeader: {
        width: '100%',
        height: '100%',
    },
    detailContainer: {
        marginTop: 120,
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        position: "relative",
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
    },
    button: {
        padding: 9,
        borderRadius: 12,
        justifyContent: "center",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 12,
        shadowOpacity: 0.12,
        elevation: 10,
    },
    primaryButton: {
        backgroundColor: "#75A815",
    },
    secondaryButton: {
        backgroundColor: "#FFFFFF",
    },
    buttonText: {
        fontWeight: "500",
        fontSize: 12,
        textAlign: "center",
    },
    primaryText: {
        fontWeight: "500",
        fontSize: 12,
        color: "white",
        textAlign: "center",
    },
    secondaryText: {
        fontWeight: "500",
        fontSize: 12,
        textAlign: "center",
    },
    contentContainer: {
        width: windowWidth * 0.9,
        marginTop: 20,
        gap: 20,
    },
    contentText: {
        fontWeight: "500",
        fontSize: 14,
        lineHeight: 21.2,
    },
    sectionContainer: {
        marginTop: 20,
        paddingBottom: 20,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    container: {
        alignItems: "center",
    },
    imageContainer: {
        width: windowWidth * 0.38,
        // height: windowWidth * 0.38 * 1.2,
        aspectRatio: 5 / 4,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    imageDescription: {
        marginTop: 10,
        width: windowWidth * 0.4,
        fontWeight: "500",
        fontSize: 12,
        lineHeight: 14.06,
        textAlign: "center",
    }
})