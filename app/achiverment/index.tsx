import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { router } from 'expo-router';

const AchievementCard = ({ title, description }) => {
  const getImageSource = () => {
    switch (title) {
      case "450 điểm": return require('../../assets/icons/icon_poin.png');
      case "490 điểm": return require('../../assets/icons/icon_share.png');
      case "480 điểm": return require('../../assets/icons/icon_event.png');
      case "Giải nhất": return require('../../assets/icons/icon_giainhat.png');
      case "Giải nhì": return require('../../assets/icons/icon_giainhhi.png');
      case "Giải ba": return require('../../assets/icons/icon_giaiba.png');
      default: return require('../../assets/icons/icon_poin.png');
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <Image source={getImageSource()} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

const AchievementPage = () => {
  const handleClickBtn = () => { router.back(); };

  const achievementsData = [
    { title: "450 điểm", description: "Kỷ lục điểm số bài tập" },
    { title: "490 điểm", description: "Số lượt chia sẻ" },
    { title: "480 điểm", description: "Sự kiện tham gia" }
  ];

  const awardsData = [
    { title: "Giải nhất", description: "Sự kiện phòng chống ma túy" },
    { title: "Giải nhì", description: "Cuộc thi nói không với ma túy" },
    { title: "Giải ba", description: "Sự kiện tham gia" }
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/backgroundAchi.png')}
      style={styles.backgroundImage}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={styles.headerContainer}>
        <TouchableWithoutFeedback onPress={handleClickBtn}>
          <View style={styles.headerContent}>
            <View style={styles.backButtonContainer}>
              <Image source={require('../../assets/icons/chevron_left.png')} style={{ width: 28, height: 28 }} />
              <Text style={styles.textAchiTitle}>Thành tựu của bạn</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.sectionHeader}>
          <Image source={require('../../assets/icons/icon_kiluc.png')} style={styles.sectionIcon} resizeMode="contain" />
          <Text style={styles.sectionTitle}>Kỉ lục cá nhân</Text>
        </View>
        <View style={styles.cardContainer}>
          {achievementsData.map((achievement, index) => (
            <AchievementCard key={index} title={achievement.title} description={achievement.description} />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Image source={require('../../assets/icons/icon_giaithuong.png')} style={styles.sectionIcon} resizeMode="contain" />
          <Text style={styles.sectionTitle}>Giải thưởng</Text>
        </View>
        <View style={styles.cardContainer}>
          {awardsData.map((award, index) => (
            <AchievementCard key={index} title={award.title} description={award.description} />
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    marginTop: '80%',
    flexGrow: 1,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '30%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardIcon: {
    width: '50%',
  },
  icon: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#495057',
    textAlign: 'center',
  },
  headerContainer: {
    marginTop: 50,
    overflow: 'hidden',
    borderBottomLeftRadius: 24,
    height: 64,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerContent: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginLeft: 20,
  },
  textAchiTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: '20%',
  },
  cardDescription: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default AchievementPage;
