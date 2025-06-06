// mainchange1.js

// JSON 資料
const siteData = {
  headerTitle: "靜態網頁設計"
};

// 使用 JavaScript 修改 header 的文字
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("site-title").textContent = siteData.headerTitle;
});
