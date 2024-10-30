import { Image, StyleSheet, View } from "react-native";
import { Button } from "@/components/ui/Button";

import searchIcon from "@/assets/icons/menuIcon/searchIcon.png";
import notificationIcon from "@/assets/icons/menuIcon/notificationIcon.png";


export function NavMenu() {
    const styles = StyleSheet.create({
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
        burger: {
            // marginTop: 2,
            marginLeft: 0,
            width: 20,
            height: 2,
            borderRadius: 2,
            backgroundColor: '#8C8C8A',
        },
        burgerMargin: {
            // marginTop: 10,
        },
        searchIconContainer: {
            width: 18,
            height: 18,
            top: 100,
            // position: 'absolute'
        },
        searchIcon: {
            width: '100%',
            height: '100%',
            // marginTop: 10,
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
        <View className="p-3 flex flex-row">
            <Button
                style={styles.menuButton}
            >
                <View className="gap-[2px] ml-[2px]" >
                    <View style={styles.burger} ></View>
                    <View style={styles.burger} ></View>
                    <View style={styles.burger} ></View>
                    <View style={styles.burger} ></View>
                </View>
            </Button>
            <View className="flex-1 flex-row justify-end">
                <Button
                    style={[styles.menuButton, { marginRight: 8 }]}
                >
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