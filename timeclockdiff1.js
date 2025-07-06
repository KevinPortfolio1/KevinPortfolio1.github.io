
        this.daysInMonth = [];
        for(let d = 1; d <= totalDays; d++) {
          this.daysInMonth.push(d);
        }
      },

      // 判斷是否為今天
      isToday(day) {
        if (!day) return false;
        const today = new Date();
        return day === today.getDate() &&
               this.month === today.getMonth() &&
               this.year === today.getFullYear();
      },

      // 點擊日曆日期，更新目標時間
      onDateClick(day) {
        if (!day) return;
        const newTarget = `${this.year}-${String(this.month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}T00:00:00`;
        this.updateTarget(newTarget);
        this.startCountdown();
      },

      // 更新目標時間
      updateTarget(newTarget) {
        this.targetTime = new Date(newTarget).getTime();
        this.expired = false;
      },

      // 啟動倒數計時
      startCountdown() {
        this.updateCountdown();

        if(this.intervalId) clearInterval(this.intervalId);

        this.intervalId = setInterval(() => this.updateCountdown(), 1000);
      },

      // 更新倒數數值
      updateCountdown() {
        const now = new Date().getTime();
        const distance = this.targetTime - now;

        if(distance <= 0) {
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