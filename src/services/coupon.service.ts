import axios from "axios";


const COUPON_API_ENDPOINT = `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/coupon`;

const getCouponValidate = async (coupon_code: string)  => {
        const response = await axios.post(`${COUPON_API_ENDPOINT}/validate`, { coupon_code });
        return response.data;   //coupon_id, promotion_type, discount_value
  };

  export {
    getCouponValidate
  }