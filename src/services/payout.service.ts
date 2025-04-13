import axios from "axios";
import { reqListData } from "../types/payout.typs";

const PAYOUT_API_ENDPOINT = `${
  import.meta.env.VITE_BACKEND_SERVER_URL
}/api/payout`;

const getWalletSummary = async (token: string) => {
  const response = await axios.get(`${PAYOUT_API_ENDPOINT}/wallet-summary`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getAllPayouts = async (token: string) => {
  const response = await axios.get(`${PAYOUT_API_ENDPOINT}/payouts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const initMaunalPayout = async (lists: reqListData[], token: string) => {

  const response = await axios.post(
    `${PAYOUT_API_ENDPOINT}/collect-payout`,
    { lists },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const getDynamicBalance = async (token: string) => {
  const response = await axios.get(`${PAYOUT_API_ENDPOINT}/refresh-balance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
 
  return response.data;
};

export { getWalletSummary, getAllPayouts,  getDynamicBalance, initMaunalPayout };
