import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileActions() {
  const [activeTab, setActiveTab] = useState('viajes');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar perfil</Text>
      </TouchableOpacity>
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setActiveTab('viajes')} style={[styles.tab, activeTab === 'viajes' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'viajes' && styles.activeTabText]}>Mis viajes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('insignias')} style={[styles.tab, activeTab === 'insignias' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'insignias' && styles.activeTabText]}>Mis Insignias</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  editButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  editButtonText: {
    color: '#0D1B2A',
    fontWeight: '600',
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E1DD',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3A86FF',
  },
  tabText: {
    fontSize: 16,
    color: '#778DA9',
  },
  activeTabText: {
    color: '#3A86FF',
    fontWeight: '600',
  },
});