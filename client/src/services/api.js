import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice.js";

export const getCurrentUser = async (dispatch) => {
  try {
    const res = await axios.get(`${serverUrl}/api/user/currentuser`, {
      withCredentials: true,
    });

    dispatch(setUserData(res.data));
  } catch (error) {
    console.error("Error during user fetch:", error);
  }
};
