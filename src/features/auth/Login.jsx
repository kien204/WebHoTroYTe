import React, { useState, useRef } from "react";
import doctor from "../../assets/Doctor.png";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import authApi from "./authApi";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Image } from "primereact/image";
import { Divider } from "primereact/divider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      console.log(email, password);
      const res = await authApi.login({ email, password });
      console.log("Login successful:", res.data);

      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: res.data.token,
          id_user: res.data.useid,
          date: Date.now() + 60 * 60 * 1000, // 1 hour
        })
      );

      navigate("/");
      showToast("success", "Thành công", "Đăng nhập thành công!");
    } catch (err) {
      console.error("Login error:", err);
      showToast("error", "Thất bại", "Tài khoản hoặc mật khẩu!");
    }
    setLoading(false);
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="flex align-items-center justify-content-center align-items-center h-screen gap-15 bg-main3">
        <Image src={doctor} alt="Image" width="350" />
        <div>
          <div className="flex flex-column align-items-center mt-5">
            <div className="flex align-items-center gap-3">
              <i className="pi pi-heart text-4xl font-bold text-main1" />
              <span className="font-semibold text-2xl">HealthCare</span>
            </div>
            <div className="m-2">
              <span className="text-main2">Quản lý sức khỏe thông minh</span>
            </div>
          </div>
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
              {/* <img src={logo} alt="Logo" className="w-5rem h-auto mb-4" /> */}
              <div className="text-4xl font-bold">Đăng nhập</div>
              <div className="text-main2 mb-4">
                Nhập thông tin để truy cập tài khoản của bạn
              </div>
              <div className="w-full">
                <label className="block mb-2 font-bold" htmlFor="email">
                  Email
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-envelope"> </InputIcon>
                  <InputText
                    id="email"
                    className="w-full pl-5"
                    value={email}
                    placeholder="Nhập tên đăng nhập"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </IconField>
              </div>
              <div className="mt-4 w-full">
                <label className="block mb-2 font-bold" htmlFor="password">
                  Mật khẩu
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-lock z-1" />
                  <Password
                    id="password"
                    inputClassName="w-24rem pl-5"
                    placeholder="Nhập mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
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
                disabled={loading}
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
              <div className="flex justify-content-center gap-4">
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
