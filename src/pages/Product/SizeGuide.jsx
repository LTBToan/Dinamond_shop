import React from "react";
import "./sizeguide.css";

const SizeGuide = () => {
  return (
    <div className="size-guide">
      <h1>CÁCH ĐO SIZE - SIZE GUIDE</h1>
      <p>
        Để chọn được size lắc tay vừa vặn, các bạn cần đo size vòng tay của mình
        thật chính xác để khi đeo lắc, vòng không bị quá rộng hay quá chật.
        Trước hết, bạn cần chuẩn bị một thước dây hoặc một mảnh giấy (giấy cắt
        dài và rộng khoảng 1cm).
      </p>
      <h2>Các bước đo size tay:</h2>
      <ol>
        <li>
          Quấn thước dây quanh vòng tay, ngay dưới xương cổ tay, khu vực bạn sẽ
          đeo lắc.
        </li>
        <li>Đánh dấu lại điểm gặp nhau của thước dây.</li>
        <li>
          Dùng thước kẻ đo chiều dài đoạn dây vừa quấn quanh tay, chính là chu
          vi vòng tay của bạn.
        </li>
      </ol>
      <div className="image-container">
        <img src="/path-to-your-image1.png" alt="Step 1 to 3" />
        <img src="/path-to-your-image2.png" alt="Step 4 to 6" />
      </div>
      <h2>SIZE VÒNG CỔ</h2>
      <p>
        Để chọn được kích thước dây chuyền chính xác, bạn nên biết độ dài của
        các loại dây chuyền khác nhau. Dưới đây là bảng quy đổi kích thước dây
        chuyền phổ biến:
      </p>
      <div className="chain-length-guide">
        <img src="/path-to-your-image3.png" alt="Chain Length Guide" />
      </div>
      <table>
        <thead>
          <tr>
            <th>Size vòng cổ (inch)</th>
            <th>Size vòng cổ (cm)</th>
            <th>Độ dài trên cơ thể</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>16"</td>
            <td>40 cm</td>
            <td>Sát cổ</td>
          </tr>
          <tr>
            <td>18"</td>
            <td>45 cm</td>
            <td>Chạm xương đòn</td>
          </tr>
          <tr>
            <td>20"</td>
            <td>50 cm</td>
            <td>Trên ngực</td>
          </tr>
          <tr>
            <td>24"</td>
            <td>60 cm</td>
            <td>Giữa ngực</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SizeGuide;
