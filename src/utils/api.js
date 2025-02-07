import axios from "axios";

const API_URL = "http://127.0.0.1:3005/selected-schedule";

export const fetchSchedule = async () => {
  const response = await axios.get(API_URL);
  return response.data[0].jadwal;
};

export const saveSchedule = async (payload) => {
  await axios.post(API_URL, payload, { headers: { "Content-Type": "application/json" } });
};
