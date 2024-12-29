import axios from "axios";

const url = "https://v6.exchangerate-api.com/v6/14374102dfff96432aabe66a";
// const url2 = "https://api.exchangerate-api.com/v4/latest/USD"

const api = axios.create({
  baseURL: url,
});

export const currency = async (from, to, amount) => {
   return api.get(`/pair/${from}/${to}/${amount}`)
}
