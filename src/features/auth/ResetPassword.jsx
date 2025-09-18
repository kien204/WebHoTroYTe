import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import authApi from "./authApi";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const [checkPass, setCheckPass] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  useEffect(() => {
    if (confirmPassword !== "" && newPassword !== confirmPassword) {
      setCheckPass(false);
    } else {
      setCheckPass(true);
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResetPassword = async () => {
    if (!checkPass) {
      showToast("error", "Thất bại", "Mật khẩu không khớp!");
      return;
    }

    if (!newPassword || !confirmPassword || !email) {
      showToast("warn", "Chú ý", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    try {
      console.log(email, otp, newPassword);
      const res = await authApi.reset_password({ email, otp, newPassword });
      console.log("Login successful:", res.data);

      // ví dụ: chuyển hướng sang trang chủ
      window.location.href = "/login";
    } catch (err) {
      console.error("Login error:", err);
      showToast("error", "Thất bại", "Tạo tài khoản thất bại!");
    }
    setLoading(false);
  };

  const ResendOtp = async () => {
    setTimeLeft(60); // đặt lại thời gian đếm ngược
    try {
      const res = await authApi.resend_otp({ email });
      showToast("success", "Thành công", "Gửi lại mã OTP thành công!");

      console.log("Resend OTP successful:", res.data);
    } catch (err) {
      console.error("Resend OTP error:", err);
      showToast("error", "Thất bại", "Gửi lại mã OTP thất bại!");
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="flex justify-content-center align-items-center min-h-screen">
        <div
          className="p-1 shadow-1"
          style={{
            borderRadius: "46px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="flex flex-column justify-content-center align-items-center bg-white p-6 w-30rem"
            style={{ borderRadius: "43px" }}
          >
            <div className="text-4xl font-bold mb-4">Đổi mật khẩu</div>
            <div className="w-full">
              <label className="block mb-2 font-bold" htmlFor="userName">
                Email
              </label>
              <InputText
                id="email"
                className="w-full"
                value={email}
                placeholder="Nhập tên email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full mt-3">
              <div>
                <label className="block mb-2 font-bold" htmlFor="otp">
                  Mã OTP
                </label>
                <div className=" flex justify-content-between align-items-center">
                  <InputText
                    id="otp"
                    className="w-full max-w-15rem"
                    value={otp}
                    placeholder="Nhập mã otp"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <Button
                    label={timeLeft > 0 ? `Gửi lại (${timeLeft}s)` : "Gửi lại"}
                    onClick={ResendOtp}
                    disabled={timeLeft > 0}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 w-full">
              <label className="block mb-2 font-bold" htmlFor="newPassword">
                Mật khẩu mới
              </label>
              <Password
                id="newPassword"
                inputClassName="w-24rem"
                placeholder="Nhập mật khẩu"
                onChange={(e) => setNewPassword(e.target.value)}
                toggleMask
                feedback={false}
              />
            </div>
            <div className="mt-3 w-full">
              <label className="block mb-2 font-bold" htmlFor="confirmPassword">
                Nhập lại mật khẩu mới
              </label>
              <Password
                id="confirmPassword"
                inputClassName="w-24rem"
                placeholder="Nhập lại mật khẩu"
                onChange={(e) => setConfirmPassword(e.target.value)}
                toggleMask
                feedback={false}
              />
              {!checkPass && (
                <div className="text-sm mt-1" style={{ color: "red" }}>
                  Mật khẩu không khớp!
                </div>
              )}
            </div>
            <Button
              className="w-full mt-6"
              onClick={handleResetPassword}
              disabled={loading}
              label="Đổi"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
