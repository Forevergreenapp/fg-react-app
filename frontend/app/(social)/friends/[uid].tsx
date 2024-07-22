import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const FriendsScreen = () => {
  const { uid } = useLocalSearchParams();

  // Mock data - replace with actual API call
  const friends = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Followers of user Alex</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.friendItem}>{item.name}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  friendItem: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default FriendsScreen;
