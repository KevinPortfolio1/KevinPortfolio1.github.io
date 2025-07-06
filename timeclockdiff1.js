function countdownTimer(initialTarget) {
  return {
    // 倒數邏輯
    targetTime: new Date(initialTarget).getTime(),
    intervalId: null,
    expired: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,

    // 日曆邏輯
    year: null,
    month: null,
    daysInMonth: [],
    emptyDays: [],
    weekDays: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"],

    // 初始化日曆（取得當月天數與空白格）
    initCalendar() {
      const today = new Date();
      this.year = today.getFullYear();
      this.month = today.getMonth();
      this.generateCalendar();
    },

    generateCalendar() {
      const firstDay = new Date(this.year, this.month, 1).getDay();
      this.emptyDays = Array.from({ length: firstDay }, (_, i) => i + 1);

      const totalDays = new Date(this.year, this.month + 1, 0).getDate();
      this.daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
    },

    // 檢查是否為今天
    isToday(day) {
      const today = new Date();
      return day === today.getDate() &&
             this.month === today.getMonth() &&
             this.year === today.getFullYear();
    },

    // 點擊日期 → 更新倒數目標
    onDateClick(day) {
      if (!day) return;
      const newTarget = `${this.year}-${String(this.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00`;
      this.updateTarget(newTarget);
      this.startCountdown();
    },

    // 更新倒數目標
    updateTarget(newTarget) {
      this.targetTime = new Date(newTarget).getTime();
      this.expired = false;
    },

    // 啟動倒數
    startCountdown() {
      this.updateCountdown();
      if (this.intervalId) clearInterval(this.intervalId);
      this.intervalId = setInterval(() => this.updateCountdown(), 1000);
    },

    // 更新倒數時間
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

    // ⬅️ 上一個月
    prevMonth() {
      if (this.month === 0) {
        this.month = 11;
        this.year -= 1;
      } else {
        this.month -= 1;
      }
      this.generateCalendar();
    },

    // ➡️ 下一個月
    nextMonth() {
      if (this.month === 11) {
        this.month = 0;
        this.year += 1;
      } else {
        this.month += 1;
      }
      this.generateCalendar();
    }
  };
}
