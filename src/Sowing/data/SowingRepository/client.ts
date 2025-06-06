import axios from "axios";

const sowingClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/sowing`,
});

export default sowingClient;
