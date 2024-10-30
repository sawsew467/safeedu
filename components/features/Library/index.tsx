import { Button } from "@/components/ui/Button";
import SafeViewAndroid from "@/components/ui/SafeViewAndroid";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import chatIcon from "@/assets/icons/menuIcon/chatIcon.png";
import news_background1 from "@/assets/images/news_image/news_background(1).png";
import news_background2 from "@/assets/images/news_image/news_background(2).png";
import linear_gradient_1 from "@/assets/images/library_images/linear_gradient_1.png";
import linear_gradient_2 from "@/assets/images/library_images/linear_gradient_2.png";

import CardList from "@/components/features/Library/CardList";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const scaleFont = (size: number) => (windowWidth / 400) * size;
const imageTop = windowHeight < 700 ? -30 : -50;
const imageRight = windowWidth > 400 ? 15 : -10;
const imageLeft = windowWidth > 400 ? 210 : 182;

// const imageWidth = windowWidth * 0.45;
// const imageHeight = imageWidth * 1.2;

function Library() {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="bg-white">
      <ScrollView
        // overScrollMode="never"
        bounces={false}
      >
        <View style={{ paddingBottom: 20 }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Thông tin về ma tuý</Text>
            <Button style={[styles.menuButton]}>
              <View style={styles.chatIconContainer}>
                <Image
                  source={chatIcon}
                  style={styles.chatIcon}
                  resizeMode="contain"
                />
              </View>
            </Button>
          </View>
          <CardList />
        </View>
      </ScrollView>
      <Image source={news_background1} className="w-[330px] h-[270px] absolute -z-10 top-[70px] -left-[120px] opacity-25 rotate-[15deg]" />
      <View style={styles.backgroundContainer}>
        <Image source={news_background2} style={[styles.background, { resizeMode: 'contain' }]} className="opacity-25" />
      </View>
      <Image source={linear_gradient_1} style={styles.linearBackground1} />
      <Image source={linear_gradient_1} style={styles.linearBackground2} />
      <Image source={linear_gradient_2} style={styles.linearBackground3} resizeMode="contain" />
      <Image source={linear_gradient_2} style={styles.linearBackground4} resizeMode="contain" />
      <Image source={linear_gradient_1} style={styles.linearBackground5} resizeMode="contain" />
      <Image source={linear_gradient_1} style={styles.linearBackground6} resizeMode="contain" />
      <Image source={linear_gradient_2} style={styles.linearBackground7} resizeMode="contain" />
      <Image source={linear_gradient_2} style={styles.linearBackground8} resizeMode="contain" />
    </SafeAreaView>
  );
}

export default Library;

const styles = StyleSheet.create({
  linearBackground1: {
    width: 113,
    height: 113,
    // tintColor: '#000000',
    zIndex: 2,
    position: 'absolute',
    top: 90,
    left: -18,
  },
  linearBackground2: {
    width: 40,
    height: 40,
    // tintColor: '#000000',
    zIndex: 2,
    position: 'absolute',
    top: 236,
    left: 132,
  },
  linearBackground3: {
    width: 49,
    height: 45,
    // tintColor: '#000000',
    zIndex: 2,
    position: 'absolute',
    top: 400,
    left: imageLeft,
  },
  linearBackground4: {
    width: 87,
    height: 80,
    // tintColor: '#000000',
    zIndex: 2,
    position: 'absolute',
    top: 310,
    left: 320,
  },
  linearBackground5: {
    width: 97,
    height: 97,
    // tintColor: '#000000',
    zIndex: 2,
    position: 'absolute',
    top: 490,
    left: 150,
  },
  linearBackground6: {
    width: 97,
    height: 97,
    // tintColor: '#000000',
    zIndex: 2,
    position: 'absolute',
    top: 550,
    left: 310,
  },
  linearBackground7: {
    width: 97,
    height: 97,
    // tintColor: '#000000',
    zIndex: 2,
    position: 'absolute',
    top: 690,
    left: 200,
  },
  linearBackground8: {
    width: 97,
    height: 97,
    // tintColor: '#000000',
    zIndex: 2,
    position: 'absolute',
    top: 750,
    left: 344,
  },



  backgroundContainer: {
    // width: 200,
    // height: 381,
    position: 'absolute',
    zIndex: -1,
    top: 480,
    left: 125,
  },
  background: {
    width: 352,
    height: 381,
    // objectFit: 'cover'
  },
  header: {
    padding: 20,
    // paddingBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 38.4,
    textAlign: "center",
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
    position: 'absolute',
    right: 12,
    // top: 14,
  },
  chatIconContainer: {
    width: 18,
    height: 18,
    top: 100,
    // position: 'absolute'
  },
  chatIcon: {
    width: '100%',
    height: '100%',
    // marginTop: 10,
  },

})

