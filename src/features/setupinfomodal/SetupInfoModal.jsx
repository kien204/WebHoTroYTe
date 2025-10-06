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
import { InputNumber } from "primereact/inputnumber";

const SetupInfoModal = ({ onClose }) => {
  const stepperRef = useRef(null);
  const [userName, setuserName] = useState("");
  const [age, setAge] = useState("");
  const [avatar, setAvatar] = useState("");
  const fileInputRef = useRef(null);
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
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
    if (!height || !weight) {
      setCheckForm2(false);
      return;
    }

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
                    <IconField >
                      <InputIcon className="pi pi-user"> </InputIcon>
                      <InputText
                        id="userName"
                        className="w-full pl-5"
                        invalid={!checkForm1 && !userName}
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
                  <div className="flex flex-column lg:flex-row gap-3 mt-3">
                    <div className="w-12">
                      <label className="block mb-1 font-bold" htmlFor="age">
                        Tuổi <span style={{ color: "red" }}>*</span>
                      </label>
                      <IconField >
                        <InputIcon className="pi pi-calendar" />
                        <InputNumber
                          id="age"
                          value={age}
                          onValueChange={(e) => setAge(e.value)}
                          placeholder="Nhập tuổi"
                          min={1}
                          max={120}
                          invalid={!checkForm1 && !age}
                          className="w-full"
                          inputClassName="pl-5 w-12"
                        />
                      </IconField>
                    </div>
                    <div className="w-12">
                      <label className="block mb-1 font-bold" htmlFor="gender">
                        Giới tính <span style={{ color: "red" }}>*</span>
                      </label>
                      <IconField >
                        <InputIcon className="pi pi-users z-1" />
                        <Dropdown
                          id="gender"
                          value={gender}
                          onChange={(e) => setGender(e.value)}
                          options={selectedGender}
                          optionLabel="name"
                          placeholder="Chọn giới tính"
                          className="pl-4 w-full"
                          invalid={!checkForm1 && !gender}
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
                onClick={() => {
                  if (!userName || !age || !gender) {
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
                    <IconField >
                      <InputIcon className="pi pi-home" />
                      <InputText
                        id="address"
                        className="w-full pl-5"
                        value={address}
                        placeholder="Nhập địa chỉ"
                        onChange={(e) => setAddress(e.target.value)}
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
                          id="weight"
                          value={weight}
                          onValueChange={(e) => setWeight(e.value)}
                          placeholder="Nhập cân nặng"
                          min={1}
                          max={1000}
                          invalid={!checkForm2 && !weight}
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
                          id="height"
                          value={height}
                          onValueChange={(e) => setHeight(e.value)}
                          placeholder="Nhập chiều cao"
                          min={1}
                          max={300}
                          invalid={!checkForm2 && !height}
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
