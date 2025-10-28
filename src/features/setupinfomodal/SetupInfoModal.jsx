import React, { useRef, useState, useContext, useEffect } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Calendar } from "primereact/calendar";

import { AuthContext } from "../../common/context/AuthContext";
import infoAPI from "../../services/api/infoAPI";
import { useApi } from "../../common/hooks/useApi";
import { useToast } from "../../common/hooks/useToast";

const SetupInfoModal = ({ onClose }) => {
  const stepperRef = useRef(null);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();
  const { callApi } = useApi(showToast);
  const { auth, updateAuth } = useContext(AuthContext);

  const [form, setForm] = useState({
    userName: "",
    age: "",
    gender: null,
    address: "",
    height: "",
    weight: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [checkForm1, setCheckForm1] = useState(true);
  const [checkForm2, setCheckForm2] = useState({
    height: false,
    weight: false,
    address: false,
  });

  const selectedGender = [
    { name: "Nam", code: "M" },
    { name: "Nữ", code: "F" },
    { name: "Khác", code: "O" },
  ];

  const checkAddress = () => {
    if (!form.address) return true;
    return form.address.length < 3;
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      showToast(
        "warn",
        "Lỗi",
        "Lỗi! Vui lòng chọn file có định dạng ảnh như .JPEG, .PNG hoặc .JPG!!"
      );
      event.target.value = ""; // reset input
      return;
    }

    if (file) {
      // Kiểm tra dung lượng file
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        showToast(
          "warn",
          "Tệp quá lớn",
          "Lỗi! Vui lòng chọn file kích thước < 2MB!"
        );
        event.target.value = ""; // reset input file
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setAvatar(file);
      setAvatarUrl(imageUrl);
    }
  };

  const handleNext = () => {
    if (!form.age || !form.gender) {
      setCheckForm1(false);
      return;
    }
    stepperRef.current.nextCallback();
  };

  const handleSave = async () => {
    const invalids = {
      height:
        !form.height ||
        form.height <= 0 ||
        !/^-?\d+$/.test(form.height) ||
        isNaN(form.height),
      weight:
        !form.weight ||
        form.weight <= 0 ||
        !/^-?\d+$/.test(form.weight) ||
        isNaN(form.weight),
      address: checkAddress(),
    };

    setCheckForm2(invalids);
    if (Object.values(invalids).some((v) => v)) return;

    const formData = new FormData();
    formData.append("TaiKhoanId", auth?.id);
    formData.append("FullName", auth?.userName);
    formData.append("Birth", form.age.toLocaleDateString("en-CA"));
    formData.append("Gender", form.gender.name);
    formData.append("Height", Number(form.height));
    formData.append("Weight", Number(form.weight));
    formData.append("Adress", form.address);
    if (avatar) formData.append("avatar", avatar);

    try {
      await callApi(() => infoAPI.create(formData));
      showToast("success", "Thành công", "Thiết lập thông tin thành công");
      updateAuth({ ...auth, check: true });
      onClose();
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const step = stepperRef.current?.getActiveStep?.() ?? 0;
        if (step === 0) handleNext();
        else handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [form]);

  return (
    <Dialog
      header={
        <div className="text-3xl font-bold text-center">
          Thiết lập thông tin
        </div>
      }
      visible
      modal
      closable={false}
      className="w-11 md:w-7 xl:w-6"
      contentClassName="p-2"
    >
      <div className="card flex justify-content-center">
        <Stepper ref={stepperRef} className="w-full setStepper" linear>
          {/* ===== BƯỚC 1 ===== */}
          <StepperPanel header="Thông tin 1">
            <div className="flex flex-column align-items-center min-h-12rem">
              <div className="w-12 sm:w-10">
                <div className="flex flex-column align-items-center">
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <Avatar
                      image={
                        avatarUrl ||
                        "https://www.w3schools.com/howto/img_avatar.png"
                      }
                      shape="circle"
                      className="h-5rem w-5rem"
                    />
                    <Button
                      type="button"
                      icon="pi pi-camera"
                      className="w-2rem h-2rem p-button-rounded p-button-text p-button-sm flex align-items-center justify-content-center"
                      style={{
                        position: "absolute",
                        bottom: "5px",
                        right: "-10px",
                        background: "#d1d1d1ff",
                        color: "#000000ff",
                      }}
                      onClick={handleButtonClick}
                    />
                    <input
                      type="file"
                      accept=".jpeg,.jpg,.png"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <Card
                  className="shadow-2 mt-3"
                  title={
                    <div className="flex align-items-center gap-2">
                      <i
                        className="pi pi-user font-bold"
                        style={{ fontSize: "1.25rem" }}
                      />
                      <span className="text-xl">Thông tin cá nhân</span>
                    </div>
                  }
                >
                  <div>
                    <label className="block mb-1 font-bold" htmlFor="userName">
                      Nhập họ và tên <span style={{ color: "red" }}>*</span>
                    </label>
                    <IconField iconPosition="left">
                      <InputIcon className="pi pi-user" />
                      <InputText
                        id="userName"
                        className="w-12 pl-5"
                        value={auth?.userName}
                        disabled
                      />
                    </IconField>
                  </div>

                  <div className="flex flex-column lg:flex-row gap-3 mt-3">
                    <div className="w-12">
                      <label className="block mb-1 font-bold" htmlFor="age">
                        Năm sinh <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="p-input-icon-left w-full">
                        <i
                          className="pi pi-calendar z-1"
                          style={{ paddingLeft: "0.70rem" }}
                        />
                        <Calendar
                          locale="vi"
                          id="age"
                          value={form.age}
                          className="w-full"
                          inputClassName="pl-5"
                          placeholder="dd/mm/yyyy"
                          dateFormat="dd/mm/yy"
                          onChange={(e) => setForm({ ...form, age: e.value })}
                          onFocus={() =>
                            setCheckForm1({ ...checkForm1, age: false })
                          }
                          invalid={!checkForm1 && !form.age}
                          readOnlyInput
                          maxDate={new Date()} // không cho chọn ngày tương lai
                          minDate={
                            new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() - 120
                              )
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="w-12">
                      <label className="block mb-1 font-bold" htmlFor="gender">
                        Giới tính <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="flex align-items-center relative">
                        <InputIcon
                          className="pi pi-users z-1 absolute"
                          style={{ marginLeft: "0.75rem" }}
                        />
                        <Dropdown
                          id="gender"
                          value={form.gender}
                          onChange={(e) =>
                            setForm({ ...form, gender: e.value })
                          }
                          options={selectedGender}
                          optionLabel="name"
                          placeholder="Chọn giới tính"
                          className="pl-4 w-full"
                          invalid={!checkForm1 && !form.gender}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex pt-4 justify-content-end">
              <Button
                type="button"
                label="Tiếp theo"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={handleNext}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleNext();
                }}
              />
            </div>
          </StepperPanel>

          {/* ===== BƯỚC 2 ===== */}
          <StepperPanel header="Thông tin 2">
            <div className="flex flex-column align-items-center min-h-12rem">
              <div className="w-12 sm:w-10">
                <Card
                  className="shadow-2 mt-3"
                  title={
                    <div className="flex align-items-center gap-2">
                      <i
                        className="pi pi-user font-bold"
                        style={{ fontSize: "1.3rem" }}
                      />
                      <span>Thông tin khác</span>
                    </div>
                  }
                >
                  <div>
                    <label className="block mb-1 font-bold" htmlFor="address">
                      Địa chỉ
                    </label>
                    <IconField iconPosition="left">
                      <InputIcon className="pi pi-home" />
                      <InputText
                        id="address"
                        className="w-full pl-5"
                        value={form.address}
                        placeholder="Nhập địa chỉ"
                        onChange={(e) =>
                          setForm({ ...form, address: e.target.value })
                        }
                        onFocus={() =>
                          setCheckForm2({ ...checkForm2, address: false })
                        }
                        invalid={checkForm2.address && !form.address}
                      />
                    </IconField>
                    {checkForm2.address && form.address && (
                      <small className="p-error">
                        Địa chỉ tối thiểu phải có 3 ký tự!
                      </small>
                    )}
                  </div>

                  <div className="flex flex-column lg:flex-row gap-3 mt-3">
                    <div className="w-12">
                      <label className="block mb-1 font-bold" htmlFor="weight">
                        Cân nặng <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon hidden md:block">
                          <i className="pi pi-shopping-bag" />
                        </span>
                        <InputText
                          id="weight"
                          value={form.weight}
                          onChange={(e) =>
                            setForm({ ...form, weight: e.target.value })
                          }
                          placeholder="Nhập cân nặng"
                          invalid={checkForm2.weight && !form.weight}
                          className="w-full"
                          onFocus={() =>
                            setCheckForm2({ ...checkForm2, weight: false })
                          }
                        />
                        <span className="p-inputgroup-addon hidden md:block">
                          kg
                        </span>
                      </div>
                      {checkForm2.weight && form.weight && (
                        <small className="p-error">
                          Cân nặng không hợp lệ! Vui lòng nhập lại!
                        </small>
                      )}
                    </div>

                    <div className="w-12">
                      <label className="block mb-1 font-bold" htmlFor="height">
                        Chiều cao <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon hidden md:block">
                          <i className="pi pi-arrows-v" />
                        </span>
                        <InputText
                          id="height"
                          value={form.height}
                          onChange={(e) =>
                            setForm({ ...form, height: e.target.value })
                          }
                          placeholder="Nhập chiều cao"
                          onFocus={() =>
                            setCheckForm2({ ...checkForm2, height: false })
                          }
                          invalid={checkForm2.height && !form.height}
                          className="w-full"
                        />
                        <span className="p-inputgroup-addon hidden md:block">
                          cm
                        </span>
                      </div>
                      {checkForm2.height && form.height && (
                        <small className="p-error">
                          Chiều cao không hợp lệ! Vui lòng nhập lại!
                        </small>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex pt-4 justify-content-between">
              <Button
                type="button"
                label="Quay lại"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                type="button"
                label="Lưu"
                icon="pi pi-save"
                iconPos="right"
                onClick={handleSave}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                }}
              />
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </Dialog>
  );
};

export default SetupInfoModal;
