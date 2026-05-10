import { PaymentMethod } from '@prisma/client';
export declare class CheckoutPaymentDto {
    method: PaymentMethod;
}
export declare class ConfirmPaymentDto {
    externalPaymentId?: string;
    externalStatus?: string;
}
export declare class RefundPaymentDto {
    amount?: number;
    reason?: string;
}
