 // 檢查 cookie 是否存在
    function getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length);
        }
      }
      return null;
    }

    // 設定 cookie（如果不存在才設定）
    function setCookieIfNotExists(name, value, days) {
      if (!getCookie(name)) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = `${name}=${value};${expires};path=/`;
        console.log(`已設定 cookie：${name}=${value}`);
      } else {
        console.log(`cookie 已存在：${name}=${getCookie(name)}`);
      }
    }

    // 執行：例如檢查 'object name' 是否存在
    setCookieIfNotExists("user", "Person", 7);