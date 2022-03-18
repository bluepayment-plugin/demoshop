export interface TransactionInterface {
    status: string;
    orderId: number;
    amount: number|null;
    email: string|null;
    createdAt: string;
    updatedAt: string|null;
}
