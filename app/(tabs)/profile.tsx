import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Replace this with your actual data fetching logic
    const fetchUserData = async () => {
      const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        carbonFootprint: 16,
        treesPlanted: 100,
        referrals: 10
      };
      setUser(userData);
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Forever<Text style={styles.green}>green</Text>
        </Text>
        <Text style={styles.subtitle}>Profile</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Name: {user.name}</Text>
          <Text style={styles.infoText}>Email: {user.email}</Text>
          <Text style={styles.infoText}>Carbon Footprint: {user.carbonFootprint} tons of CO2</Text>
          <Text style={styles.infoText}>Trees Planted: {user.treesPlanted}</Text>
          <Text style={styles.infoText}>Referrals: {user.referrals}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  green: {
    color: '#409858',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  infoBox: {
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Profile;
