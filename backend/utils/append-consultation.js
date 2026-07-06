const sheets = require("../configs/google-sheet");
require("dotenv");

async function appendConsultation(data) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Trang tính1!A:E",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          new Date().toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
          }),
          data.name,
          data.phone,
          data.note || "",
          data.message || "",
        ],
      ],
    },
  });
}

module.exports = appendConsultation;
