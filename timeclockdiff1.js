 function countdownTimer(initialTarget) {
    return {
      targetTime: new Date(initialTarget).getTime(),
      intervalId: null,
      expired: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,

      year: null,
      month: null,
      daysInMonth: [],
      emptyDays: [],
      weekDays: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"],

      initCalendar() {
        const today = new Date();
        this.year = today.getFullYear();
        this.month = today.getMonth();

        // 計算本月第一天是星期幾
        const firstDay = new Date(this.year, this.month, 1).getDay();
        this.emptyDays = Array.from({ length: firstDay }, (_, i) => i + 1);

        // 計算本月有多少天
        const totalDays = new Date(this.year, this.month + 1, 0).getDate();
        this.daysInMonth = [];
        for (let d = 1; d <= totalDays; d++) {
          this.daysInMonth.push(d);
        }
      },

      isToday(day) {
        if (!day) return false;
        const today = new Date();
        return day === today.getDate() &&
               this.month === today.getMonth() &&
               this.year === today.getFullYear();
      },

      onDateClick(day) {
        if (!day) return;
        const newTarget = `${this.year}-${String(this.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00`;
        this.updateTarget(newTarget);
        this.startCountdown();
      },

      updateTarget(newTarget) {
        this.targetTime = new Date(newTarget).getTime();
        this.expired = false;
      },

      startCountdown() {
        this.updateCountdown();
        if (this.intervalId) clearInterval(this.intervalId);
        this.intervalId = setInterval(() => this.updateCountdown(), 1000);
      },

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
      }
    };
  }