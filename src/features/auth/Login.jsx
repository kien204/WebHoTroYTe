import React, { useState, useContext, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Image } from "primereact/image";
import { Divider } from "primereact/divider";
import { AuthContext } from "../../common/context/AuthContext";
import { Dialog } from "primereact/dialog";
import { InputOtp } from "primereact/inputotp";

import { useToast } from "../../common/hooks/useToast";
import authApi from "../../services/api/authAPI";
import { useApi } from "../../common/hooks/useApi";

import doctor from "../../assets/Doctor.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [checkForm, setCheckForm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDialog, setIsDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const { showToast } = useToast();
  const { login } = useContext(AuthContext);
  const { callApi } = useApi(showToast);

  const [data, setData] = useState(null);

  const handleCheckEmail = () => {
    if (!email) return false;
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim());
  };

  const handleLogin = async () => {
    setEmailError(!handleCheckEmail());

    if (!handleCheckEmail() || !email || !password) {
      setCheckForm(true);
      return;
    }

    try {
      const res = await callApi(() => authApi.login({ email, password }));
      if (res.status === 1) {
        showToast("success", "Thành công", "Đăng nhập thành công!");
        login(res.auth, res.token);
      } else {
        setIsDialog(true);
        setData(res);
      }
    } catch {
      //
    }
  };

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

  // Đếm ngược mỗi giây
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

  const handleOTP = async () => {
    if (!otp || otp.length < 6) {
      setOtpError(true);
      return;
    }
    setOtpError(false);
    try {
      await callApi(() => authApi.verify_otp({ email, otp }));
      showToast("success", "Thành công", "Xác thực tài khoản thành công!");
      localStorage.removeItem("expireTime");
      login(data.auth, data.token);
    } catch {
      //
    }
  };

  const ResendOtp = async () => {
    const expireTime = Date.now() + 60 * 1000; // hết hạn sau 60s
    localStorage.setItem("otpExpire", expireTime);
    setTimeLeft(60);

    try {
      await authApi.resend_otp({ email });
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
                    onFocus={() => setEmailError(false)}
                  />
                </IconField>
                {email && emailError && (
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
                    inputId="password"
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
                type="button"
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
              {/* <Divider align="center">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        visible={isDialog}
        modal
        onHide={() => {
          if (!isDialog) return;
          setIsDialog(false);
        }}
        header={
          <div className="text-center">
            {isHidden ? "Tài khoản chưa được kích hoạt" : "Nhập mã OTP"}
          </div>
        }
        className="w-11 md:w-5 lg:w-4"
        headerClassName="p-2"
      >
        {isHidden ? (
          <div>
            <div className="mb-3 mt-3">Nhập mã OTP để kích hoạt tài khoản</div>
            <InputOtp
              value={otp}
              length={6}
              onChange={(e) => setOtp(e.value)}
              style={{ display: "flex", justifyContent: "center" }}
            />
            {otpError && (
              <div className="text-sm mt-1" style={{ color: "red" }}>
                Vui lòng nhập đầy đủ mã OTP
              </div>
            )}
            <div className="w-full flex justify-content-center gap-3 mt-5">
              <Button label="Xác nhận" onClick={handleOTP} />
              <Button
                label={timeLeft > 0 ? `Gửi lại (${timeLeft}s)` : "Gửi lại"}
                onClick={ResendOtp}
                disabled={timeLeft > 0}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-column align-items-center">
            <div className="mb-3 mt-3 text-center">
              Vui lòng kích hoạt tài khoản để đăng nhập. Sau khi kích hoạt, mã
              otp sẽ được gửi về email của bạn.
            </div>
            <Button
              className="w-5"
              label="Kích hoạt"
              onClick={() => setIsHidden(true)}
            />
          </div>
        )}
      </Dialog>
    </>
  );
};
export default Login;
