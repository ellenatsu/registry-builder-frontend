import axios from "axios";

const DASHBOARD_API_ENDPOINT = `${
  import.meta.env.VITE_BACKEND_SERVER_URL
}/api/dashboard`;

const fetchDashboardData = async (token: string | null) => {
  try{
    const response = await axios.get(`${DASHBOARD_API_ENDPOINT}/summary`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }catch(error){
    console.log("fetch dashboard data", error);
  }

};

export { fetchDashboardData };
