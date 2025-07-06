function countdownTimer(targetTimeString) {
  return {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
    targetTime: new Date(targetTimeString).getTime(),
    intervalId: null,  // 👉 新增 interval 儲存

    updateTarget(newTarget) {
      this.targetTime = new Date(newTarget).getTime();
      this.expired = false;
    },

    startCountdown() {
      this.updateCountdown(); // 馬上執行一次

      // 👉 清除先前的計時器
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      // 👉 記錄新的 interval
      this.intervalId = setInterval(() => this.updateCountdown(), 1000);
    },

    updateCountdown() {
      const now = new Date().getTime();
      const distance = this.targetTime - now;

      if (distance <= 0) {
        this.expired = true;
        this.days = this.hours = this.minutes = this.seconds = 0;
        clearInterval(this.intervalId);  // 👉 結束後關閉
        return;
      }

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }
  };
}
