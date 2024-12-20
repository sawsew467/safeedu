import React from "react";
import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  iconContainer: {
    paddingTop: windowHeight * 0.01,
  }
})

const TabIcon = ({ IconComponent, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <View style={styles.iconContainer}>
        <IconComponent color={color} size={24} />
      </View>
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#75A815",
          tabBarInactiveTintColor: "#00000080",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#00000080",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                IconComponent={() => <AntDesign name="home" size={24} color={color} />}
                color={color}
                name="Trang chủ"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                IconComponent={() => <Feather name="book" size={24} color={color} />}
                color={color}
                name="Thư viện"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="contest"
          options={{
            title: "Contest",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                IconComponent={() => <AntDesign name="Trophy" size={24} color={color} />}
                color={color}
                name="Cuộc thi"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="game"
          options={{
            title: "Game",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                IconComponent={() => <Ionicons name="game-controller-outline" size={24} color={color} />}
                color={color}
                name="Trò chơi"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                IconComponent={() => <MaterialCommunityIcons name="account-circle-outline" size={24} color={color} />}
                color={color}
                name="Tài khoản"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  );
};

export default TabLayout;
