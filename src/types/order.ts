export interface Order {
    id: number;
    total: number;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    cartId: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
}