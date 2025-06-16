Hướng dẫn điền file .env cho Backend
Để chạy dự án backend đúng cách, bạn cần tạo và điền file .env theo đúng mẫu dưới đây.
1️⃣ Mẫu .env cần điền

# Server

PORT=3000 # Cổng chạy server (mặc định 3000, có thể đổi)

# Frontend

CLIENT_URL=https://minhdental.com # Domain frontend (trỏ vào dự án React đã build)

# Bảo mật

SECRET_KEY=your_secret_key_here # Chuỗi bảo mật (JWT, tự tạo, không chia sẻ)

# Kết nối cơ sở dữ liệu

DB_URL=mongodb+srv://user:pass@cluster.mongodb.net/dbname # Địa chỉ MongoDB

# Môi trường

NODE_ENV=production # Môi trường chạy (thường là 'production')

# Cloudinary (dùng để upload ảnh)

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Gửi email (SMTP)

EMAIL_SERVICE=gmail # Ví dụ: gmail, outlook, mailgun...
EMAIL_HOST=smtp.gmail.com # SMTP host (theo email service)
EMAIL_PORT=465 # SMTP port (gmail: 465 hoặc 587)
EMAIL_SECURE=true # true nếu dùng SSL (465), false nếu 587
EMAIL_USER=your_email@gmail.com # Email dùng để gửi (tài khoản SMTP)
EMAIL_PASSWORD=your_email_password # Mật khẩu ứng dụng của email
EMAIL_FROM_NAME=Minh Dental # Tên người gửi email
EMAIL_FROM_ADDRESS=your_email@gmail.com # Địa chỉ email người gửi

# Thanh toán MOMO (nếu không dùng, để trống toàn bộ)

MOMO_PARTNER_CODE=
MOMO_ACCESS_KEY=
MOMO_SECRET_KEY=
MOMO_ENDPOINT=
MOMO_REDIRECT_URL=
MOMO_IPN_URL=

2️⃣ Ý nghĩa từng biến .env

| Biến           | Ý nghĩa                                       | Ví dụ                                         |
| -------------- | --------------------------------------------- | --------------------------------------------- |
| `PORT`         | Cổng chạy server                              | `3000`                                        |
| `CLIENT_URL`   | Domain frontend (FE)                          | `https://minhdental.com`                      |
| `SECRET_KEY`   | Chuỗi bảo mật (JWT)                           | `minhdental_secret_2024`                      |
| `DB_URL`       | URL kết nối MongoDB                           | `mongodb+srv://...`                           |
| `NODE_ENV`     | Môi trường chạy                               | `production` hoặc `development`               |
| `CLOUDINARY_*` | Thông tin upload ảnh (Cloudinary)             | Lấy từ [Cloudinary](https://cloudinary.com/)  |
| `EMAIL_*`      | Cấu hình gửi email (SMTP)                     | Lấy từ email bạn sử dụng (gmail, outlook,...) |
| `MOMO_*`       | Thông tin tích hợp thanh toán MOMO (nếu dùng) | **Nếu không dùng MOMO, để trống toàn bộ**     |

3️⃣ Lưu ý quan trọng

✅ Phần MOMO:
Không sử dụng thì để trống toàn bộ các biến MOMO\_\*.

Phần Cloudinary và Email:
Lấy thông tin từ trang quản lý Cloudinary hoặc nhà cung cấp email.

✅ File .env cần để ở thư mục gốc backend (nơi có file server.js hoặc index.js).

4️⃣ Sau khi điền .env đầy đủ

1️⃣ Chạy cài đặt dependencies:
npm install
2️⃣ Chạy backend:
npm start
