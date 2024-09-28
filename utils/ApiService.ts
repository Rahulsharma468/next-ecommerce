import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleErrorResponse = (err: any) => {
  if (
    err.message ===
      "Unauthenticated access is not supported for this identity pool. " ||
    (err.response && err.response.status === 401)
  ) {
    window.location.href = "/Login";
  } else {
    // Return error object
    return { success: false, error: err.message };
  }
};

export const loginUser = async (details: any) => {
  try {
    const response = await axiosInstance.post("/user/login", details, {});

    return response.data;
  } catch (err) {
    return handleErrorResponse(err);
  }
};
