import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Avatar } from "primereact/avatar";
import { addLocale } from "primereact/api";

import logo from "../../assets/anh1.svg";

import { useWindowWidth } from "../../common/hooks/useWindowWidth";
import { useToast } from "../../common/hooks/useToast";
import { useApi } from "../../common/hooks/useApi";
import managementAccountApi from "../../services/api/managementAccountApi";

const vietnameseLocale = {
  firstDayOfWeek: 1,
  dayNames: [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  monthNames: [
    "Tháng Một",
    "Tháng Hai",
    "Tháng Ba",
    "Tháng Tư",
    "Tháng Năm",
    "Tháng Sáu",
    "Tháng Bảy",
    "Tháng Tám",
    "Tháng Chín",
    "Tháng Mười",
    "Tháng Mười Một",
    "Tháng Mười Hai",
  ],
  monthNamesShort: [
    "Th1",
    "Th2",
    "Th3",
    "Th4",
    "Th5",
    "Th6",
    "Th7",
    "Th8",
    "Th9",
    "Th10",
    "Th11",
    "Th12",
  ],
  today: "Hôm nay",
  clear: "Xóa",
};

// Đăng ký locale
addLocale("vi", vietnameseLocale);

const SystemManager = () => {
  const [listUsers, setListUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Danh sách người dùng đã lọc
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const months = [
    { name: "Tháng 1", code: "1" },
    { name: "Tháng 2", code: "2" },
    { name: "Tháng 3", code: "3" },
    { name: "Tháng 4", code: "4" },
    { name: "Tháng 5", code: "5" },
    { name: "Tháng 6", code: "6" },
    { name: "Tháng 7", code: "7" },
    { name: "Tháng 8", code: "8" },
    { name: "Tháng 9", code: "9" },
    { name: "Tháng 10", code: "10" },
    { name: "Tháng 11", code: "11" },
    { name: "Tháng 12", code: "12" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => {
    const year = currentYear - i;
    return { name: year.toString(), code: year.toString() };
  });

  const status = [
    { name: "Hoạt động", code: "true" },
    { name: "Khóa", code: "false" },
  ];

  const op = useRef(null);
  const calendarRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const statusRef = useRef(null);

  const [visibleDialogDelete, setVisibleDialogDelete] = useState(false);

  const { showToast } = useToast();
  const { callApi } = useApi(showToast);

  const width = useWindowWidth();
  let tableWidthPx;
  if (width < 768) tableWidthPx = width - 50;
  else if (width < 1440) tableWidthPx = width - 310;
  else tableWidthPx = width;

  const [first] = useState(0);

  const getListUser = async () => {
    try {
      const res = await callApi(() => managementAccountApi.getAll());
      if (res) {
        setListUsers(res);
        setFilteredUsers(res);
      }
    } catch {
      //
    }
  };

  useEffect(() => {
    getListUser;
  }, []);

  useEffect(() => {
    const hideAll = () => {
      // OverlayPanel
      if (op.current && op.current.hide) {
        try {
          op.current.hide();
        } catch (err) {
          console.warn("Error hiding OverlayPanel:", err);
        }
      }

      // Calendar
      if (calendarRef.current?.hide) {
        try {
          calendarRef.current.hide();
        } catch (err) {
          console.warn("Error hiding Calendar:", err);
        }
      }

      // Dropdown tháng
      if (monthRef.current && monthRef.current.hide) {
        try {
          monthRef.current.hide();
        } catch (err) {
          console.warn("Error hiding Month Dropdown:", err);
        }
      }

      // Dropdown năm
      if (yearRef.current && yearRef.current.hide) {
        try {
          yearRef.current.hide();
        } catch (err) {
          console.warn("Error hiding Year Dropdown:", err);
        }
      }

      // Dropdown trạng thái
      if (statusRef.current && statusRef.current.hide) {
        try {
          statusRef.current.hide();
        } catch (err) {
          console.warn("Error hiding Status Dropdown:", err);
        }
      }
    };

    window.addEventListener("scroll", hideAll, true);
    window.addEventListener("resize", hideAll);

    return () => {
      window.removeEventListener("scroll", hideAll, true);
      window.removeEventListener("resize", hideAll);
      hideAll();
    };
  }, []);

  // Hàm lọc dữ liệu
  const applyFilters = () => {
    let filtered = [...listUsers];

    // Lọc theo ngày
    if (selectedDate) {
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      filtered = filtered.filter((user) => user.date === formattedDate);
    }

    // Lọc theo tháng
    if (selectedMonth) {
      const monthIndex = parseInt(selectedMonth.code); // chuyển về số nguyên
      filtered = filtered.filter((user) => {
        const m = Number(user.date.split("/")[1]);
        return m === monthIndex;
      });
    }

    // Lọc theo năm
    if (selectedYear) {
      const yearFilter = parseInt(selectedYear.code);
      filtered = filtered.filter((user) => {
        const y = Number(user.date.split("/")[2]);
        console.log(y);

        return y === yearFilter;
      });
    }

    // Lọc theo trạng thái
    if (selectedStatus) {
      filtered = filtered.filter(
        (user) => user.status.toString() === selectedStatus.code
      );
    }

    setFilteredUsers(filtered);
  };

  // Xử lý khi nhấn nút "Lọc"
  const handleFilter = () => {
    applyFilters();
  };

  // Xử lý khi nhấn nút "Làm mới"
  const handleResetFilters = () => {
    setSelectedDate(null);
    setSelectedMonth(null);
    setSelectedYear(null);
    setSelectedStatus(null);
    setGlobalFilter("");
    setFilteredUsers(listUsers); // Reset về danh sách gốc
  };

  const header = (
    <div>
      <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            type="search"
            className="w-12"
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              applyFilters(); // Lọc ngay khi nhập
            }}
            placeholder="Tìm kiếm người dùng"
          />
        </IconField>
        <Button
          icon="pi pi-sync"
          label="Làm mới"
          onClick={handleResetFilters}
        />
      </div>
      <div className="flex flex-wrap gap-5 mt-5 mb-3">
        <span className="flex align-items-center">Lọc theo thời gian</span>
        <Calendar
          ref={calendarRef}
          id="buttondisplay"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.value)}
          showIcon
          className="w-10rem"
          placeholder="dd/mm/yyyy"
          dateFormat="dd/mm/yy"
          locale="vi"
        />
        <Dropdown
          ref={monthRef}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.value)}
          options={months}
          optionLabel="name"
          placeholder="Tháng"
          className="w-10rem"
        />
        <Dropdown
          ref={yearRef}
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.value)}
          options={years}
          optionLabel="name"
          placeholder="Năm"
          className="w-10rem"
        />
        <Dropdown
          ref={statusRef}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.value)}
          options={status}
          optionLabel="name"
          placeholder="Trạng thái"
          className="w-10rem"
        />
        <Button icon="pi pi-filter" label="Lọc" onClick={handleFilter} />
      </div>
    </div>
  );

  const sttBodyTemplate = (rowData, { rowIndex }) => {
    return <span>{first + rowIndex + 1}</span>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        label="Tùy chọn"
        severity="secondary"
        outlined
        onClick={(event) => {
          setSelectedUser(rowData);
          op.current.toggle(event);
        }}
      />
    );
  };

  const setBodyStatus = (rowData) => {
    return (
      <div
        className={`p-2 text-center ${rowData.status ? "card-4" : "card-2"}`}
      >
        {rowData.status ? "Hoạt động" : "Khóa"}
      </div>
    );
  };

  const handleLock = async () => {
    try {
      if (selectedUser.status) {
        await callApi(() => managementAccountApi.lock(selectedUser.idUser));
      } else {
        await callApi(() => managementAccountApi.unlock(selectedUser.idUser));
      }
      if (op.current && op.current.hide) {
        op.current.hide();
      }
    } catch {
      //
    }
  };

  const handleDelete = async () => {
    try {
      await callApi(() => managementAccountApi.delete(selectedUser.idUser));
      getListUser();
      setVisibleDialogDelete(false);
      if (op.current && op.current.hide) {
        op.current.hide();
      }
    } catch {
      console.warn("Error during delete operation");
    }
  };

  return (
    <div className="min-h-full">
      <div className="mb-3">
        <div className="font-bold text-2xl">Quản lý tài khoản</div>
        <div className="text-main2">
          Theo dõi và quản lý các tài khoản của người dùng
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-column lg:flex-row gap-5 p-3 w-full">
          <div className="flex flex-column w-full lg:w-4 card-1 p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="inline-block mr-auto font-bold">
                Tổng người dùng
              </div>
              <i className="pi pi-users font-bold" />
            </div>
            <div className="font-bold">{listUsers.length}</div>
            <div>+12% so với tháng trước</div>
          </div>
          <div className="flex flex-column w-full lg:w-4 card-2 p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="inline-block mr-auto font-bold">
                Đang hoạt động
              </div>
              <i className="pi pi-globe font-bold" />
            </div>
            <div className="font-bold">
              {listUsers.filter((user) => user.status).length}
            </div>
            <div>+12% so với tháng trước</div>
          </div>
          <div className="flex flex-column w-full lg:w-4 card-4 p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="inline-block mr-auto font-bold">Bị khóa</div>
              <i className="pi pi-ban font-bold" />
            </div>
            <div className="font-bold">
              {listUsers.filter((user) => !user.status).length}
            </div>
            <div>+12% so với tháng trước</div>
          </div>
        </div>
      </div>
      <div
        className="flex"
        style={{
          overflowX: "auto",
          width: width >= 1440 ? "100%" : `${tableWidthPx}px`,
        }}
      >
        <DataTable
          className="w-full"
          value={filteredUsers} // Sử dụng danh sách đã lọc
          paginator
          rows={10}
          size="small"
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Hiển thị {first} đến {last} trong {totalRecords} người dùng"
          globalFilter={globalFilter}
          header={header}
          emptyMessage="Không có dữ liệu người dùng."
        >
          <Column body={sttBodyTemplate} header="STT" />
          <Column field="idUser" header="ID user" />
          <Column field="name" header="Họ và tên" />
          <Column field="email" header="Email" />
          <Column field="date" header="Ngày tạo" />
          <Column field="lastUpdate" header="Cập nhật lần cuối" />
          <Column body={setBodyStatus} header="Trạng thái" />
          <Column body={actionBodyTemplate} header="Thao tác" />
        </DataTable>
      </div>
      <OverlayPanel ref={op}>
        {selectedUser && (
          <div className="flex flex-column gap-2">
            <div className="flex flex-row gap-2">
              <Button
                icon="pi pi-pencil"
                label="Sửa"
                className="w-7rem"
                // onClick={handleEdit()}
              />
              <Button
                icon={selectedUser.status ? "pi pi-lock" : "pi pi-lock-open"}
                label={selectedUser.status ? "Khóa" : "Mở"}
                className="w-7rem"
                severity="warning"
                onClick={handleLock}
              />
            </div>
            <div className="flex flex-row gap-2">
              <Button
                icon="pi pi-refresh"
                label="Reset"
                className="w-7rem"
                severity="success"
                // onClick={handleReset()}
              />
              <Button
                icon="pi pi-trash"
                label="Xóa"
                className="w-7rem"
                severity="danger"
                onClick={() => setVisibleDialogDelete(true)}
              />
            </div>
          </div>
        )}
      </OverlayPanel>
      <Dialog
        header={
          <div className="flex justify-content-center">
            <Avatar image={logo} shape="circle" size="xlarge" />
          </div>
        }
        visible={visibleDialogDelete}
        onHide={() => setVisibleDialogDelete(false)}
        className="w-11 md:w-6 lg:w-4"
      >
        <div className="mb-5 font-bold text-center text-xl">
          Bạn chắc chắn muốn xóa người dùng {selectedUser?.name} chứ?
        </div>
        <div className="flex flex-row justify-content-center gap-5">
          <Button label="Có" onClick={handleDelete} />
          <Button
            label="Không"
            severity="secondary"
            onClick={() => setVisibleDialogDelete(false)}
            outlined
          />
        </div>
      </Dialog>
    </div>
  );
};

export default SystemManager;
