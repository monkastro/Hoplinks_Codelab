import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const CARDS = [
  { icon: 'rocket-outline', title: 'Quick Start', subtitle: 'Get up and running fast', color: '#6C63FF' },
  { icon: 'flash-outline', title: 'Performance', subtitle: 'Blazing fast rendering', color: '#FF6B6B' },
  { icon: 'shield-checkmark-outline', title: 'Secure', subtitle: 'Enterprise-grade security', color: '#4ECDC4' },
  { icon: 'cloud-outline', title: 'Cloud Sync', subtitle: 'Seamless data syncing', color: '#45B7D1' },
];

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const cardAnims = useRef(CARDS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const cardAnimations = cardAnims.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: 300 + i * 150,
        useNativeDriver: true,
      })
    );
    Animated.stagger(150, cardAnimations).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Animated.View
          style={[
            styles.heroSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>✨ Welcome</Text>
          </View>
          <Text style={styles.heroTitle}>RN CLI Demo</Text>
          <Text style={styles.heroSubtitle}>
            A beautiful 4-screen showcase built with React Navigation & CLI
          </Text>
        </Animated.View>
      </View>

      <View style={styles.cardsSection}>
        <Text style={styles.sectionTitle}>Features</Text>
        {CARDS.map((card, index) => (
          <Animated.View
            key={index}
            style={[
              styles.card,
              {
                opacity: cardAnims[index],
                transform: [
                  {
                    translateX: cardAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={[styles.cardIcon, { backgroundColor: card.color + '20' }]}>
              <Ionicons name={card.icon} size={28} color={card.color} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#555" />
          </Animated.View>
        ))}
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Stats</Text>
        <View style={styles.statsRow}>
          {[
            { value: '4', label: 'Screens' },
            { value: '∞', label: 'Possibilities' },
            { value: '0', label: 'Limits' },
          ].map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1A',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#13132B',
  },
  heroSection: {
    alignItems: 'center',
  },
  heroBadge: {
    backgroundColor: '#6C63FF20',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  heroBadgeText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#8888AA',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  cardsSection: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A35',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginLeft: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#7777AA',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1A1A35',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#6C63FF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7777AA',
    fontWeight: '500',
  },
});
