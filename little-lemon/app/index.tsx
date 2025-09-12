import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from "react-native";
import { KEYS } from "../storage";
import { getData, storeData } from "../storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function App() {
  //initial state for name and email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isloggedin, setIsloggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = name.trim().length > 0 && email.trim().length > 0 && email.includes("@");

  useEffect(() => {
    //use the storage to check if user is logged in or not
    const isloggedIn = async () => {
      try {
        console.log("Checking if user is logged in");
        const loggedIn = await getData(KEYS.isloggedin);
        setIsloggedin(loggedIn === "true");

        // Load existing user data if logged in
        if (loggedIn === "true") {
          router.replace("/app");
        }
      } catch (error) {
        console.log("Error checking if user is logged in", error);
      }
    };
    isloggedIn();
  }, []);

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return false;
    }
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    try {
      setIsLoading(true);
      
      // Store user data
      await storeData(KEYS.name, name.trim());
      await storeData(KEYS.firstName, name.trim().split(" ")[0]);
      await storeData(KEYS.lastName, name.trim().split(" ").slice(1).join(" "));
      await storeData(KEYS.email, email.trim());
      await storeData(KEYS.isloggedin, "true");
      
      console.log("User data saved successfully");
      
      // Navigate to menu screen
      router.replace("/app");
      
    } catch (error) {
      console.error("Error saving user data:", error);
      Alert.alert("Error", "Failed to save your information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with Logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.lemonIcon}>
              <Text style={styles.lemonEmoji}>🍋</Text>
            </View>
            <Text style={styles.logoText}>LITTLE LEMON</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.restaurantName}>Little Lemon</Text>
            <Text style={styles.location}>Chicago</Text>
            <Text style={styles.description}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
          </View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop",
            }}
            style={styles.heroImage}
          />
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name *</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder=""
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email *</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder=""
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <Pressable
              style={[
                styles.submitButton,
                (!isFormValid || isLoading) && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid || isLoading}
            >
              <Text style={[
                styles.submitButtonText,
                (!isFormValid || isLoading) && styles.submitButtonTextDisabled
              ]}>
                {isLoading ? "Saving..." : "Continue to App"}
              </Text>
            </Pressable>
        </View>

     

        <StatusBar style="dark" />
      </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  logoContainer: {
    alignItems: "center",
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
  heroSection: {
    backgroundColor: "#495E57",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  heroContent: {
    flex: 1,
    paddingRight: 15,
  },
  restaurantName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#F4CE14",
    marginBottom: 5,
  },
  location: {
    fontSize: 24,
    color: "white",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "white",
    lineHeight: 22,
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  formSection: {
    backgroundColor: "white",
    padding: 20,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    color: "#8e8e93",
    marginBottom: 8,
    fontWeight: "400",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#d1d1d6",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "white",
    color: "#000",
  },
    submitButton: {
    backgroundColor: "#495E57",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButtonTextDisabled: {
    color: "#666",
  },
});
