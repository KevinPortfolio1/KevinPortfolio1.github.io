document.addEventListener("DOMContentLoaded", function () {
  const calendarGrid = document.querySelector(".calendar-grid");
  const title = document.getElementById("calendar-title");

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  const monthNames = ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"];
  title.textContent = `${year} 年 ${monthNames[month]}`;

  const firstDay = new Date(year, month, 1).getDay(); // 一個月的第一天是星期幾
  const totalDays = new Date(year, month + 1, 0).getDate(); // 當月總天數

  // 加上星期標題
  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
  weekDays.forEach(day => {
    const cell = document.createElement("div");
    cell.innerHTML = `<strong>${day}</strong>`;
    calendarGrid.appendChild(cell);
  });

  // 空白格子（補足前面不是週日開頭）
  for (let i = 0; i < firstDay; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }

  // 加入每一天
  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("div");
    cell.textContent = day;

    // 如果是今天，高亮
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      cell.classList.add("today");
    }

    calendarGrid.appendChild(cell);
  }
});