import { Product } from './product';

export interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    product: Product;
}
  
export interface Cart {
    id: string;
    userId?: number | null;
    sessionId?: string | null;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
}