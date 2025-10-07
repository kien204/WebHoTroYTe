import React, { useState, useEffect, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Image } from "primereact/image";
import { Divider } from "primereact/divider";
import { useToast } from "../../common/hooks/useToast";
import { AuthContext } from "../../common/context/AuthContext";

import authApi from "../../services/api/authAPI";
import { useApi } from "../../common/hooks/useApi";

import doctor from "../../assets/Doctor.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkForm, setCheckForm] = useState(false);
  const { showToast } = useToast();
  const { login } = useContext(AuthContext);
  const { callApi } = useApi(showToast);

  useEffect(() => {
    if (!email) setCheckEmail(false);
    setCheckEmail(/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim()));
  }, [email]);

  const handleLogin = async () => {
    if (!checkEmail || !password) {
      setCheckForm(true);
      return;
    }

    try {
      const data = await callApi(() => authApi.login({ email, password }));
      login(data.auth, data.token);
      showToast("success", "Thành công", "Đăng nhập thành công!");
    } catch {
      // Không cần xử lý lỗi ở đây nữa, handleApiError đã làm rồi
    }
  };

  return (
    <>
      <div className="flex flex-column md:flex-row md:gap-8 align-items-center justify-content-center align-items-center min-h-screen bg-main3">
        <Image
          src={doctor}
          alt="Image"
          className="hidden lg:block"
          width="350"
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
              <div className="text-4xl font-bold">Đăng nhập</div>
              <div className="text-main2 mb-4 text-center mt-1">
                Nhập thông tin để truy cập tài khoản của bạn
              </div>
              <div className="w-full">
                <label className="block mb-2 font-bold" htmlFor="email">
                  Email
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-envelope" />
                  <InputText
                    id="email"
                    className="w-12 pl-5"
                    invalid={checkForm && !email}
                    value={email}
                    placeholder="Nhập tên đăng nhập"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </IconField>
                {email && !checkEmail && (
                  <small className="p-error">
                    Email không hợp lệ, vui lòng nhập lại.
                  </small>
                )}
              </div>
              <div className="mt-4 w-full">
                <label className="block mb-2 font-bold" htmlFor="password">
                  Mật khẩu
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-lock z-1" />
                  <Password
                    id="password"
                    className="w-12 w-p-icon-field"
                    inputClassName="w-12 pl-5"
                    invalid={checkForm && !password}
                    placeholder="Nhập mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        e.preventDefault(); // chặn gõ space
                      }
                    }}
                    toggleMask
                    feedback={false}
                  />
                </IconField>
              </div>
              <div className="w-full flex">
                <Link to="/forgot-password" className="mt-3 ml-auto text-main1">
                  Quên mật khẩu?
                </Link>
              </div>
              <Button
                className="w-full mt-3"
                onClick={handleLogin}
                label="Đăng nhập"
              />
              <div className="mt-4">
                Chưa có tài khoản?{" "}
                <Link to="/register" style={{ color: "#1976d2" }}>
                  Đăng ký
                </Link>
              </div>
              <Divider align="center">
                <span className="text-main2">Hoặc đăng nhập với</span>
              </Divider>
              <div className="flex justify-content-center gap-1 md:gap-5">
                <Button
                  label="Google"
                  icon="pi pi-google"
                  className="p-button-sm flex align-items-center gap-2"
                />
                <Button
                  label="Facebook"
                  icon="pi pi-facebook"
                  className="p-button-sm flex align-items-center gap-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
