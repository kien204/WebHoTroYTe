import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Image } from "primereact/image";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import { useNavigate } from "react-router-dom";

import { useApi } from "../../common/hooks/useApi";
import authApi from "../../services/api/authAPI";

import doctor from "../../assets/Doctor.png";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const email = localStorage.getItem("resetEmail") || "";
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useRef(null);
  const [checkPass, setCheckPass] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [checkPasswork, setCheckPasswork] = useState(true);
  const [checkform, setCheckform] = useState(false);
  const navigate = useNavigate();

  const { callApi } = useApi(showToast);

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  useEffect(() => {
    if (newPassword.length < 8 && newPassword != "") {
      setCheckPasswork(false);
    } else {
      setCheckPasswork(true);
    }
  }, [newPassword]);

  useEffect(() => {
    if (confirmPassword !== "" && newPassword !== confirmPassword) {
      setCheckPass(false);
    } else {
      setCheckPass(true);
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    const expireTime = localStorage.getItem("otpExpire");
    if (expireTime) {
      const remaining = Math.floor((expireTime - Date.now()) / 1000);
      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        localStorage.removeItem("otpExpire");
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            localStorage.removeItem("otpExpire");
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleResetPassword = async () => {
    if (!checkPass || !checkPasswork || !otp) {
      setCheckform(true);
      return;
    }

    if (!email) {
      showToast("error", "Thất bại", "Không tìm thấy email");
      return;
    }

    try {
      const res = await callApi(() =>
        authApi.reset_password({ email, otp, newPassword })
      );

      console.log("Login successful:", res.data);

      showToast("success", "Thành công", "Đổi mật khẩu thành công");
      navigate("/login");
    } catch {
      //
    }
  };

  const ResendOtp = async () => {
    const expireTime = Date.now() + 60 * 1000; // hết hạn sau 60s
    localStorage.setItem("otpExpire", expireTime);
    setTimeLeft(60);

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
      <Toast ref={toast} className="w-10" />
      <div className="flex flex-column md:flex-row md:gap-8 align-items-center justify-content-center align-items-center min-h-screen bg-main3">
        <Image
          src={doctor}
          alt="Image"
          width="350"
          className="hidden lg:block"
        />
        <div className="flex flex-column align-items-center w-12 md:w-30rem">
          <div className="flex flex-column align-items-center">
            <div className="flex align-items-center gap-3">
              <i className="pi pi-heart text-4xl font-bold text-main1" />
              <span className="font-semibold text-2xl">HealthCare</span>
            </div>
            <div className="m-2">
              <span className="text-main2">Quản lý sức khỏe thông minh</span>
            </div>
          </div>
          <div
            className="p-1 shadow-1 w-11"
            style={{
              borderRadius: "46px",
              padding: "0.3rem",
              background:
                "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
            }}
          >
            <div
              className="flex flex-column justify-content-center align-items-center bg-white p-3 md:p-5"
              style={{ borderRadius: "43px" }}
            >
              <div className="text-4xl font-bold mb-4">Quên mật khẩu</div>
              <div className="text-main2 mb-4 text-center mt-1">
                Nhập mã dã gửi ở email để đặt lại mật khẩu
              </div>
              <div className="w-full">
                <div>
                  <label className="block mb-2 font-bold" htmlFor="otp">
                    Mã Capcha
                  </label>
                  <div className=" flex gap-5 justify-content-between align-items-center">
                    <IconField iconPosition="left">
                      <InputIcon className="pi pi-sync" />
                      <InputText
                        id="otp"
                        className="w-full"
                        value={otp}
                        placeholder="Nhập mã Capcha"
                        onChange={(e) => setOtp(e.target.value)}
                        invalid={checkform && !otp}
                      />
                    </IconField>
                    <Button
                      label={
                        timeLeft > 0 ? `Gửi lại (${timeLeft}s)` : "Gửi lại"
                      }
                      onClick={ResendOtp}
                      disabled={timeLeft > 0}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 w-full">
                <label className="block mb-2 font-bold" htmlFor="newPassword">
                  Mật khẩu
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-lock z-1" />
                  <Password
                    id="newPassword"
                    className="w-12 w-p-icon-field"
                    inputClassName="w-12 pl-5"
                    placeholder="Nhập mật khẩu"
                    onChange={(e) => setNewPassword(e.target.value)}
                    toggleMask
                    feedback={false}
                    invalid={checkform && !newPassword}
                  />
                </IconField>
                {!checkPasswork && (
                  <div className="text-sm mt-1" style={{ color: "red" }}>
                    Mật khẩu phải tối thiểu 8 kí tự
                  </div>
                )}
              </div>
              <div className="mt-4 w-full">
                <label
                  className="block mb-2 font-bold"
                  htmlFor="confirmPassword"
                >
                  Mật khẩu
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-lock z-1" />
                  <Password
                    id="confirmPassword"
                    className="w-12 w-p-icon-field"
                    inputClassName="w-12 pl-5"
                    placeholder="Nhập mật khẩu"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    toggleMask
                    feedback={false}
                    invalid={checkform && !confirmPassword}
                  />
                </IconField>
                {!checkPass && (
                  <div className="text-sm mt-1" style={{ color: "red" }}>
                    Mật khẩu không khớp!
                  </div>
                )}
              </div>
              <Button
                className="w-full mt-5"
                onClick={handleResetPassword}
                label="Đổi"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
