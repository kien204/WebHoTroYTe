import React, { useState, useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { FileUpload } from "primereact/fileupload";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [avatar, setAvatar] = useState("");

  const fileInputRef = useRef(null);

  // Khi click nút bút thì trigger input file
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

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div>
      <div
        className="w-full h-5rem border-round-top-lg mb-5"
        style={{
          background: "linear-gradient(to right, #a3d4f7, #f8efcfff)",
        }}
      ></div>
      <div className="w-full flex align-items-center">
        <div style={{ position: "relative", display: "inline-block" }}>
          <Avatar
            image={avatar || "https://www.w3schools.com/howto/img_avatar.png"}
            shape="circle"
            className="h-5rem w-5rem"
          />
          {isEdit && (
            <Button
              icon="pi pi-pencil"
              className="h-2rem w-2rem p-button-rounded p-button-text p-button-sm flex align-items-center justify-content-center"
              style={{
                position: "absolute",
                bottom: "5px",
                right: "-10px",
                background: "#1976d2",
                color: "#fff",
              }}
              onClick={handleButtonClick}
            />
          )}
          <input
            type="file"
            accept="image/*" // chỉ chọn ảnh (PC: file, Mobile: ảnh/camera)
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <h2 className="text-center ml-4 mr-auto">Hồ sơ cá nhân</h2>
        <Button
          label={!isEdit ? "Sửa" : "Lưu"}
          icon={!isEdit ? "pi pi-pencil" : "pi pi-save"}
          className="mr-5 mb-3"
          onClick={handleEdit}
        />
      </div>
      <div className="flex w-full mb-4">
        <div className="mr-8">
          <label htmlFor="fullname" className="block mb-2">
            Họ và tên
          </label>
          <InputText
            type="text"
            className="w-20rem"
            id="fullname"
            disabled={!isEdit}
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age" className="block mb-2">
            Tuổi
          </label>
          <InputText
            type="text"
            className="w-20rem"
            id="age"
            disabled={!isEdit}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full mb-4">
        <div className="mr-8">
          <label htmlFor="gender" className="block mb-2">
            Giới tính
          </label>
          <div className="flex flex-wrap gap-3">
            <div className="flex align-items-center">
              <RadioButton
                inputId="gender1"
                name="Nam"
                value="Nam"
                onChange={(e) => setGender(e.value)}
                checked={gender === "Nam"}
                disabled={!isEdit}
              />
              <label htmlFor="gender1" className="ml-2">
                Nam
              </label>
            </div>
            <div className="flex align-items-center">
              <RadioButton
                inputId="gender2"
                name="Nữ"
                value="Nữ"
                onChange={(e) => setGender(e.value)}
                checked={gender === "Nữ"}
                disabled={!isEdit}
              />
              <label htmlFor="gender2" className="ml-2">
                Nữ
              </label>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="height" className="block mb-2">
            Chiều cao
          </label>
          <InputText
            type="text"
            className="w-20rem"
            id="height"
            disabled={!isEdit}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default Profile;
