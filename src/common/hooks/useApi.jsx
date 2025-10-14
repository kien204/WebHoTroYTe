import { useLoading } from "../context/LoadingContext";
import { handleApiError } from "../../services/handleApiError";

export const useApi = (showToast, showLoading = true) => {
  const { setLoading } = useLoading();

  const callApi = async (apiFunc, opShowToast) => {
    try {
      if (showLoading) setLoading(true);
      const res = await apiFunc();
      return res.data;
    } catch (err) {
      handleApiError(err, showToast, opShowToast);
      throw err;
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  return { callApi };
};
