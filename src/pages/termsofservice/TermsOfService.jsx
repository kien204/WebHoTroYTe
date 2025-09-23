import React from "react";
import { ScrollPanel } from "primereact/scrollpanel";

const TermsOfService = () => {
  return (
    <div className="flex justify-content-center p-4 bg-main3">
      <div className="w-full md:w-8 lg:w-6 border-1 surface-border border-round-2xl shadow-2 p-4 bg-white">
        <h2 className="text-center mb-4">ĐIỀU KHOẢN DỊCH VỤ</h2>

          <h3>
            ỨNG DỤNG THÔNG MINH HỖ TRỢ TRA CỨU, THEO DÕI VÀ QUẢN LÝ SỨC KHỎE
          </h3>
          <p>
            Khi đăng ký tài khoản và sử dụng hệ thống, bạn đồng ý tuân thủ đầy
            đủ các điều khoản sau:
          </p>

          <h4>1. Quy định chung</h4>
          <p>
            Ứng dụng hỗ trợ người dùng tra cứu thông tin y tế, quản lý hồ sơ sức
            khỏe, theo dõi và cảnh báo tình trạng sức khỏe.
          </p>
          <p>
            Đây không phải là hệ thống thay thế chẩn đoán hoặc điều trị. Người
            dùng cần đến cơ sở y tế khi có vấn đề nghiêm trọng.
          </p>

          <h4>2. Quyền và nghĩa vụ của người dùng</h4>
          <h5>2.1. Khách thăm (chưa đăng nhập)</h5>
          <ul className="list-disc ml-4">
            <li>Tra cứu, đặt tối đa 05 câu hỏi y tế.</li>
            <li>Không được lưu trữ dữ liệu trò chuyện, hồ sơ sức khỏe.</li>
            <li>Cần đăng ký để dùng đầy đủ tính năng.</li>
          </ul>

          <h5>2.2. Người dùng đã đăng nhập</h5>
          <ul className="list-disc ml-4">
            <li>Tra cứu & Hỏi đáp y tế với dữ liệu được lưu trữ.</li>
            <li>Quản lý hồ sơ sức khỏe điện tử (EHR).</li>
            <li>Theo dõi chỉ số sức khỏe hằng ngày.</li>
            <li>Nhắc nhở thông minh (triển khai sau).</li>
            <li>Cập nhật thông tin & kiến thức y tế.</li>
          </ul>

          <h4>3. Quyền và nghĩa vụ của hệ thống</h4>
          <p>
            Bảo mật thông tin người dùng, cung cấp dữ liệu từ nguồn uy tín, có
            quyền tạm ngừng tài khoản khi phát hiện vi phạm.
          </p>

          <h4>4. Trách nhiệm pháp lý</h4>
          <p>
            Người dùng chịu trách nhiệm về thông tin cung cấp. Hệ thống không
            chịu trách nhiệm khi người dùng tự ý áp dụng thông tin mà không hỏi
            ý kiến bác sĩ.
          </p>

          <h4>5. Điều khoản bổ sung</h4>
          <p>
            Một số tính năng sẽ triển khai sau. Điều khoản có thể thay đổi,
            người dùng cần theo dõi cập nhật.
          </p>
      </div>
    </div>
  );
};

export default TermsOfService;
