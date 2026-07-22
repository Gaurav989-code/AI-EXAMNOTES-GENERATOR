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

export const generateNotes = async (payload) => {
  try {
    console.log("Sending Payload:", payload);

    const res = await axios.post(
      `${serverUrl}/api/notes/generate-notes`,
      payload,
      {
        withCredentials: true,
      },
    );

    console.log("Response:", res.data);

    return res.data;
  } catch (error) {
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    console.error(error);

    throw error;
  }
};
