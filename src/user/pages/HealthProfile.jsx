import React, { useRef, useState, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

import { AuthContext } from "../../common/context/AuthContext";

import { useApi } from "../../common/hooks/useApi";
import { useToast } from "../../common/hooks/useToast";
import infoApi from "../../services/api/infoAPI";

const HealthProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const fileInputRef = useRef(null);
  const { showToast } = useToast();
  const { callApi } = useApi(showToast);

  const { auth, profile, updateAuth } = useContext(AuthContext);
  const [info, setInfo] = useState(profile);
  const [infoOld] = useState(profile);

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [errorForm, setErrorForm] = useState({
    fullName: false,
    address: false,
    gender: false,
    age: false,
    weight: false,
    height: false,
  });

  const selectedGender = [
    { name: "Nam", value: "Nam" },
    { name: "Nữ", value: "Nữ" },
    { name: "Khác", value: "Khác" },
  ];

  const checkAddress = () => {
    if (!info.address) return false;
    if (info.address.length < 3) {
      return false;
    }
    return true;
  };

  const checkName = () => {
    if (!info.fullName) return false;
    if (
      !/^[\p{L}\s]+$/u.test(info.fullName.trim()) ||
      info.fullName.length < 2 ||
      info.fullName.length > 100
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
      setInfo({ ...info, avatarUrl: file });
    }
  };

  const handleCancel = () => {
    setInfo(infoOld);
    setAvatarUrl(null);
    setIsEdit(false);
  };

  const handleSave = async () => {
    const newErrors = {
      fullName: !checkName(),
      address: !checkAddress(),
      gender: !info.gender,
      age: !info.age,
      weight: !info.weight,
      height: !info.height,
    };

    setErrorForm(newErrors);

    // Nếu còn lỗi, dừng lại
    if (Object.values(newErrors).some((v) => v)) return;

    try {
      await callApi(() => infoApi.create(info));
      showToast("success", "Thành công", "Lưu thông tin thành công");
      updateAuth({
        ...auth,
        check: true,
      });
    } catch {
      //
    }
  };

  return (
    <div className="flex flex-column">
      <div>
        <div className="font-bold text-2xl">Hồ sở sức khỏe</div>
        <div className="text-main2 mb-3">Thiết lập hồ sơ sức khỏe </div>
      </div>
      <Card title="Sửa thông tin người dùng">
        <div className="py-4">
          <div className="flex flex-column align-items-center">
            <div style={{ position: "relative", display: "inline-block" }}>
              <Avatar
                image={
                  avatarUrl ||
                  info?.avatarUrl ||
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
                disabled={!isEdit}
              />
              <input
                type="file"
                accept="image/*" // chỉ chọn ảnh (PC: file, Mobile: ảnh/camera)
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div className="mt-2">{auth.id}</div>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-bold" htmlFor="email">
            Email
          </label>
          <IconField iconPosition="left">
            <InputIcon className="pi pi-envelope"> </InputIcon>
            <InputText
              id="email"
              className="w-12 pl-5"
              value={auth?.email}
              disabled="true"
            />
          </IconField>
        </div>
        <div className="flex flex-column lg:flex-row gap-3 mt-3">
          <div className="lg:w-4">
            <label className="block mb-1 font-bold" htmlFor="address">
              Họ và tên
            </label>
            <IconField iconPosition="left">
              <InputIcon className="pi pi-user"> </InputIcon>
              <InputText
                id="userName"
                className="w-12 pl-5"
                placeholder="Nhập họ và tên"
                value={info?.fullName}
                onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
                invalid={errorForm.fullName && !info.fullName}
                onFocus={() => setErrorForm({ ...errorForm, fullName: false })}
                disabled={!isEdit}
              />
            </IconField>
            {errorForm.fullName && info.fullName && (
              <div className="text-sm mt-1" style={{ color: "red" }}>
                {info.fullName.trim().length < 2
                  ? "Họ và tên phải có ít nhất 2 ký tự"
                  : info.fullName.trim().length > 100
                  ? "Họ và tên không được vượt quá 100 ký tự"
                  : "Họ tên chỉ được chứa chữ, không bao gồm ký tự đặc biệt hoặc số"}
              </div>
            )}
          </div>
          <div className="lg:w-4">
            <label className="block mb-1 font-bold" htmlFor="address">
              Địa chỉ
            </label>
            <IconField iconPosition="left">
              <InputIcon className="pi pi-map-marker" />
              <InputText
                id="address"
                className="w-full pl-5"
                value={info?.address}
                placeholder="Nhập địa chỉ"
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
                onFocus={() => setErrorForm({ ...errorForm, address: false })}
                invalid={errorForm.address && !info?.address}
                disabled={!isEdit}
              />
            </IconField>
            {errorForm.address && info.address && (
              <small className="p-error">
                Địa chỉ tối thiểu phải có 3 ký tự!
              </small>
            )}
          </div>
          <div className="lg:w-4">
            <label className="block mb-1 font-bold" htmlFor="gender">
              Giới tính
            </label>
            <div className="flex align-items-center relative">
              <InputIcon
                className={`pi pi-users absolute  ${isEdit ? "z-1" : ""}`}
                style={{ marginLeft: "0.75rem" }}
              />
              <Dropdown
                inputId="gender"
                value={info?.gender}
                onChange={(e) => setInfo({ ...info, gender: e.target.value })}
                options={selectedGender}
                optionLabel="name"
                placeholder="Chọn giới tính"
                className="pl-4 w-full"
                onFocus={() => setErrorForm({ ...errorForm, gender: false })}
                invalid={errorForm.gender && !info?.gender}
                disabled={!isEdit}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-column lg:flex-row gap-3 mt-3">
          <div className="lg:w-4">
            <label className="block mb-1 font-bold" htmlFor="age">
              Năm sinh
            </label>
            <div className="p-input-icon-left w-full">
              <i
                className={`pi pi-calendar ${isEdit ? "z-1" : ""}`}
                style={{ paddingLeft: "0.70rem" }}
              />
              <Calendar
                id="age"
                value={info.age}
                locale="vi"
                className="w-full"
                inputClassName="pl-5"
                placeholder="dd/mm/yyyy"
                dateFormat="dd/mm/yy"
                onChange={(e) => setInfo({ ...info, age: e.value })}
                onFocus={() => setErrorForm({ ...errorForm, age: false })}
                invalid={errorForm.age}
                disabled={!isEdit}
              />
            </div>
          </div>
          <div className="lg:w-4">
            <label className="block mb-1 font-bold" htmlFor="weight">
              Cân nặng
            </label>
            <div className="flex align-items-center relative">
              <InputIcon
                className="pi pi-shopping-bag absolute"
                style={{ marginLeft: "0.75rem" }}
              />
              <InputNumber
                inputId="weight"
                value={info?.weight}
                onValueChange={(e) => setInfo({ ...info, weight: e.value })}
                placeholder="Nhập cân nặng"
                min={1}
                max={1000}
                mode="decimal"
                minFractionDigits={0}
                maxFractionDigits={0}
                useGrouping={false}
                invalid={errorForm.weight}
                onFocus={() => setErrorForm({ ...errorForm, weight: false })}
                className="w-full"
                inputClassName="pl-5 w-12"
                disabled={!isEdit}
              />
            </div>
          </div>
          <div className="lg:w-4">
            <label className="block mb-1 font-bold" htmlFor="height">
              Chiều cao
            </label>
            <div className="flex align-items-center relative">
              <InputIcon
                className="pi pi-arrows-v absolute"
                style={{ marginLeft: "0.75rem" }}
              />
              <InputNumber
                inputId="height"
                value={info?.height}
                onValueChange={(e) =>
                  setInfo({ ...info, height: e.target.value })
                }
                onFocus={() => setErrorForm({ ...errorForm, height: false })}
                placeholder="Nhập chiều cao"
                min={1}
                max={300}
                mode="decimal"
                minFractionDigits={0}
                maxFractionDigits={0}
                useGrouping={false}
                invalid={errorForm.height}
                className="w-full"
                inputClassName="pl-5 w-12"
                disabled={!isEdit}
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          {isEdit ? (
            <>
              <Button
                className="mr-3"
                type="button"
                label="Lưu thay đổi"
                icon="pi pi-save"
                onClick={handleSave}
              />
              <Button
                type="button"
                label="Hủy"
                icon="pi pi-times"
                severity="secondary"
                onClick={handleCancel}
              />
            </>
          ) : (
            <Button
              type="button"
              label="Sửa"
              icon="pi pi-pencil"
              onClick={() => setIsEdit(true)}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default HealthProfile;
