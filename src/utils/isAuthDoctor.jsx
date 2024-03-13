import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "./constants/Constants";

const updateDocToken = async () => {
  const refreshToken = Cookies.get("refresh");

  try {
    const res = await axios.post(baseUrl + "auth/token/refresh", {
      refresh: refreshToken,
    });

    if (res.status === 200) {
      Cookies.set("access", res.data.access);
      Cookies.set("refresh", res.data.refresh);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const fetchisDoctor = async () => {
  const token = Cookies.get("access");

  try {
    const res = await axios.get(baseUrl + "auth/user/details/", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return res.data.user_type === "doctor";
  } catch (error) {
    return false;
  }
};

const isAuthDoctor = async () => {
  const accessToken = Cookies.get("access");

  if (!accessToken) {
    return {
      name: null,
      isAuthenticated: false,
      isAdmin: false,
      is_doctor: false,
      user_id:null
    };
  }

  const currentTime = Date.now() / 1000;
  let decoded = jwtDecode(accessToken);

  if (decoded.exp > currentTime) {
    let checkDoc = await fetchisDoctor();
    return {
      name: decoded.first_name,
      isAuthenticated: true,
      isAdmin: false,
      is_doctor: checkDoc,
      user_id:decoded.user_id,
    };
  } else {
    const updateSuccess = await updateDocToken();

    if (updateSuccess) {
      let decoded = jwtDecode(accessToken);
      let checkAdmin = await fetchisDoctor();
      return {
        name: decoded.first_name,
        isAuthenticated: true,
        isAdmin: false,
        is_doctor: checkAdmin,
        user_id:decoded.user_id,
      };
    } else {
      return {
        name: null,
        isAuthenticated: false,
        isAdmin: false,
        is_doctor: false,
        user_id:null,
      };
    }
  }
};

export default isAuthDoctor;