import axios from "axios";
import { baseUrl } from "../../utils/constants/Constants";
import Cookies from "js-cookie";

let accessToken;

if (!accessToken) {
  accessToken = Cookies.get("access");
}

export const AdminDashBoardAPI = axios.create({
  baseURL: `${baseUrl}appointment/api/admin-transactions/`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const AdminAPIwithAcess = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const UserAPIwithAcess = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const api = axios.create({
  baseURL: `${baseUrl}appointment/api/admin-transactions/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const UserImageAccess = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    Accept: 'application/json',
    "Content-Type": "multipart/form-data",
  },
});
