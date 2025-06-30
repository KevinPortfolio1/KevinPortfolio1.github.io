function countdownTimer(targetTimeString) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false,
      targetTime: new Date(targetTimeString).getTime(),

      startCountdown() {
        this.updateCountdown(); // 初始化馬上跑一次
        setInterval(() => this.updateCountdown(), 1000);
      },

      updateCountdown() {
        const now = new Date().getTime();
        const distance = this.targetTime - now;

        if (distance <= 0) {
          this.expired = true;
          this.days = this.hours = this.minutes = this.seconds = 0;
          return;
        }

        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
    };
  }