document.getElementById('updateContentBtn').addEventListener('click', () => {
  // JSON 資料
  const jsonData = {
    title: "更新後的標題",
    content: "這是從 JSON 載入的新主內容(2025/06/06 今天更改網頁)"
  };

  // 取得主要內容區塊
  const contentSection = document.querySelector('.content');

  // 更新內容
  contentSection.innerHTML = `
    <h2>${jsonData.title}</h2>
    <p>${jsonData.content}</p>
  `;
});
