document.addEventListener("DOMContentLoaded", function () {
  const calendarGrid = document.querySelector(".calendar-grid");
  const title = document.getElementById("calendar-title");

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  const monthNames = ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"];
  title.textContent = `${year} 年 ${monthNames[month]}`;

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

  // 清空現有格子（避免重複渲染）
  calendarGrid.innerHTML = "";

  // 👉 加入星期標題格子
  weekDays.forEach(day => {
    const cell = document.createElement("div");
    cell.textContent = day;
    cell.style.fontWeight = "bold";
    cell.style.color = "#6c757d";
    cell.style.textAlign = "center";
    calendarGrid.appendChild(cell);
  });

  // 👉 補空格
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.textContent = "";
    calendarGrid.appendChild(emptyCell);
  }

  // 👉 建立日期格子
  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("div");
    cell.textContent = day;
    cell.classList.add("calendar-day");
    cell.style.textAlign = "center";
    cell.style.cursor = "pointer";

    // 加入 today 樣式
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add("today");
      cell.style.fontWeight = "bold";
      cell.style.backgroundColor = "#e9f7ef";
    }

    // 👉 點擊事件 - 更新 Alpine 倒數
    cell.addEventListener("click", () => {
      const targetDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00`;
      
      // 等待 Alpine 初始化完成
      const countdownComponent = document.querySelector('#countdown');

      // 若已初始化則直接執行；否則等待 alpine:initialized 事件
      if (countdownComponent.__x?.$data) {
        const alpineData = countdownComponent.__x.$data;
        alpineData.updateTarget(targetDate);
        alpineData.startCountdown();
      } else {
        document.addEventListener("alpine:initialized", () => {
          const alpineData = countdownComponent.__x?.$data;
          if (alpineData) {
            alpineData.updateTarget(targetDate);
            alpineData.startCountdown();
          } else {
            console.warn("⚠️ Alpine 初始化仍失敗");
          }
        }, { once: true });
      }
    });

    calendarGrid.appendChild(cell);
  }
});
