import React, { useRef, useState } from "react";
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
import axios from "axios";

const SetupInfoModal = ({ onClose }) => {
  const stepperRef = useRef(null);
  const [userName, setuserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const fileInputRef = useRef(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const genders = [
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
    // const auth = JSON.parse(localStorage.getItem("auth"));
    // await axios.put("/api/user/profile", form, {
    //   headers: { Authorization: `Bearer ${auth.token}` },
    // });
    onClose();
  };

  return (
    <Dialog
      header="Thiết lập thông tin"
      visible
      modal
      closable={false}
      className="w-5"
    >
      <div className="card flex justify-content-center">
        <Stepper ref={stepperRef} style={{ flexBasis: "50rem" }}>
          <StepperPanel header="Thông tin 1">
            <div className="flex flex-column align-items-center min-h-12rem">
              <div className="w-8">
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
                        className="w-full pl-5"
                        invalid={userName === "" ? true : false}
                        value={userName}
                        placeholder="Nhập họ và tên"
                        onChange={(e) => {
                          const value = e.target.value;
                          const regex = /^[a-zA-ZÀ-ỹ\s]*$/;
                          if (regex.test(value)) {
                            setuserName(value);
                          }
                        }}
                      />
                    </IconField>
                  </div>
                  <div className="flex gap-6 mt-3">
                    <div className="w-6">
                      <label
                        className="block mb-1 font-bold"
                        htmlFor="userName"
                      >
                        Tuổi <span style={{ color: "red" }}>*</span>
                      </label>
                      <IconField iconPosition="left">
                        <InputIcon className="pi pi-calendar"></InputIcon>
                        <InputText
                          id="userName"
                          className="w-full pl-5"
                          invalid={userName === "" ? true : false}
                          value={userName}
                          placeholder="Nhập tuổi"
                          onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^[a-zA-ZÀ-ỹ\s]*$/;
                            if (regex.test(value)) {
                              setuserName(value);
                            }
                          }}
                        />
                      </IconField>
                    </div>
                    <div className="w-6">
                      <label
                        className="block mb-1 font-bold"
                        htmlFor="userName"
                      >
                        Giới tính <span style={{ color: "red" }}>*</span>
                      </label>
                      <IconField iconPosition="left">
                        <InputIcon className="pi pi-user z-1"> </InputIcon>
                        <Dropdown
                          value={selectedGender}
                          onChange={(e) => setSelectedGender(e.value)}
                          options={genders}
                          optionLabel="name"
                          placeholder="Chọn giới tính"
                          className="pl-4"
                        />
                      </IconField>
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
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>
          <StepperPanel header="Thông tin 2">
            <div className="flex flex-column h-12rem"></div>
            <div className="flex pt-4 justify-content-between">
              <Button
                label="Quay lại"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Tiếp theo"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>
          <StepperPanel header="Thông tin 3">
            <div className="flex flex-column h-12rem"></div>
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
