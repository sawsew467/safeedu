import { Image, StyleSheet, View } from "react-native";
import { Button } from "@/components/ui/Button";

import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";

export function NavMenu() {
  return (
    <View style={styles.navContainer}>
      {/* <Button style={styles.menuButton}>
        <EvilIcons name="navicon" size={24} color="#8C8C8A" />
      </Button> */}
      <View style={styles.buttonContainerRight}>
        {/* <Button style={[styles.menuButton, styles.marginRightSearchButton]}>
          <Fontisto name="search" size={18} color="#8C8C8A" />
        </Button>
        <Button style={styles.menuButton}>
          <MaterialIcons name="notifications-none" size={24} color="#8C8C8A" />
        </Button> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    // padding: 12,
    display: "flex",
    flexDirection: "row",
  },
  menuButton: {
    width: 54,
    height: 54,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomRightRadius: 45,
    borderBottomLeftRadius: 45,
    backgroundColor: "#F8F8F8",
    gap: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginLeft: 0,
  },
  buttonContainerRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  marginRightSearchButton: {
    marginRight: 8,
  },
});
