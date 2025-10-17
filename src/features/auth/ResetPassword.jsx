import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import { useNavigate } from "react-router-dom";

import { useToast } from "../../common/hooks/useToast";
import { useApi } from "../../common/hooks/useApi";
import authApi from "../../services/api/authAPI";

import doctor from "../../assets/Doctor.png";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const email = localStorage.getItem("resetEmail") || "";
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [errorFields, setErrorFields] = useState({
    otp: false,
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();

  const { showToast } = useToast();

  const { callApi } = useApi(showToast);

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

  const checkPassword = () => {
    if (newPassword.length < 8) {
      return false;
    } else {
      return true;
    }
  };

  const checkConfirmPassword = () => {
    if (!confirmPassword) return false;

    if (newPassword !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const handleResetPassword = async () => {
    const newErrors = {
      password: !checkPassword(),
      confirmPassword: !checkConfirmPassword(),
      otp: !otp,
    };

    setErrorFields(newErrors);

    // Nếu còn lỗi, dừng lại
    if (Object.values(newErrors).some((v) => v)) return;

    try {
      await callApi(() => authApi.reset_password({ email, otp, newPassword }));
      localStorage.removeItem("resetEmail");
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
      await callApi(() => authApi.resend_otp({ email }));
      showToast("success", "Thành công", "Gửi lại mã OTP thành công!");
    } catch {
      //
    }
  };

  return (
    <>
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
                    Mã Captcha
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
                        invalid={errorFields.otp && !otp}
                      />
                    </IconField>
                    <Button
                      type="button"
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
                  Mật khẩu mới
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-lock z-1" />
                  <Password
                    inputId="newPassword"
                    className="w-12 w-p-icon-field"
                    inputClassName="w-12 pl-5"
                    placeholder="Nhập mật khẩu mới"
                    onChange={(e) => setNewPassword(e.target.value)}
                    toggleMask
                    feedback={false}
                    invalid={errorFields.password && !newPassword}
                    onFocus={() =>
                      setErrorFields((prev) => ({ ...prev, password: false }))
                    }
                  />
                </IconField>
                {errorFields.password && newPassword && (
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
                  Nhập lại mật khẩu mới
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-lock z-1" />
                  <Password
                    inputId="confirmPassword"
                    className="w-12 w-p-icon-field"
                    inputClassName="w-12 pl-5"
                    placeholder="Nhập lại mật khẩu mới"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    toggleMask
                    feedback={false}
                    invalid={errorFields.confirmPassword && !confirmPassword}
                    onFocus={() =>
                      setErrorFields((prev) => ({
                        ...prev,
                        confirmPassword: false,
                      }))
                    }
                  />
                </IconField>
                {errorFields.confirmPassword && confirmPassword && (
                  <div className="text-sm mt-1" style={{ color: "red" }}>
                    Mật khẩu không khớp!
                  </div>
                )}
              </div>
              <Button
                type="button"
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
