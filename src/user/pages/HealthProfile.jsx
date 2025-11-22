import React, { useRef, useState, useContext, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";

import { AuthContext } from "../../common/context/AuthContext";
import { useApi } from "../../common/hooks/useApi";
import { useToast } from "../../common/hooks/useToast";
import infoApi from "../../services/api/infoAPI";

const HealthProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();
  const { callApi } = useApi(showToast);
  const { auth, profile, updateProfile } = useContext(AuthContext);

  const [visibleDialog, setVisibleDialog] = useState(false);

  const [info, setInfo] = useState(() => ({
    fullName: profile?.fullName || "",
    address: profile?.address || "",
    gender: profile?.gender || "",
    phoneNumber: profile?.phoneNumber || "",
    brith: profile?.brith ? new Date(profile.brith) : null,
    weight: profile?.weight || null,
    height: profile?.height || null,
    avatarUrl: profile?.avatarUrl || null,
    hoSoId: profile?.hoSoId || "",
  }));

  const [infoOld, setInfoOld] = useState(() => ({
    fullName: profile?.fullName || "",
    address: profile?.address || "",
    gender: profile?.gender || "",
    phoneNumber: profile?.phoneNumber || "",
    brith: profile?.brith ? new Date(profile.brith) : null,
    weight: profile?.weight || null,
    height: profile?.height || null,
    avatarUrl: profile?.avatarUrl || null,
    hoSoId: profile?.hoSoId || "",
  }));

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [errorForm, setErrorForm] = useState({
    fullName: false,
    address: false,
    gender: false,
    phoneNumber: false,
    age: false,
    weight: false,
    height: false,
  });

  const selectedGender = [
    { name: "Nam", value: "Nam" },
    { name: "Nữ", value: "Nữ" },
    { name: "Khác", value: "Khác" },
  ];

  useEffect(() => {
    if (profile) {
      const updatedInfo = {
        fullName: profile.fullName || "",
        address: profile.address || "",
        gender: profile.gender || "",
        phoneNumber: profile.phoneNumber || "",
        brith: profile.brith ? new Date(profile.brith) : null,
        weight: profile.weight || null,
        height: profile.height || null,
        avatarUrl: profile.avatarUrl || null,
        hoSoId: profile.hoSoId || "",
      };
      setInfo(updatedInfo);
      setInfoOld(updatedInfo);
    }
  }, [profile]);

  const checkAddress = () => {
    if (!info.address || info.address.length < 3) {
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
    }
    return true;
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
      setAvatarUrl(imageUrl);
      setInfo({ ...info, avatarUrl: file });
    }
  };

  const handleCancel = () => {
    setErrorForm({
      fullName: false,
      address: false,
      gender: false,
      phoneNumber: false,
      age: false,
      weight: false,
      height: false,
    });

    setInfo(infoOld);
    setAvatarUrl(null);
    setIsEdit(false);
    setVisibleDialog(false);
  };

  const handleSave = async () => {
    const newErrors = {
      fullName: !checkName(),
      address: !checkAddress(),
      gender: !info.gender,
      phoneNumber: !info.phoneNumber || !/^(0)(\d{9})$/.test(info.phoneNumber),
      age: !info.brith,
      height:
        !info.height ||
        info.height <= 0 ||
        info.height >= 300 ||
        !/^-?\d+$/.test(info.height) ||
        isNaN(info.height),
      weight:
        !info.weight ||
        info.weight <= 0 ||
        info.weight >= 500 ||
        !/^-?\d+$/.test(info.weight) ||
        isNaN(info.weight),
    };

    setErrorForm(newErrors);

    if (Object.values(newErrors).some((v) => v)) return;

    const formData = new FormData();
    formData.append("TaiKhoanId", auth.id);
    formData.append("FullName", info.fullName);
    formData.append("PhoneNumber", info.phoneNumber);
    formData.append(
      "Birth",
      info.brith ? info.brith.toLocaleDateString("en-CA") : ""
    );
    formData.append("Gender", info.gender);
    formData.append("Height", Number(info.height));
    formData.append("Weight", Number(info.weight));
    formData.append("Adress", info.address);
    if (info.avatarUrl instanceof File) {
      formData.append("avatar", info.avatarUrl);
    }

    try {
      const res = await callApi(() => infoApi.update(info.hoSoId, formData));
      showToast("success", "Thành công", "Lưu thông tin thành công");
      updateProfile(res);
      setIsEdit(false);
    } catch {
      // Handle error
    }
  };

  return (
    <>
      <div className="flex flex-column">
        <div>
          <div className="font-bold text-2xl">Hồ sơ sức khỏe</div>
          <div className="text-main2 mb-3">Thiết lập hồ sơ sức khỏe </div>
        </div>
        <Card title="Sửa thông tin người dùng">
          <div className="py-4 card-1">
            <div className="flex flex-column align-items-center">
              <div style={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  image={
                    avatarUrl ||
                    info.avatarUrl ||
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
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              <div className="mt-2 opacity-50">#{auth?.id}</div>
            </div>
          </div>

          <div className="mt-3 card-1 p-4">
            <div>
              <label className="block mb-1 font-bold" htmlFor="email">
                Email
              </label>
              <IconField iconPosition="left">
                <InputIcon className="pi pi-envelope"> </InputIcon>
                <InputText
                  id="email"
                  className="w-12 pl-5"
                  value={auth?.email || ""}
                  disabled={true}
                />
              </IconField>
            </div>
            <div className="mt-3">
              <label className="block mb-1 font-bold" htmlFor="address">
                Họ và tên
              </label>
              <IconField iconPosition="left">
                <InputIcon className="pi pi-user"> </InputIcon>
                <InputText
                  id="userName"
                  className="w-12 pl-5"
                  placeholder="Nhập họ và tên"
                  value={info.fullName || ""}
                  onChange={(e) =>
                    setInfo({ ...info, fullName: e.target.value })
                  }
                  invalid={errorForm.fullName}
                  onFocus={() =>
                    setErrorForm({ ...errorForm, fullName: false })
                  }
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
            <div className="flex flex-column lg:flex-row gap-3 mt-3">
              <div className="lg:w-4">
                <label className="block mb-1 font-bold" htmlFor="gender">
                  Giới tính
                </label>
                <div className="flex align-items-center relative">
                  <InputIcon
                    className={`pi pi-users text-main2 absolute ${
                      isEdit ? "z-1" : ""
                    }`}
                    style={{ marginLeft: "0.75rem" }}
                  />
                  <Dropdown
                    id="gender"
                    value={info.gender || ""}
                    onChange={(e) =>
                      setInfo({ ...info, gender: e.target.value })
                    }
                    options={selectedGender}
                    optionLabel="name"
                    placeholder="Chọn giới tính"
                    className="pl-4 w-full"
                    onFocus={() =>
                      setErrorForm({ ...errorForm, gender: false })
                    }
                    invalid={errorForm.gender}
                    disabled={!isEdit}
                  />
                </div>
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
                    value={info.address || ""}
                    placeholder="Nhập địa chỉ"
                    onChange={(e) =>
                      setInfo({ ...info, address: e.target.value })
                    }
                    onFocus={() =>
                      setErrorForm({ ...errorForm, address: false })
                    }
                    invalid={errorForm.address}
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
                <label className="block mb-1 font-bold" htmlFor="phoneNumber">
                  Số điện thoại
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-phone"> </InputIcon>
                  <InputText
                    id="phoneNumber"
                    className="w-12 "
                    placeholder="Nhập số điện thoại"
                    value={info.phoneNumber || ""}
                    onChange={(e) =>
                      setInfo({ ...info, phoneNumber: e.target.value })
                    }
                    invalid={errorForm.phoneNumber}
                    onFocus={() =>
                      setErrorForm({ ...errorForm, phoneNumber: false })
                    }
                    disabled={!isEdit}
                  />
                </IconField>
                {errorForm.phoneNumber && info.phoneNumber && (
                  <div className="text-sm mt-1" style={{ color: "red" }}>
                    Số điện thoại không hợp lệ!
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-column lg:flex-row gap-3 mt-3">
              <div className="lg:w-4">
                <label className="block mb-1 font-bold" htmlFor="age">
                  Năm sinh
                </label>
                <div className="p-input-icon-left w-full">
                  <i
                    className={`pi pi-calendar text-main2 ${
                      isEdit ? "z-1" : ""
                    }`}
                    style={{ paddingLeft: "0.70rem" }}
                  />
                  <Calendar
                    id="age"
                    value={info.brith}
                    locale="vi"
                    className="w-full"
                    inputClassName="pl-5"
                    placeholder="dd/mm/yyyy"
                    dateFormat="dd/mm/yy"
                    onChange={(e) => setInfo({ ...info, brith: e.value })}
                    onFocus={() => setErrorForm({ ...errorForm, age: false })}
                    invalid={errorForm.age}
                    disabled={!isEdit}
                    readOnlyInput={true}
                    maxDate={new Date()} // không cho chọn ngày tương lai
                    minDate={
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() - 120)
                      )
                    }
                  />
                  {errorForm.age && info.brith && (
                    <small className="p-error">Ngày sinh không hợp lệ! </small>
                  )}
                </div>
              </div>

              <div className="lg:w-4">
                <label className="block mb-1 font-bold" htmlFor="height">
                  Chiều cao
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-arrows-v" />
                  <InputText
                    id="height"
                    value={info.height || ""}
                    onChange={(e) =>
                      setInfo({ ...info, height: e.target.value })
                    }
                    onFocus={() =>
                      setErrorForm({ ...errorForm, height: false })
                    }
                    placeholder="Nhập chiều cao"
                    invalid={errorForm.height}
                    className="w-12"
                    disabled={!isEdit}
                  />
                </IconField>
                {info.height && errorForm.height && (
                  <small className="p-error">
                    {info.height <= 0 || info.height >= 300
                      ? "Dữ liệu phải làm trong khoảng 0-300 cm"
                      : "Chiều cao không hợp lệ! Vui lòng nhập lại!"}
                  </small>
                )}
              </div>
              <div className="lg:w-4">
                <label className="block mb-1 font-bold" htmlFor="weight">
                  Cân nặng
                </label>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-shopping-bag " />
                  <InputText
                    id="weight"
                    value={info.weight || ""}
                    onChange={(e) =>
                      setInfo({ ...info, weight: e.target.value })
                    }
                    placeholder="Nhập cân nặng"
                    invalid={errorForm.weight}
                    onFocus={() =>
                      setErrorForm({ ...errorForm, weight: false })
                    }
                    className="w-12"
                    disabled={!isEdit}
                  />
                </IconField>
                {info.weight && errorForm.weight && (
                  <small className="p-error">
                    {info.weight <= 0 || info.weight >= 500
                      ? "Dữ liệu phải làm trong khoảng 0-500 kg"
                      : "Cân nặng không hợp lệ! Vui lòng nhập lại!"}
                  </small>
                )}
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
                  onClick={() => setVisibleDialog(true)}
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
      <Dialog visible={visibleDialog} header="Cảnh báo" hidden>
        <div className="flex flex-column gap-3">
          Thay đổi chưa được lưu. Bạn chắc chắn muốn thoát?
          <div className="flex flex-row gap-3">
            <Button
              label="Hủy"
              onClick={() => setVisibleDialog(false)}
              severity="secondary"
            />
            <Button label="Thoát" onClick={handleCancel} />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default HealthProfile;
