import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import authApi from "./authApi";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";

const Register = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const [checkPass, setCheckPass] = useState(true);
  const [isDialog, setIsDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  useEffect(() => {
    if (confirmPassword !== "" && password !== confirmPassword) {
      setCheckPass(false);
    } else {
      setCheckPass(true);
    }
  }, [password, confirmPassword]);

  const handleRegister = async () => {
    if (!checkPass) {
      showToast("error", "Thất bại", "Mật khẩu không khớp!");
      return;
    }

    if (!userName || !password || !confirmPassword || !email) {
      showToast("warn", "Chú ý", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    try {
      console.log(userName, email, password);
      const res = await authApi.register({ userName, email, password });
      console.log("Register successful:", res.data);
      showToast("success", "Thành công", res.data.message);
      // ví dụ: chuyển hướng sang trang chủ
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
            <div className="text-4xl font-bold mb-4">Đăng ký tài khoản</div>
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
              <label className="block mb-2 font-bold" htmlFor="userName">
                Tên đăng nhập
              </label>
              <InputText
                id="userName"
                className="w-full"
                value={userName}
                placeholder="Nhập tên đăng nhập"
                onChange={(e) => setuserName(e.target.value)}
              />
            </div>
            <div className="mt-3 w-full">
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
            <div className="mt-3 w-full">
              <label className="block mb-2 font-bold" htmlFor="password">
                Nhập lại mật khẩu
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
            <div className="w-full flex">
              <Link to="" className="mt-3" style={{ color: "#1976d2" }}>
                Điều khoản sử dụng
              </Link>
            </div>
            <Button
              className="w-full mt-3"
              onClick={handleRegister}
              disabled={loading}
              label="Đăng ký"
            />
            <div className="mt-4">
              Bạn đã có tài khoản?{" "}
              <Link to="/login" style={{ color: "#1976d2" }}>
                Quay lại đăng nhập
              </Link>
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
        header={<div>Nhập mã OTP</div>}
      >
        <div>
          <InputText
            id="otp"
            className="w-full"
            value={otp}
            placeholder="Nhập tên email"
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="w-full flex justify-content-center">
            <Button className="mt-3" label="Xác nhận" onClick={handleOTP} />
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default Register;
