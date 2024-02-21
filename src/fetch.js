import axios from "axios";

export const fetch = axios.create({
  timeout: 5 * 1000,
});
