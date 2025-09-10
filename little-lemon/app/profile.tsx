import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { getData, storeData, clearAll, KEYS } from '../storage';

export default function ProfilePage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  // Email notification preferences
  const [orderStatuses, setOrderStatuses] = useState(false);
  const [passwordChanges, setPasswordChanges] = useState(false);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      const [
        firstNameData,
        lastNameData,
        emailData,
        phoneData,
        avatarData,
        orderStatusData,
        passwordResetData,
        specialOffersData,
        newsletterData,
      ] = await Promise.all([
        getData(KEYS.firstName),
        getData(KEYS.lastName),
        getData(KEYS.email),
        getData(KEYS.phone),
        getData(KEYS.avatarUrl),
        getData(KEYS.emailNotifications_status),
        getData(KEYS.emailNotifications_passwordReset),
        getData(KEYS.emailNotifications_specialOffers),
        getData(KEYS.emailNotifications_newsletter),
      ]);

      setFirstName(firstNameData || '');
      setLastName(lastNameData || '');
      setEmail(emailData || '');
      setPhone(phoneData || '');
      setAvatarUrl(avatarData || '');
      setOrderStatuses(orderStatusData === 'true');
      setPasswordChanges(passwordResetData === 'true');
      setSpecialOffers(specialOffersData === 'true');
      setNewsletter(newsletterData === 'true');
      
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      
      await Promise.all([
        storeData(KEYS.firstName, firstName),
        storeData(KEYS.lastName, lastName),
        storeData(KEYS.email, email),
        storeData(KEYS.phone, phone),
        storeData(KEYS.avatarUrl, avatarUrl),
        storeData(KEYS.emailNotifications_status, orderStatuses.toString()),
        storeData(KEYS.emailNotifications_passwordReset, passwordChanges.toString()),
        storeData(KEYS.emailNotifications_specialOffers, specialOffers.toString()),
        storeData(KEYS.emailNotifications_newsletter, newsletter.toString()),
      ]);
      
      Alert.alert('Success', 'Your changes have been saved!');
    } catch (error) {
      console.error('Error saving changes:', error);
      Alert.alert('Error', 'Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDiscardChanges = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard all changes?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: loadUserData },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await clearAll();
            router.replace('/');
          },
        },
      ]
    );
  };

  const handleChangeAvatar = () => {
    Alert.alert('Change Avatar', 'Avatar change functionality coming soon!');
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl('');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#495E57" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          
          <View style={styles.logoContainer}>
            <View style={styles.lemonIcon}>
              <Text style={styles.lemonEmoji}>🍋</Text>
            </View>
            <Text style={styles.logoText}>LITTLE LEMON</Text>
          </View>
          
          <View style={styles.profileIconContainer}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.profileIcon} />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Text style={styles.profileInitial}>
                  {firstName.charAt(0) || 'U'}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal information</Text>
          
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <Text style={styles.label}>Avatar</Text>
            <View style={styles.avatarRow}>
              {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarInitial}>
                    {firstName.charAt(0) || 'L'}
                  </Text>
                </View>
              )}
              
              <View style={styles.avatarButtons}>
                <Pressable style={styles.changeButton} onPress={handleChangeAvatar}>
                  <Text style={styles.changeButtonText}>Change</Text>
                </Pressable>
                <Pressable style={styles.removeButton} onPress={handleRemoveAvatar}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your first name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter your last name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Email Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email notifications</Text>
          
          <CheckboxItem
            label="Order statuses"
            checked={orderStatuses}
            onToggle={setOrderStatuses}
          />
          
          <CheckboxItem
            label="Password changes"
            checked={passwordChanges}
            onToggle={setPasswordChanges}
          />
          
          <CheckboxItem
            label="Special offers"
            checked={specialOffers}
            onToggle={setSpecialOffers}
          />
          
          <CheckboxItem
            label="Newsletter"
            checked={newsletter}
            onToggle={setNewsletter}
          />
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </Pressable>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Pressable style={styles.discardButton} onPress={handleDiscardChanges}>
            <Text style={styles.discardButtonText}>Discard changes</Text>
          </Pressable>
          
          <Pressable 
            style={[styles.saveButton, saving && styles.saveButtonDisabled]} 
            onPress={handleSaveChanges}
            disabled={saving}
          >
            <Text style={styles.saveButtonText}>
              {saving ? 'Saving...' : 'Save changes'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

// Checkbox Component
function CheckboxItem({ label, checked, onToggle }: {
  label: string;
  checked: boolean;
  onToggle: (value: boolean) => void;
}) {
  return (
    <Pressable style={styles.checkboxRow} onPress={() => onToggle(!checked)}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#495E57',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#495E57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
  },
  lemonIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#F4CE14',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  lemonEmoji: {
    fontSize: 16,
  },
  logoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495E57',
    letterSpacing: 1,
  },
  profileIconContainer: {},
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profilePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#495E57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
  },
  avatarSection: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#495E57',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avatarInitial: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  avatarButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  changeButton: {
    backgroundColor: '#495E57',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  changeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  removeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#495E57',
    borderRadius: 4,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#495E57',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#F4CE14',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 15,
  },
  discardButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#495E57',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  discardButtonText: {
    color: '#495E57',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#495E57',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});