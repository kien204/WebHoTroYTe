import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import authApi from "./authApi";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Checkbox } from "primereact/checkbox";
import doctor from "../../assets/Doctor.png";
import { Image } from "primereact/image";

const Register = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const [checkConfirmPasswork, setCheckConfirmPasswork] = useState(true);
  const [checkPasswork, setCheckPasswork] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [isDialog, setIsDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  useEffect(() => {
    if (password !== confirmPassword && confirmPassword != "") {
      setCheckConfirmPasswork(false);
    } else {
      setCheckConfirmPasswork(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (password.length < 8 && password != "") {
      setCheckPasswork(false);
    } else {
      setCheckPasswork(true);
    }
  }, [password]);

  useEffect(() => {
    if (!email) setCheckEmail(false);
    setCheckEmail(/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim()));
  }, [email]);

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

  const handleRegister = async () => {
    if (!checkPasswork || !checkConfirmPasswork || !checkEmail || !checked) {
      setError(true);
      return;
    }

    setLoading(true);
    try {
      console.log(userName, email, password);
      const res = await authApi.register({ userName, email, password });
      console.log("Register successful:", res.data);
      setIsDialog(true);
    } catch (err) {
      console.error("Login error:", err);
      showToast("error", "Thất bại", "Tạo tài khoản thất bại!");
    }
    setLoading(false);
  };

  const handleOTP = async () => {
    try {
      console.log(userName, email, password);
      const res = await authApi.verify_otp({ email, otp });
      console.log("OTP successful:", res.data);
      navigate("/login");
      showToast("success", "Thành công", "Xác thực tài khoản thành công!");
    } catch (err) {
      console.error("Register error:", err);
      showToast("error", "Thất bại", "Tạo tài khoản thất bại!");
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
      <Toast ref={toast} />
      <div className="flex flex-column md:flex-row md:gap-8 align-items-center justify-content-center align-items-center min-h-screen py-3 bg-main3">
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
              <span className="opacity-70">Quản lý sức khỏe thông minh</span>
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
              <div className="text-4xl font-bold">Đăng ký </div>
              <div className="text-600 mb-4 opacity-80 text-center mt-1">
                Tạo tài khoản để bắt đầu quản lý sức khỏe
              </div>
              <div className="w-full">
                <label className="block mb-1 font-bold" htmlFor="userName">
                  Nhập họ và tên
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-user"> </InputIcon>
                  <InputText
                    id="userName"
                    className="w-12 pl-5"
                    invalid={error && !userName}
                    value={userName}
                    placeholder="Nhập họ và tên"
                    onChange={(e) => {
                      setuserName(e.target.value);
                    }}
                  />
                </IconField>
              </div>
              <div className="w-full mt-3">
                <label className="block mb-1 font-bold" htmlFor="userName">
                  Email
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-envelope"> </InputIcon>
                  <InputText
                    id="email"
                    className="w-full pl-5"
                    invalid={error && !email}
                    value={email}
                    placeholder="Nhập email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </IconField>
                {!checkEmail && email && (
                  <div className="text-sm mt-1" style={{ color: "red" }}>
                    Email không hợp lệ, vui lòng nhập lại.
                  </div>
                )}
              </div>
              <div className="mt-3 w-full">
                <label className="block mb-1 font-bold" htmlFor="password">
                  Mật khẩu
                </label>

                <IconField iconPosition="left">
                  <InputIcon className="pi pi-lock z-1" />
                  <Password
                    id="password"
                    className="w-12 w-p-icon-field"
                    inputClassName="w-12 pl-5"
                    invalid={error && !password}
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
                {!checkPasswork && (
                  <div className="text-sm mt-1" style={{ color: "red" }}>
                    Mật khẩu phải tối thiểu 8 kí tự
                  </div>
                )}
              </div>
              <div className="mt-3 w-full">
                <label className="block mb-1 font-bold" htmlFor="password">
                  Nhập lại mật khẩu
                </label>

                <IconField iconPosition="left">
                  <InputIcon className="pi pi-lock z-1" />
                  <Password
                    id="confirmPassword"
                    className="w-12 w-p-icon-field"
                    inputClassName="w-12 pl-5"
                    invalid={error && !confirmPassword}
                    placeholder="Nhập lại mật khẩu"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        e.preventDefault(); // chặn gõ space
                      }
                    }}
                    toggleMask
                    feedback={false}
                  />
                </IconField>
                {!checkConfirmPasswork && (
                  <div className="text-sm mt-1" style={{ color: "red" }}>
                    Mật khẩu không khớp!
                  </div>
                )}
              </div>
              <div className="w-full flex mt-3 gap-2 align-items-center">
                <Checkbox
                  onChange={(e) => setChecked(e.checked)}
                  checked={checked}
                  invalid={error && !checked ? true : false}
                ></Checkbox>
                <label>Tôi đồng ý</label>
                <Link to="/terms-of-service" className="text-main1">
                  Điều khoản sử dụng
                </Link>
              </div>
              <Button
                className="w-full mt-3"
                onClick={handleRegister}
                disabled={loading}
                label="Tạo tài khoản"
              />
              <div className="mt-4">
                Bạn đã có tài khoản?{" "}
                <Link to="/login" style={{ color: "#1947aaff" }}>
                  Quay lại đăng nhập
                </Link>
              </div>
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
        header={<div>HealthCare</div>}
      >
        <div className="my-3 mx-5">
          <div>
            <label className="block mb-2 font-bold" htmlFor="otp">
              Mã Capcha
            </label>
            <div className=" flex justify-content-between align-items-center">
              <InputText
                id="otp"
                className="w-full max-w-15rem"
                value={otp}
                placeholder="Nhập mã Capcha"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex justify-content-center gap-3 mt-5">
            <Button label="Xác nhận" onClick={handleOTP} />
            <Button
              label={timeLeft > 0 ? `Gửi lại (${timeLeft}s)` : "Gửi lại"}
              onClick={ResendOtp}
              disabled={timeLeft > 0}
            />{" "}
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default Register;
