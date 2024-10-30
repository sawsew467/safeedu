import { SafeAreaView, Text, View } from "react-native";
import GlobalStyles from '@/components/ui/SafeViewAndroid';
function News() {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea} className="bg-white">
      <View>
        <Text>Newáddddddddddddddddddddddddddddddddddddddddddddddddddds</Text>
      </View>
    </SafeAreaView>
  );
}

export default News;
