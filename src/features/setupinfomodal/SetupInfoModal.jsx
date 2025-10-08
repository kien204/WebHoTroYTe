import React, { useRef, useState, useContext } from "react";
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
import { InputNumber } from "primereact/inputnumber";

import { AuthContext } from "../../common/context/AuthContext";

import infoAPI from "../../services/api/infoAPI";
import { useApi } from "../../common/hooks/useApi";
import { useToast } from "../../common/hooks/useToast";

const SetupInfoModal = ({ onClose }) => {
  const stepperRef = useRef(null);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();
  const { callApi } = useApi(showToast);

  const { auth } = useContext(AuthContext);

  const [form, setForm] = useState({
    userName: "",
    age: "",
    gender: null,
    address: "",
    height: "",
    weight: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [checkForm1, setCheckForm1] = useState(true);
  const [checkForm2, setCheckForm2] = useState(true);

  const selectedGender = [
    { name: "Nam", code: "M" },
    { name: "Nữ", code: "F" },
  ];

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl); // hiện preview ngay
      console.log("Ảnh đã chọn:", file);
      // TODO: Upload lên server bằng FormData nếu cần
    }
  };

  const handleSave = async () => {
    if (!form.height || !form.weight) {
      setCheckForm2(false);
      return;
    }

    const formData = new FormData();
    formData.append("TaiKhoanId", auth.id);
    formData.append("FullName", form.userName);
    formData.append("Age", form.age);
    formData.append("Gender", form.gender?.code);
    formData.append("Address", form.address);
    formData.append("Height", Number(form.height));
    formData.append("Weight", Number(form.weight));
    if (avatar?.file) formData.append("Avatar", avatar.file);

    try {
      await callApi(() => infoAPI.create(formData));

      onClose();
    } catch {
      //
    }
  };

  return (
    <Dialog
      header="Thiết lập thông tin"
      visible
      modal
      closable={false}
      className="w-11 md:w-7 xl:w-6"
      contentClassName="p-2"
    >
      <div className="card flex justify-content-center">
        <Stepper ref={stepperRef} className="w-full setStepper" linear>
          <StepperPanel header="Thông tin 1">
            <div className="flex flex-column align-items-center min-h-12rem">
              <div className="w-12 sm:w-10">
                <div className="flex flex-column align-items-center">
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <Avatar
                      image={
                        avatar ||
                        "https://www.w3schools.com/howto/img_avatar.png"
                      }
                      shape="circle"
                      className="h-5rem w-5rem"
                    />
                    <Button
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
                      accept="image/*" // chỉ chọn ảnh (PC: file, Mobile: ảnh/camera)
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
                        style={{ fontSize: "1.3rem" }}
                      />
                      <span>Thông tin cá nhân</span>
                    </div>
                  }
                >
                  <div>
                    <label className="block mb-1 font-bold" htmlFor="userName">
                      Nhập họ và tên <span style={{ color: "red" }}>*</span>
                    </label>
                    <IconField iconPosition="left">
                      <InputIcon className="pi pi-user"> </InputIcon>
                      <InputText
                        id="userName"
                        className="w-12 pl-5"
                        value={auth.userName}
                        disabled="true"
                      />
                    </IconField>
                  </div>
                  <div className="flex flex-column lg:flex-row gap-3 mt-3">
                    <div className="w-12">
                      <label className="block mb-1 font-bold" htmlFor="age">
                        Tuổi <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="flex align-items-center">
                        <InputIcon
                          className="pi pi-calendar absolute"
                          style={{ marginLeft: "0.75rem" }}
                        />
                        <InputNumber
                          inputId="age"
                          value={form.age}
                          onValueChange={(e) =>
                            setForm({ ...form, age: e.value })
                          }
                          placeholder="Nhập tuổi"
                          min={1}
                          max={120}
                          invalid={!checkForm1 && !form.age}
                          className="w-full"
                          inputClassName="pl-5 w-12"
                        />
                      </div>
                    </div>
                    <div className="w-12">
                      <label className="block mb-1 font-bold" htmlFor="gender">
                        Giới tính <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="flex align-items-center">
                        <InputIcon
                          className="pi pi-users z-1 absolute"
                          style={{ marginLeft: "0.75rem" }}
                        />
                        <Dropdown
                          inputId="gender"
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
                label="Tiếp theo"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={() => {
                  if (!form.userName || !form.age || !form.gender) {
                    setCheckForm1(false);
                    return;
                  }
                  stepperRef.current.nextCallback();
                }}
              />
            </div>
          </StepperPanel>
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
                        invalid={!checkForm2 && !form.address}
                      />
                    </IconField>
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
                        <InputNumber
                          inputId="weight"
                          value={form.weight}
                          onValueChange={(e) =>
                            setForm({ ...form, weight: e.value })
                          }
                          placeholder="Nhập cân nặng"
                          min={1}
                          max={1000}
                          invalid={!checkForm2 && !form.weight}
                          className="w-full"
                          inputClassName="w-12"
                        />
                        <span className="p-inputgroup-addon hidden md:block">
                          kg
                        </span>
                      </div>
                    </div>
                    <div className="w-12">
                      <label className="block mb-1 font-bold" htmlFor="height">
                        Chiều cao <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon hidden md:block">
                          <i className="pi pi-arrows-v" />
                        </span>
                        <InputNumber
                          inputId="height"
                          value={form.height}
                          onValueChange={(e) =>
                            setForm({ ...form, height: e.value })
                          }
                          placeholder="Nhập chiều cao"
                          min={1}
                          max={300}
                          invalid={!checkForm2 && !form.height}
                          className="w-full"
                          inputClassName="w-12"
                        />
                        <span className="p-inputgroup-addon hidden md:block">
                          cm
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className="flex pt-4 justify-content-between">
              <Button
                label="Quay lại"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Lưu"
                icon="pi pi-save"
                iconPos="right"
                onClick={handleSave}
              />
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </Dialog>
  );
};

export default SetupInfoModal;
