import api from "@/utils/api";
import Trip from "@/models/trip";
import { handleApiError } from "@/utils/errorHandler";
import Category from "@/models/category";

interface ApiGetResponse {
    categories?: Category[];
    error?: string;
}
export const getCategories = async (): Promise<ApiGetResponse> => {
    try {
        const response = await api.get("/categories/");
        return { categories: response.data, error: undefined };
    } catch (error) {
        return { categories: [], error: handleApiError(error) };
    }
}