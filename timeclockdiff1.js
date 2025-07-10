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

    // 初始化日曆資料
    initCalendar() {
      const firstDay = new Date(this.year, this.month, 1).getDay();
      const totalDays = new Date(this.year, this.month + 1, 0).getDate();

      // ✅ 修正這行：確保 emptyDays 為 [0, 1, 2,...]
      this.emptyDays = Array.from({ length: firstDay }, (_, i) => i);
      this.daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);

      // 如果目前是本月，則自動選取今天
      const today = new Date();
      if (this.year === today.getFullYear() && this.month === today.getMonth()) {
        this.selectedDay = today.getDate();
      }
    },

    // 上一個月
    prevMonth() {
      if (this.month === 0) {
        this.month = 11;
        this.year--;
      } else {
        this.month--;
      }
      this.initCalendar();
    },

    // 下一個月
    nextMonth() {
      if (this.month === 11) {
        this.month = 0;
        this.year++;
      } else {
        this.month++;
      }
      this.initCalendar();
    },

    // 判斷是否為今天
    isToday(day) {
      const today = new Date();
      return day === today.getDate() &&
             this.month === today.getMonth() &&
             this.year === today.getFullYear();
    },

    // 判斷是否為選取的日期
    isSelected(day) {
      return this.selectedDay === day;
    },

    // 點選日期後變更倒數目標
    onDateClick(day) {
      this.selectedDay = day;
      const dateStr = `${this.year}-${String(this.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      this.selectedDateString = dateStr;
      this.targetDate = new Date(`${dateStr}T00:00:00`);
    },

    // 啟動倒數
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

    // 儲存紀錄到 localStorage
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

    // 載入紀錄
    loadRecords() {
      const data = localStorage.getItem('records');
      this.records = data ? JSON.parse(data) : [];
    },

    // 刪除指定紀錄
    deleteRecord(index) {
      this.records.splice(index, 1);
      localStorage.setItem('records', JSON.stringify(this.records));
    }
  };
}
