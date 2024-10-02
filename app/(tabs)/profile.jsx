import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { client } from "../../utils/KindeConfig";

const ProfileScreen = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2023",
    totalSavings: 5000,
    monthlyBudget: 2000,
    profilePicture:
      "https://i.pinimg.com/564x/6a/f1/ec/6af1ec6645410a41d5339508a83b86f9.jpg",
  });

  const ProfileOption = ({ icon, title, value, onPress }) => (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      <View style={styles.optionIconContainer}>
        <Ionicons name={icon} size={24} color="#4A90E2" />
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionValue}>{value}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#CCCCCC" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profilePicture}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.joinDate}>Member since {user.joinDate}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>${user.totalSavings}</Text>
          <Text style={styles.statLabel}>Total Savings</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>${user.monthlyBudget}</Text>
          <Text style={styles.statLabel}>Monthly Budget</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <ProfileOption
          icon="person-outline"
          title="Edit Profile"
          value="Update your information"
          onPress={() => console.log("Edit Profile")}
        />
        <ProfileOption
          icon="wallet-outline"
          title="Payment Methods"
          value="Manage your payment options"
          onPress={() => console.log("Payment Methods")}
        />
        <ProfileOption
          icon="notifications-outline"
          title="Notifications"
          value="Set your notification preferences"
          onPress={() => console.log("Notifications")}
        />
        <ProfileOption
          icon="shield-checkmark-outline"
          title="Privacy Settings"
          value="Manage your privacy options"
          onPress={() => console.log("Privacy Settings")}
        />
        <ProfileOption
          icon="help-circle-outline"
          title="Help & Support"
          value="Get assistance and FAQs"
          onPress={() => console.log("Help & Support")}
        />
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => console.log("Logout")}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  email: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 5,
  },
  joinDate: {
    fontSize: 14,
    color: "#888888",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
  },
  statDivider: {
    height: 40,
    width: 1,
    backgroundColor: "#CCCCCC",
  },
  optionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  optionValue: {
    fontSize: 14,
    color: "#888888",
  },
  logoutButton: {
    margin: 20,
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
