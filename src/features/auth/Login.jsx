import React, { useState, useRef } from "react";
import logo from "../../assets/logo.png";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import authApi from "./authApi";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";

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
            <img src={logo} alt="Logo" className="w-5rem h-auto mb-4" />
            <div className="text-4xl font-bold">Chào mừng đến với</div>
            <div className="text-600 mb-4">Đăng nhập để tiếp tục</div>
            <div className="w-full">
              <label className="block mb-2 font-bold" htmlFor="email">
                Email
              </label>
              <InputText
                id="email"
                className="w-full"
                value={email}
                placeholder="Nhập tên đăng nhập"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4 w-full">
              <label className="block mb-2 font-bold" htmlFor="password">
                Mật khẩu
              </label>
              <Password
                id="password"
                inputClassName="w-24rem"
                placeholder="Nhập mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
                feedback={false}
              />
            </div>
            <div className="w-full flex">
              <Link
                to="/forgot-password"
                className="mt-3 ml-auto"
                style={{ color: "#1976d2" }}
              >
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
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
