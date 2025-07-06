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

  // 建立星期標題格子（直接加到 grid）
  weekDays.forEach(day => {
    const cell = document.createElement("div");
    cell.textContent = day;
    cell.style.fontWeight = "bold";
    cell.style.color = "#6c757d"; // Bootstrap 的 text-secondary 顏色
    calendarGrid.appendChild(cell);
  });

  // 補空格
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.textContent = "";
    calendarGrid.appendChild(emptyCell);
  }

  // 日期格子
  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("div");
    cell.textContent = day;

    // 加入 today 樣式
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add("today");
    }

    // 點擊事件 - 更新倒數時間
    cell.addEventListener("click", () => {
      const targetDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00`;
      const countdownComponent = document.querySelector('#countdown');
      const alpineData = countdownComponent.__x?.$data;

		   if (alpineData) {
			// 1. 更新目標時間
			if (typeof alpineData.updateTarget === 'function') {
			  alpineData.updateTarget(targetDate);
			}

			// 2. 重新啟動倒數（確保計時器重啟）
			if (typeof alpineData.startCountdown === 'function') {
			  alpineData.startCountdown();  // 👈 手動重啟
			}
		  }
    });

    calendarGrid.appendChild(cell);
  }
});
