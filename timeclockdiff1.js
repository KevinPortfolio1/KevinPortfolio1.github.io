function countdownTimer(initialTarget) {
  return {
    // ===== 倒數狀態 =====
    targetTime: new Date(initialTarget).getTime(),
    intervalId: null,
    expired: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,

    // ===== 日曆狀態 =====
    year: null,
    month: null,
    daysInMonth: [],
    emptyDays: [],
    weekDays: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"],

    // ✅ 額外狀態
    selectedDay: null,
    selectedDateString: '',  // ← 新增：選擇日期顯示用

    // ===== 初始化日曆（設定當前年月） =====
    initCalendar() {
      const today = new Date();
      this.year = today.getFullYear();
      this.month = today.getMonth();
      this.generateCalendar();
    },

    // ===== 產生當月日曆資料（空白格 + 日期） =====
    generateCalendar() {
      const firstDay = new Date(this.year, this.month, 1).getDay();
      this.emptyDays = Array.from({ length: firstDay }, (_, i) => i + 1);

      const totalDays = new Date(this.year, this.month + 1, 0).getDate();
      this.daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
    },

    // ===== 判斷是否為今天（加上背景標示） =====
    isToday(day) {
      const today = new Date();
      return day === today.getDate() &&
             this.month === today.getMonth() &&
             this.year === today.getFullYear();
    },

    // ✅ 判斷是否為目前選中的日期
    isSelected(day) {
      return this.selectedDay === day;
    },

    // ===== 點擊日曆上的某天 → 更新倒數目標 + 選中樣式 =====
    onDateClick(day) {
      if (!day) return;
      this.selectedDay = day;

      // 建立選中的日期物件
      const selectedDate = new Date(this.year, this.month, day);
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');

      const newTarget = `${yyyy}-${mm}-${dd}T00:00:00`;
      this.selectedDateString = `${yyyy}/${mm}/${dd}`;

      this.updateTarget(newTarget);
      this.startCountdown();
    },

    // ===== 更新倒數目標時間（新的日期） =====
    updateTarget(newTarget) {
      this.targetTime = new Date(newTarget).getTime();
      this.expired = false;
    },

    // ===== 啟動倒數計時 =====
    startCountdown() {
      this.updateCountdown(); // 立即更新
      if (this.intervalId) clearInterval(this.intervalId);
      this.intervalId = setInterval(() => this.updateCountdown(), 1000);
    },

    // ===== 倒數邏輯計算並更新畫面變數 =====
    updateCountdown() {
      const now = new Date().getTime();
      const distance = this.targetTime - now;

      if (distance <= 0) {
        this.expired = true;
        this.days = this.hours = this.minutes = this.seconds = 0;
        clearInterval(this.intervalId);
        return;
      }

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    },

    // ===== 上一個月切換 =====
    prevMonth() {
      if (this.month === 0) {
        this.month = 11;
        this.year -= 1;
      } else {
        this.month -= 1;
      }
      this.generateCalendar();
      this.selectedDay = null;
      this.selectedDateString = '';
    },

    // ===== 下一個月切換 =====
    nextMonth() {
      if (this.month === 11) {
        this.month = 0;
        this.year += 1;
      } else {
        this.month += 1;
      }
      this.generateCalendar();
      this.selectedDay = null;
      this.selectedDateString = '';
    }
  };
}
