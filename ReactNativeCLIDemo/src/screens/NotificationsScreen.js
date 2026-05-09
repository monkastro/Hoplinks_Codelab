import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NOTIFICATIONS = [
  { id: 1, icon: 'gift-outline', color: '#FF6B6B', title: 'Welcome Bonus!', message: 'You received 100 bonus points.', time: '2m ago', unread: true },
  { id: 2, icon: 'trending-up-outline', color: '#6C63FF', title: 'Trending Topic', message: 'React Native 0.81 is now available.', time: '15m ago', unread: true },
  { id: 3, icon: 'person-add-outline', color: '#4ECDC4', title: 'New Follower', message: 'Alex started following you.', time: '1h ago', unread: true },
  { id: 4, icon: 'heart-outline', color: '#FF8C42', title: 'Post Liked', message: 'Your post received 42 likes.', time: '2h ago', unread: false },
  { id: 5, icon: 'chatbubble-outline', color: '#45B7D1', title: 'New Comment', message: 'Sarah commented: "Amazing!"', time: '3h ago', unread: false },
  { id: 6, icon: 'calendar-outline', color: '#FFD93D', title: 'Event Reminder', message: 'React Conf starts tomorrow.', time: '5h ago', unread: false },
  { id: 7, icon: 'shield-checkmark-outline', color: '#95E1D3', title: 'Security Alert', message: 'New login from MacBook Pro.', time: '1d ago', unread: false },
];

export default function NotificationsScreen() {
  const anims = useRef(NOTIFICATIONS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = anims.map((anim, i) =>
      Animated.timing(anim, { toValue: 1, duration: 400, delay: i * 80, useNativeDriver: true })
    );
    Animated.stagger(80, animations).start();
  }, []);

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>{unreadCount} unread</Text>
        </View>
        <TouchableOpacity style={styles.markAllBtn}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {NOTIFICATIONS.map((n, i) => (
          <Animated.View key={n.id} style={[styles.card, n.unread && styles.cardUnread, { opacity: anims[i], transform: [{ translateY: anims[i].interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
            <View style={[styles.iconWrap, { backgroundColor: n.color + '20' }]}>
              <Ionicons name={n.icon} size={22} color={n.color} />
            </View>
            <View style={styles.content}>
              <View style={styles.row}>
                <Text style={styles.cardTitle}>{n.title}</Text>
                {n.unread && <View style={styles.dot} />}
              </View>
              <Text style={styles.msg} numberOfLines={2}>{n.message}</Text>
              <Text style={styles.time}>{n.time}</Text>
            </View>
          </Animated.View>
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D1A' },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  title: { fontSize: 32, fontWeight: '800', color: '#FFF', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#7777AA', marginTop: 4 },
  markAllBtn: { backgroundColor: '#6C63FF20', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
  markAllText: { color: '#6C63FF', fontSize: 13, fontWeight: '600' },
  list: { paddingHorizontal: 20, paddingTop: 8 },
  card: { marginBottom: 10, borderRadius: 16, backgroundColor: '#1A1A35', borderWidth: 1, borderColor: '#2A2A4A', flexDirection: 'row', padding: 16, alignItems: 'flex-start' },
  cardUnread: { borderColor: '#6C63FF40', backgroundColor: '#1C1C3A' },
  iconWrap: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 2 },
  content: { flex: 1, marginLeft: 14 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#FFF', flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#6C63FF', marginLeft: 8 },
  msg: { fontSize: 13, color: '#8888AA', lineHeight: 20, marginBottom: 6 },
  time: { fontSize: 12, color: '#555577', fontWeight: '500' },
});
