import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Mock data for history items
const historyData = [
  {
    id: "1",
    action: "Added a new category",
    date: "2024-10-01",
    icon: "add-circle",
  },
  {
    id: "2",
    action: "Updated item details",
    date: "2024-09-30",
    icon: "create",
  },
  { id: "3", action: "Deleted a category", date: "2024-09-29", icon: "trash" },
  { id: "4", action: "Logged in", date: "2024-09-28", icon: "log-in" },
];

export default function History() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={24} color="#4A90E2" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.actionText}>{item.action}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity History</Text>
      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30,
    backgroundColor: "#F5F7FA",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: "#EAF2FF",
    borderRadius: 20,
    padding: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: "#888888",
  },
});
