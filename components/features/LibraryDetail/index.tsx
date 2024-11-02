import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
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

    const bgColor = index % 2 === 0 ? styles.bgGreen : styles.bgYellow;
    const colorTitle = index % 2 > -1 ? styles.whiteTitle : styles.blackTitle;
    const textColor = index % 2 === 0 ? "#75A815" : "#F6CB1E";

    return (
        <HeaderShown title={detailLibrary.title}
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
                    <TouchableOpacity style={[styles.primaryButton, bgColor]}>
                        <Text style={styles.primaryText}>Ma tuý là gì?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton}>
                        <Text style={[styles.secondaryText, { color: textColor }]}>Ma tuý là gì?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    {detailLibrary?.content.map((contentItem) => (
                        <Text style={styles.contentText} key={contentItem?.id}>{contentItem?.content}</Text>
                    ))}
                </View>

                <View style={styles.sectionContainer}>
                    {detailLibrary?.content.map((contentItem) => (
                        <View style={styles.container} key={contentItem?.id}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={contentItem?.image} key={contentItem?.id} />
                            </View>
                            <Text style={styles.imageDescription}>{contentItem?.imageDescription}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.contentContainer}>
                    {detailLibrary?.content.map((contentItem) => (
                        <Text style={styles.contentText} key={contentItem?.id}>{contentItem?.content}</Text>
                    ))}
                </View>

                <View style={styles.contentContainer}>
                    {detailLibrary?.content.map((contentItem) => (
                        <Text style={styles.contentText} key={contentItem?.id}>{contentItem?.content}</Text>
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
    primaryButton: {
        width: 93,
        height: 34,
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
    secondaryButton: {
        width: 93,
        height: 34,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 12,
        shadowOpacity: 0.12,
        elevation: 10,
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
        height: windowWidth * 0.38 * 1.2,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    imageDescription: {
        width: windowWidth * 0.4,
        fontWeight: "500",
        fontSize: 12,
        lineHeight: 14.06,
        textAlign: "center",
    }
})