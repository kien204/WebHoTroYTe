import React, { useState, useRef, useEffect } from "react";
import doctor from "../../assets/Doctor.png";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import authApi from "./authApi";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isCheckEmail, setIsCheckEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  useEffect(() => {
    if (!email) setCheckEmail(false);
    setCheckEmail(/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim()));
  }, [email]);

  const handleForgotPassword = async () => {
    if (!email) {
      setIsCheckEmail(false);
      return;
    }

    if (!checkEmail) {
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.forgot_password({ email });

      console.log(res.data);

      navigate("/reset-password");
    } catch (err) {
      console.error("Email error:", err);
      showToast("error", "Thất bại", "Tài khoản không tồn tại!");
    }
    setLoading(false);
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="flex justify-content-center align-items-center min-h-screen gap-15 bg-main3">
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
              <div className="text-4xl font-bold">Quên mật khẩu</div>
              <div className="text-main2 mb-4">
                Nhập email của bạn để đặt lại mật khẩu{" "}
              </div>
              <div className="w-full mt-3">
                <label className="block mb-2 font-bold" htmlFor="email">
                  Email
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-envelope"> </InputIcon>
                  <InputText
                    id="email"
                    className="w-full pl-5 mb-1"
                    value={email}
                    placeholder="Nhập tên email"
                    onChange={(e) => setEmail(e.target.value)}
                    invalid={!isCheckEmail && !email ? true : false}
                  />
                </IconField>
              </div>
              {!checkEmail && email && (
                <div className="w-full" style={{ color: "red" }}>
                  Email không hợp lệ!
                </div>
              )}
              <Button
                className="w-full mt-4"
                onClick={handleForgotPassword}
                disabled={loading}
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
