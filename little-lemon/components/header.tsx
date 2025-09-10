import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface HeaderProps {
  showProfile?: boolean;
  profileImage?: string;
}

export default function Header({
  showProfile = false,
  profileImage,
}: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <View style={styles.lemonIcon}>
          <Text style={styles.lemonEmoji}>🍋</Text>
        </View>
        <Text style={styles.logoText}>LITTLE LEMON</Text>
      </View>

      {showProfile && (
        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={() => {
              router.push("/profile");
            }}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Text style={styles.profileInitial}>L</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  logoContainer: {
    alignItems: "center",
    flex: 1,
  },
  lemonIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#F4CE14",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  lemonEmoji: {
    fontSize: 20,
  },
  logoText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495E57",
    letterSpacing: 2,
  },
  profileContainer: {
    position: "absolute",
    right: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profilePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#495E57",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
