export interface Order {
    id: number;
    total: number;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'PAID' | 'REFUNDED';
    cartId: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    products: Product[];
}

export interface Product {
    description: string | null;
    imageUrl: string;
    id: number;
    productName: string;
    quantity: number;
    price: number;
}