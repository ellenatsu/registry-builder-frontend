//for coupon
export interface Coupon {
    coupon_id: string;
    promotion_type: string; //'WAIVE_FEE' | 'FIXED_AMOUNT' 
    discount_value: number;
}