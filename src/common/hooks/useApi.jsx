import { useLoading } from "../context/LoadingContext";
import { handleApiError } from "../../services/handleApiError";

export const useApi = (showToast) => {
  const { setLoading } = useLoading();

  const callApi = async (apiFunc) => {
    try {
      setLoading(true);
      const res = await apiFunc();
      return res.data;
    } catch (err) {
      handleApiError(err, showToast);
    } finally {
      setLoading(false);
    }
  };

  return { callApi };
};
