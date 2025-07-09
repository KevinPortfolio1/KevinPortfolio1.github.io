function countdownTimer(defaultTarget) {
  return {
    // 倒數計時用
    targetDate: new Date(defaultTarget),
    selectedDateString: defaultTarget.slice(0, 10),
    days: 0, hours: 0, minutes: 0, seconds: 0,
    expired: false,

    // 日曆用
    weekDays: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    daysInMonth: [],
    emptyDays: [],
    selectedDay: null,

    // 紀錄用
    dateTime: '',
    textInput: '',
    records: [],

    initCalendar() {
      const firstDay = new Date(this.year, this.month, 1).getDay();
      const totalDays = new Date(this.year, this.month + 1, 0).getDate();
      this.emptyDays = Array.from({ length: firstDay });
      this.daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
    },

    prevMonth() {
      this.month = this.month === 0 ? 11 : this.month - 1;
      if (this.month === 11) this.year--;
      this.initCalendar();
    },

    nextMonth() {
      this.month = this.month === 11 ? 0 : this.month + 1;
      if (this.month === 0) this.year++;
      this.initCalendar();
    },

    isToday(day) {
      const today = new Date();
      return day === today.getDate() && this.month === today.getMonth() && this.year === today.getFullYear();
    },

    isSelected(day) {
      return this.selectedDay === day;
    },

    onDateClick(day) {
      this.selectedDay = day;
      const dateStr = `${this.year}-${String(this.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      this.selectedDateString = dateStr;
      this.targetDate = new Date(`${dateStr}T00:00:00`);
    },

    startCountdown() {
      setInterval(() => {
        const now = new Date();
        const diff = this.targetDate - now;
        if (diff <= 0) {
          this.expired = true;
          this.days = this.hours = this.minutes = this.seconds = 0;
          return;
        }
        this.expired = false;
        this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        this.minutes = Math.floor((diff / (1000 * 60)) % 60);
        this.seconds = Math.floor((diff / 1000) % 60);
      }, 1000);
    },

    saveRecord() {
      if (!this.dateTime || !this.textInput) {
        alert('請填寫完整資訊');
        return;
      }
      this.records.push({
        dateTime: this.dateTime,
        text: this.textInput
      });
      localStorage.setItem('records', JSON.stringify(this.records));
      this.dateTime = '';
      this.textInput = '';
    },

    loadRecords() {
      const data = localStorage.getItem('records');
      this.records = data ? JSON.parse(data) : [];
    },

    deleteRecord(index) {
      this.records.splice(index, 1);
      localStorage.setItem('records', JSON.stringify(this.records));
    }
  };
}
