import { getProduct } from '@/api/product';
import { create } from 'zustand'

export const productStore = create((set) => ({
    product: [],
    setProduct: async (itemCode, wshCode) => {
        const data = await getProduct(itemCode, wshCode);
        set({ product: data });
    }
}))
