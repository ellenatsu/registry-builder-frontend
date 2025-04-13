import axios from 'axios';
import { transactionsPerPage } from '../constants/constants';


const TRANSACTION_API_ENDPOINT = `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/transactions`;

//donation have pagination and query
const fetchUserDonations = async (token: string, page:number, query:string) => {
    const response = await axios.get(`${TRANSACTION_API_ENDPOINT}/user-donations`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {page, limit: transactionsPerPage, query}
      });
  return response.data;
};

//payouts only have pagination
const fetchUserPayouts = async (token: string, page:number) => {
  const response = await axios.get(`${TRANSACTION_API_ENDPOINT}/user-payouts`, {
    headers: { Authorization: `Bearer ${token}` },
    params: {page, limit: transactionsPerPage}
  });
return response.data;
}

//link donation with user as donor
const linkDonation = async (token: string, donationId: string) => {
  const response = await axios.post(`${TRANSACTION_API_ENDPOINT}/link-donation`, { donation_id: donationId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}


export {
  fetchUserDonations,
  fetchUserPayouts,
  linkDonation
}