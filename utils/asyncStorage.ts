import Category from "@/models/category";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const saveCategories = async (categories: Category[]) => {
    try {
        await AsyncStorage.setItem("categories", JSON.stringify(categories));
    } catch (error: any) {
        throw new Error(error);
    }
}
export const getCachedCategories = async () => {
    try {
        const cachedCategories = await AsyncStorage.getItem("categories");
        return cachedCategories ? JSON.parse(cachedCategories) : null;
    } catch (error: any) {
        throw new Error(error);
    }
}
export const saveDestinations = async (destinations: any[]) => {
    try {
        await AsyncStorage.setItem("destinations", JSON.stringify(destinations));
    } catch (error: any) {
        throw new Error(error);
    }
}
export const getCachedDestinations = async () => {
    try {
        const cachedDestinations = await AsyncStorage.getItem("destinations");
        return cachedDestinations ? JSON.parse(cachedDestinations) : null;
    } catch (error: any) {
        throw new Error(error);
    }
}
export const saveTrip = async (trip: any) => {
    try {
        await AsyncStorage.setItem("trip", JSON.stringify(trip));
    } catch (error: any) {
        throw new Error(error);
    }
}
export const getCachedTrip = async () => {
    try {
        const cachedTrip = await AsyncStorage.getItem("trip");
        return cachedTrip ? JSON.parse(cachedTrip) : null;
    } catch (error: any) {
        throw new Error(error);
    }
}
