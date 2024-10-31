import { Image, StyleSheet, View } from "react-native";
import { Button } from "@/components/ui/Button";

import searchIcon from "@/assets/icons/menuIcon/searchIcon.png";
import notificationIcon from "@/assets/icons/menuIcon/notificationIcon.png";


export function NavMenu() {
    const styles = StyleSheet.create({
        navContainer: {
            padding: 12,
            display: "flex",
            flexDirection: "row"
        },
        menuButton: {
            width: 54,
            height: 54,
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
            borderBottomRightRadius: 45,
            borderBottomLeftRadius: 45,
            backgroundColor: '#F8F8F8',
            gap: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            marginLeft: 0,
        },
        burgerContainer: {
            gap: 2,
            marginLeft: 2,
        },
        burger: {
            marginLeft: 0,
            width: 20,
            height: 2,
            borderRadius: 2,
            backgroundColor: '#8C8C8A',
        },
        buttonContainerRight: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
        },
        marginRightSearchButton: {
            marginRight: 8,
        },
        searchIconContainer: {
            width: 18,
            height: 18,
            top: 100,
        },
        searchIcon: {
            width: '100%',
            height: '100%',
        },
        notificationIconContainer: {
            width: 19,
            height: 19,

        },
        notificationIcon: {
            width: '100%',
            height: '100%',
        }
    })
    return (
        <View style={styles.navContainer}>
            <Button style={styles.menuButton}>
                <View style={styles.burgerContainer} >
                    <View style={styles.burger} ></View>
                    <View style={styles.burger} ></View>
                    <View style={styles.burger} ></View>
                    <View style={styles.burger} ></View>
                </View>
            </Button>
            <View style={styles.buttonContainerRight}>
                <Button style={[styles.menuButton, styles.marginRightSearchButton]}>
                    <View style={styles.searchIconContainer}>
                        <Image
                            source={searchIcon}
                            style={styles.searchIcon}
                            resizeMode="contain"
                        />
                    </View>
                </Button>
                <Button
                    style={styles.menuButton}
                >
                    <View style={styles.notificationIconContainer} >
                        <Image
                            source={notificationIcon}
                            style={styles.notificationIcon}
                            resizeMode="contain"
                        />
                    </View>
                </Button>
            </View>
        </View>
    )
}