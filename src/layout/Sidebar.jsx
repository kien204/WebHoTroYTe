import { Sidebar } from "primereact/sidebar";
import { Avatar } from "primereact/avatar";
import logo from "../assets/logo.png";

const MenuSidebar = ({ visible, onHide }) => {
  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={visible}
        onHide={onHide}
        style={{ width: "280px" }}
        header={() => (
          <span className="inline-flex align-items-center gap-2">
            <img src={logo} alt="Logo" className="h-2rem w-auto" />
            <span className="font-semibold text-2xl text-primary">
              Free Fire
            </span>
          </span>
        )}
      >
        <div className="flex flex-column h-full">
          <div>helo</div>
          <div className="mt-auto">
            <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
            <a className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
              <Avatar
                image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                shape="circle"
              />
              <span className="font-bold">Amy Elsner</span>
            </a>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default MenuSidebar;
