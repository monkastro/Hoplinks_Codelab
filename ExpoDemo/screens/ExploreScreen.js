import React, { useState, useRef, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = ['All', 'Design', 'Dev', 'AI', 'Web3'];

const ITEMS = [
  { id: 1, title: 'UI Design Trends', tag: 'Design', color: '#FF6B6B', icon: 'color-palette-outline', desc: 'Latest design patterns for 2026' },
  { id: 2, title: 'React Native Tips', tag: 'Dev', color: '#6C63FF', icon: 'code-slash-outline', desc: 'Pro tips for mobile development' },
  { id: 3, title: 'GPT Integration', tag: 'AI', color: '#4ECDC4', icon: 'hardware-chip-outline', desc: 'AI-powered app features' },
  { id: 4, title: 'Smart Contracts', tag: 'Web3', color: '#FFD93D', icon: 'cube-outline', desc: 'Building decentralized apps' },
  { id: 5, title: 'Motion Design', tag: 'Design', color: '#FF8C42', icon: 'sparkles-outline', desc: 'Creating fluid animations' },
  { id: 6, title: 'TypeScript Mastery', tag: 'Dev', color: '#45B7D1', icon: 'terminal-outline', desc: 'Advanced type patterns' },
  { id: 7, title: 'Neural Networks', tag: 'AI', color: '#95E1D3', icon: 'git-network-outline', desc: 'Deep learning fundamentals' },
  { id: 8, title: 'DeFi Protocols', tag: 'Web3', color: '#F38181', icon: 'swap-horizontal-outline', desc: 'Understanding DeFi ecosystems' },
];

export default function ExploreScreen() {

  const route = useRoute();
  // Extract the dynamic :id segment from the deep link
  const deepLinkId = route.params?.id;


  const [activeCategory, setActiveCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredItems = ITEMS.filter((item) => {
    const matchCategory = activeCategory === 'All' || item.tag === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {deepLinkId && (
          <Text style={styles.subtitle}>You opened product: {deepLinkId}</Text>
        )}

        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>Discover trending topics</Text>
      </View>


      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#6C63FF" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search topics..."
          placeholderTextColor="#555577"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText ? (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={20} color="#555577" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Category Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              activeCategory === cat && styles.categoryChipActive,
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Items Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >
        <View style={styles.grid}>
          {filteredItems.map((item, index) => (
            <Animated.View
              key={item.id}
              style={[
                styles.gridItem,
                index % 2 === 0 ? { marginRight: 6 } : { marginLeft: 6 },
                { opacity: fadeAnim },
              ]}
            >
              <TouchableOpacity style={styles.gridItemInner} activeOpacity={0.7}>
                <View style={[styles.gridIconWrap, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon} size={26} color={item.color} />
                </View>
                <Text style={styles.gridItemTitle}>{item.title}</Text>
                <Text style={styles.gridItemDesc}>{item.desc}</Text>
                <View style={[styles.tagBadge, { backgroundColor: item.color + '15' }]}>
                  <Text style={[styles.tagText, { color: item.color }]}>{item.tag}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1A',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#7777AA',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A35',
    marginHorizontal: 20,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    marginLeft: 10,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1A1A35',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  categoryChipActive: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  categoryText: {
    color: '#7777AA',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  gridContainer: {
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '48%',
    marginBottom: 12,
  },
  gridItemInner: {
    backgroundColor: '#1A1A35',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  gridIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  gridItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  gridItemDesc: {
    fontSize: 12,
    color: '#7777AA',
    lineHeight: 18,
    marginBottom: 12,
  },
  tagBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
