//here we will use async storage to set and retreive data, the struct is a set of predefined keys and values
import AsyncStorage from "@react-native-async-storage/async-storage";

//struct with predefined keys and values
export const KEYS = {
  isloggedin: "isloggedin",
  name: "name",
  email: "email",
  phone: "phone",
  firstName: "firstName",
  lastName: "lastName",
  avatarUrl: "avatarUrl",
  emailNotifications_status: "emailNotifications_status",
  emailNotifications_passwordReset: "emailNotifications_passwordReset",
  emailNotifications_specialOffers: "emailNotifications_specialOffers",
  emailNotifications_newsletter: "emailNotifications_newsletter",
  databaseSeeded: "databaseSeeded",
};

//this function is made to store data in async storage
export async function storeData(key: string, value: string) {
  //validate data first
  if (!key || !value) return;
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error storing data", error);
  }
}

//this function is made to get data from async storage
export async function getData(key: string) {
  if (!key) return null;
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("Error getting data", error);
    return null;
  }
}

//this function is made to remove data from async storage
export async function removeData(key: string) {
  if (!key) return;
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing data", error);
  }
}

//clear all function
export async function clearAll() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log("Error clearing all data", error);
  }
}
