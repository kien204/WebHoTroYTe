import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Checkbox } from "primereact/checkbox";
import { Image } from "primereact/image";
import { InputOtp } from "primereact/inputotp";
import { Dialog } from "primereact/dialog";

import { useToast } from "../../common/hooks/useToast";
import authApi from "../../services/api/authAPI";
import { useApi } from "../../common/hooks/useApi";

import doctor from "../../assets/Doctor.png";

const Register = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isDialog, setIsDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [checkStatusUser, setCheckStatusUser] = useState(null);

  const [errorFields, setErrorFields] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    checked: false,
  });

  const { showToast } = useToast();
  const { callApi } = useApi(showToast);

  const navigate = useNavigate();

  const checkName = () => {
    if (!userName) return false;
    if (
      !/^[\p{L}\s]+$/u.test(userName.trim()) ||
      userName.length < 2 ||
      userName.length > 100
    ) {
      return false;
    } else {
      return true;
    }
  };

  const checkEmail = () => {
    if (!email) return false;
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim());
  };

  const checkPassword = () => {
    if (password.length < 8) {
      return false;
    } else {
      return true;
    }
  };

  const checkConfirmPassword = () => {
    if (!confirmPassword) return false;

    if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const handleRegister = async () => {
    const newErrors = {
      name: !checkName(),
      email: !checkEmail(),
      password: !checkPassword(),
      confirmPassword: !checkConfirmPassword(),
      checked: !checked,
    };

    setErrorFields(newErrors);

    // Nếu còn lỗi, dừng lại
    if (Object.values(newErrors).some((v) => v)) return;

    try {
      const res = await callApi(() => authApi.register({ userName, email, password }));
      setCheckStatusUser(res.s0TP);
      setIsDialog(true);
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
      await authApi.resend_otp({ email });
      showToast("success", "Thành công", "Gửi lại mã OTP thành công!");
    } catch {
      //
    }
  };

  return (
    <>
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
                    invalid={errorFields.name && !userName}
                    value={userName}
                    placeholder="Nhập họ và tên"
                    onChange={(e) => {
                      setuserName(e.target.value);
                    }}
                    onFocus={() =>
                      setErrorFields((prev) => ({ ...prev, name: false }))
                    }
                  />
                </IconField>
                {errorFields.name && userName && (
                  <div className="text-sm mt-1" style={{ color: "red" }}>
                    {userName.trim().length < 2
                      ? "Họ và tên phải có ít nhất 2 ký tự"
                      : userName.trim().length > 100
                      ? "Họ và tên không được vượt quá 100 ký tự"
                      : "Họ tên chỉ được chứa chữ, không bao gồm ký tự đặc biệt hoặc số"}
                  </div>
                )}
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
                    invalid={errorFields.email && !email}
                    value={email}
                    placeholder="Nhập email"
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() =>
                      setErrorFields((prev) => ({ ...prev, email: false }))
                    }
                  />
                </IconField>
                {errorFields.email && email && (
                  <div className="text-sm mt-1" style={{ color: "red" }}>
                    Email không hợp lệ, vui lòng nhập lại
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
                    inputId="password"
                    className="w-12 w-p-icon-field"
                    inputClassName="w-12 pl-5"
                    invalid={errorFields.password && !password}
                    placeholder="Nhập mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        e.preventDefault(); // chặn gõ space
                      }
                    }}
                    onFocus={() =>
                      setErrorFields((prev) => ({ ...prev, password: false }))
                    }
                    toggleMask
                    feedback={false}
                  />
                </IconField>
                {errorFields.password && password && (
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
                    inputId="confirmPassword"
                    className="w-12 w-p-icon-field"
                    inputClassName="w-12 pl-5"
                    invalid={errorFields.confirmPassword && !confirmPassword}
                    placeholder="Nhập lại mật khẩu"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        e.preventDefault(); // chặn gõ space
                      }
                    }}
                    onFocus={() =>
                      setErrorFields((prev) => ({
                        ...prev,
                        confirmPassword: false,
                      }))
                    }
                    toggleMask
                    feedback={false}
                  />
                </IconField>
                {errorFields.confirmPassword && confirmPassword && (
                  <div className="text-sm mt-1" style={{ color: "red" }}>
                    Mật khẩu nhập lại không khớp
                  </div>
                )}
              </div>
              <div className="w-full flex mt-3 gap-2 align-items-center">
                <Checkbox
                  onChange={(e) => setChecked(e.checked)}
                  checked={checked}
                  invalid={errorFields.checked && !checked}
                ></Checkbox>
                <label>Tôi đồng ý</label>
                <Link to="/terms-of-service" className="text-main1">
                  Điều khoản sử dụng
                </Link>
              </div>
              <Button
                type="button"
                className="w-full mt-3"
                onClick={handleRegister}
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
        header={<div className="text-center">Nhập mã OTP</div>}
        className="w-11 md:w-5 lg:w-4"
        headerClassName="p-2"
      >
        <div>
          <div className="mb-3 mt-3">
            {checkStatusUser === 1
              ? "Nhập mã OTP để kích hoạt tài khoản"
              : "Đã có tài khoảnkhoản, nhập mã OTP để kích hoạt tài khoản"}
          </div>
          <InputOtp
            value={otp}
            length={6}
            onChange={(e) => setOtp(e.value)}
            style={{ display: "flex", justifyContent: "center" }}
            inputClassName="p-0"
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
      </Dialog>
    </>
  );
};
export default Register;
