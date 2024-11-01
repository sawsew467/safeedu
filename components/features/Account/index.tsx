import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from 'expo-router';

const highlightContentData = [
  { title: "Làm gì để tránh nghiện thuốc", image: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/28/matuy-16354339012031683679458.jpg", progress: 80 },
  { title: "Người nghiện thuốc lắc", image: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/28/matuy-16354339012031683679458.jpg", progress: 60 },
  { title: "Dấu hiệu nhận biết nguời nghiện", image: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/28/matuy-16354339012031683679458.jpg", progress: 80 },
  { title: "Khác", image: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/28/matuy-16354339012031683679458.jpg", progress: 50 },
];
function Account() {
  return (
    <ImageBackground 
      source={require('../../../assets/images/background.png')} 
      style={styles.backgroundImage}
      >
      <ScrollView style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg' }}
            style={styles.avatar}
          />
          <View style={styles.information}>
            <Text style={styles.name}>Võ Thị Thu Sương </Text>
            <Text style={styles.info}> 01/01/2000</Text>
            <View style={styles.addressContainer}>
              <Text style={styles.address}>
                <Icon name="map-marker" size={16} color="#FFFFFF" /> Ngũ Hành Sơn, Đà Nẵng
              </Text>
            </View>
          </View>
        </View>

        {/* Card layout */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="bookmark" size={20} color="#FFFFFF" style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Lưu trữ</Text>
            </View>
            <Text style={styles.cardText}>Đã tim, bài viết</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => {
            console.log(1);
            router.push("/achiverment")
          }} >
            <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="trophy" size={20} color="#FFFFFF" style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Thành tựu</Text>
            </View>
            <Text style={styles.cardText}>Xếp hạng</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardB}>
            <View style={styles.cardHeader}>
              <Icon name="book" size={20} color="#FFFFFF" style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Ôn tập</Text>
            </View>
            <Text style={styles.cardText}>Câu hỏi trắc nghiệm</Text>
          </View>
          <View style={styles.cardB}>
            <View style={styles.cardHeader}>
              <Icon name="calendar" size={20} color="#FFFFFF" style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Sự kiện</Text>
            </View>
            <Text style={styles.cardText}>Sự kiện nổi bật</Text>
          </View>
        </View>

        {/* Phần nội dung nổi bật */}
        <View style={styles.highlightContent}>
          <Text style={styles.highlightTitle}>Nội dung nổi bật</Text>
          <View style={styles.contentList}>
            {highlightContentData.map((item, index) => (
              <View key={index} style={styles.contentItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.contentImage}
                />
                <View style={styles.contentInfo}>
                  <Text style={styles.contentTitle}>{item.title}</Text>
                  <View style={styles.progressContent}>
                    <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${item.progress}%` }]} />                               
                    </View>
                    <Text style={styles.progressText}>{item.progress}% correct</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 72,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#fff',
  },
  information: {
    marginTop: 12,
  },
  name: {
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.04,
    textAlign: 'center',
    marginBottom: 4,
    color: "white",
  },
  info: {
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: 0.04,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  address: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.04,
    marginLeft: 4,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    width: '45%',
    height: '90%',
    backgroundColor: "#78AA1A",
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    gap: 7,
    marginBottom: 16,
  },
  cardB:{
    width: '45%',
    height: '100%',
    backgroundColor: "#78AA1A",
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 8, 
  },
  cardTitle: {
    fontWeight: '700',          
    fontSize: 20,     
    letterSpacing: 0.04,         
    textAlign: 'center',        
    color: '#FFFFFF',
  },
  cardText: {
    fontWeight: '400',        
    fontSize: 12,    
    letterSpacing: 0.04,      
    color: '#FFFFFF',
    marginLeft: 20,
    marginTop: 0,
    width: 200,
  },
  highlightContent: {
    width: '90%',
    backgroundColor: "white",
    marginTop: 12,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: '5%',
  },
    searchIcon: {
    marginRight: 8,
  },
  highlightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
  },
  contentList: {
    width: '100%', 
    marginBottom: 10,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    height: 36,
    marginBottom: 15,
  },
  contentImage: {
    width: 50,
    height:50,
    borderRadius: 10,
    marginRight: 10,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {    
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  progressContent: {
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '100%',
  },
    progressContainer: {
    width: '72%',
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 12,
    backgroundColor: '#CEEFD8',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 4, 
  },
  progressBar: {
    height: '100%',
    width: '60%', 
    backgroundColor: '#03622F',
    borderRadius: 4,
  },
  progressText: {
    width: '32%',
    marginLeft: '4%', 
    fontSize: 12,
    color: 'black',
  },
  
});

export default Account;
