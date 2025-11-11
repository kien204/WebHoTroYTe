import React, { useState } from "react";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../common/hooks/useToast";

import authApi from "../../services/api/authAPI";
import { useApi } from "../../common/hooks/useApi";

import doctor from "../../assets/Doctor.png";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const { showToast } = useToast();

  const { callApi } = useApi(showToast);

  const handleCheckEmail = () => {
    if (!email) return false;
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim());
  };

  const handleForgotPassword = async () => {
    const isValid = handleCheckEmail();
    setEmailError(!isValid);

    if (!isValid) {
      return;
    }

    try {
      await callApi(() => authApi.forgot_password({ email }), true, true);

      localStorage.setItem("resetEmail", email);

      navigate("/reset-password");
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
        <div className="flex flex-column align-items-center md:w-30rem">
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
              <div className="text-4xl font-bold">Quên mật khẩu</div>
              <div className="text-main2 mb-4 text-center mt-1">
                Nhập email của bạn để đặt lại mật khẩu
              </div>
              <div className="w-full">
                <label className="block mb-2 font-bold" htmlFor="email">
                  Email
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-envelope"> </InputIcon>
                  <InputText
                    id="email"
                    className="w-full"
                    value={email}
                    placeholder="Nhập tên email"
                    onChange={(e) => setEmail(e.target.value)}
                    invalid={emailError && !email}
                    onFocus={() => setEmailError(false)}
                  />
                </IconField>
              </div>
              {emailError && email && (
                <div className="w-full" style={{ color: "red" }}>
                  Email không hợp lệ, vui lòng nhập lại.
                </div>
              )}
              <Button
                type="button"
                className="w-full mt-4"
                onClick={handleForgotPassword}
                label="Tiếp tục"
              />
              <Link
                to="/login"
                className="text-main1 mt-5 w-full flex justify-content-center align-items-center"
              >
                <i className="pi pi-arrow-left mr-2 text-main1" />
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgetPassword;
