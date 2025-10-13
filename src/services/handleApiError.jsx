export const handleApiError = (error, showToast, opShowToast = true) => {
  if (!opShowToast) return;

  if (error.response) {
    switch (error.response.status) {
      case 400:
        showToast(
          "warn",
          "Dữ liệu không hợp lệ",
          error.response.data?.message || "Vui lòng kiểm tra lại"
        );
        break;
      case 401:
        showToast("error", "Phiên hết hạn", "Vui lòng đăng nhập lại");
        localStorage.removeItem("token");
        window.location.href = "/login";
        break;
      case 403:
        showToast(
          "warn",
          "Không có quyền",
          "Bạn không được phép thực hiện hành động này"
        );
        break;
      case 500:
        showToast("error", "Lỗi hệ thống", "Vui lòng thử lại sau");
        break;
      default:
        showToast(
          "error",
          "Lỗi",
          error.response.data?.message || "Có sự cố xảy ra"
        );
    }
  } else if (error.request) {

    console.log(error.request);
    
    showToast(
      "warn",
      "Mất kết nối",
      "Hiện tại hệ thống không khả dụng, vui lòng thử lại sau"
    );
  } else {
    showToast("error", "Lỗi không xác định", error.message);
  }
};
