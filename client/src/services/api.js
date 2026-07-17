import axios from "axios";
import { serverUrl } from "../App";

export const getCurrentUser = async () => {
  try {
    const res = await axios.get(
      `${serverUrl}/api/user/currentuser`,
      { withCredentials: true },
    );

    console.log(res.data);
  } catch (error) {
    console.error("Error during user fetch:", error);
  }
};
