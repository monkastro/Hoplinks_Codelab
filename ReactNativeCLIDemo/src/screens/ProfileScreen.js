import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline', label: 'Edit Profile', color: '#6C63FF' },
      { icon: 'lock-closed-outline', label: 'Privacy', color: '#FF6B6B' },
      { icon: 'notifications-outline', label: 'Notifications', color: '#FFD93D', toggle: true },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'moon-outline', label: 'Dark Mode', color: '#45B7D1', toggle: true, defaultOn: true },
      { icon: 'language-outline', label: 'Language', color: '#4ECDC4', value: 'English' },
      { icon: 'text-outline', label: 'Font Size', color: '#FF8C42', value: 'Medium' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline', label: 'Help Center', color: '#95E1D3' },
      { icon: 'chatbubbles-outline', label: 'Contact Us', color: '#F38181' },
      { icon: 'star-outline', label: 'Rate App', color: '#FFD93D' },
    ],
  },
];

export default function ProfileScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <Animated.View style={[styles.profileHeader, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#6C63FF" />
          </View>
          <View style={styles.onlineDot} />
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
        <View style={styles.statsRow}>
          {[{ val: '128', lbl: 'Posts' }, { val: '4.2K', lbl: 'Followers' }, { val: '312', lbl: 'Following' }].map((s, i) => (
            <View key={i} style={styles.stat}>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLbl}>{s.lbl}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Menu Sections */}
      {MENU_SECTIONS.map((section, si) => (
        <View key={si} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionCard}>
            {section.items.map((item, ii) => (
              <TouchableOpacity key={ii} style={[styles.menuItem, ii < section.items.length - 1 && styles.menuBorder]} activeOpacity={0.7}>
                <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                {item.toggle ? (
                  <Switch trackColor={{ false: '#2A2A4A', true: '#6C63FF' }} thumbColor="#FFF" value={item.defaultOn || false} />
                ) : item.value ? (
                  <Text style={styles.menuValue}>{item.value}</Text>
                ) : (
                  <Ionicons name="chevron-forward" size={18} color="#555577" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.0.0</Text>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D1A' },
  profileHeader: { alignItems: 'center', paddingTop: 60, paddingBottom: 24, backgroundColor: '#13132B', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  avatarWrap: { position: 'relative', marginBottom: 16 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#6C63FF20', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#6C63FF' },
  onlineDot: { position: 'absolute', bottom: 4, right: 4, width: 16, height: 16, borderRadius: 8, backgroundColor: '#4ECDC4', borderWidth: 3, borderColor: '#13132B' },
  name: { fontSize: 24, fontWeight: '800', color: '#FFF' },
  email: { fontSize: 14, color: '#7777AA', marginTop: 4 },
  statsRow: { flexDirection: 'row', marginTop: 20, paddingHorizontal: 40 },
  stat: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 20, fontWeight: '800', color: '#FFF' },
  statLbl: { fontSize: 12, color: '#7777AA', marginTop: 2 },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#555577', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginLeft: 4 },
  sectionCard: { backgroundColor: '#1A1A35', borderRadius: 16, borderWidth: 1, borderColor: '#2A2A4A', overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: '#2A2A4A' },
  menuIcon: { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: '#FFF', marginLeft: 14 },
  menuValue: { fontSize: 14, color: '#7777AA' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, marginHorizontal: 20, backgroundColor: '#FF6B6B15', borderRadius: 14, paddingVertical: 14, borderWidth: 1, borderColor: '#FF6B6B30' },
  logoutText: { color: '#FF6B6B', fontSize: 16, fontWeight: '700', marginLeft: 8 },
  version: { textAlign: 'center', color: '#555577', fontSize: 12, marginTop: 16 },
});
