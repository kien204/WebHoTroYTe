import { useLoading } from "../context/LoadingContext";
import { handleApiError } from "../../services/handleApiError";
import { useAuthDialog } from "../context/AuthDialogContext";

export const useApi = (showToast, showLoading = true) => {
  const { setLoading } = useLoading();
  const { showDialog } = useAuthDialog();

  const callApi = async (apiFunc, opShowToast, skipAuth = false) => {
    const token = localStorage.getItem("token") || null;

    if (!token && !skipAuth) {
      // Nếu chưa đăng nhập → chặn luôn
      showDialog("loginRequired");
      throw new Error("Chưa đăng nhập");
    }

    try {
      if (showLoading) setLoading(true);
      const res = await apiFunc();
      return res.data;
    } catch (err) {
      if (err?.response?.status === 401) {
        showDialog("expired");
      } else {
        handleApiError(err, showToast, opShowToast);
      }
      throw err;
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  return { callApi };
};
