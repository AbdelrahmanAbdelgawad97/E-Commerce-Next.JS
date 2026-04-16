import { AllCategoryData, AllCategoryResponse } from "./category";

export async function getAllCategory(): Promise<AllCategoryData[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`);
    const data:AllCategoryResponse = await response.json();
    return data.data
}

export async function getCategoryDetails(id) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?category=${id}`);
    const {data} = await response.json();

    return data
}