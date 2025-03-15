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
