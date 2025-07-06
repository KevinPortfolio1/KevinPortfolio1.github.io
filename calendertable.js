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
  let weekRow = document.createElement("div");
  weekRow.className = "row text-center";

  weekDays.forEach(day => {
    const cell = document.createElement("div");
    cell.className = "col fw-bold text-secondary";
    cell.textContent = day;
    weekRow.appendChild(cell);
  });

  calendarGrid.appendChild(weekRow);

  // 填入空白格子 + 日期格子
  let currentRow = document.createElement("div");
  currentRow.className = "row text-center";

  // 空白格子
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "col p-2";
    currentRow.appendChild(emptyCell);
  }

  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("div");
    cell.className = "col p-2 bg-light rounded border";
    cell.textContent = day;

    // 高亮今天
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      cell.classList.add("bg-primary", "text-white", "fw-bold");
    }

    cell.addEventListener("click", () => {
      const targetDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00`;
      const countdownComponent = document.querySelector('#countdown');
      const alpineData = countdownComponent.__x?.$data;

      if (alpineData && typeof alpineData.updateTarget === 'function') {
        alpineData.updateTarget(targetDate);
      }
    });

    currentRow.appendChild(cell);

    // 每 7 個格子換一行
    if ((firstDay + day) % 7 === 0 || day === totalDays) {
      calendarGrid.appendChild(currentRow);
      currentRow = document.createElement("div");
      currentRow.className = "row text-center";
    }
  }
});
