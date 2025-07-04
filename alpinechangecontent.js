function mainContentHandler() {
  return {
    mainTitle: '主要內容',
    mainText: '這裡是主內容區。',
    isAnimating: false,

    updateContent(newTitle, newText) {
      this.isAnimating = true; // 開始淡出
      setTimeout(() => {
        this.mainTitle = newTitle;
        this.mainText = newText;
        this.isAnimating = false; // 淡入
      }, 500); // 要跟 CSS transition duration 同步
    },

    loadJsonContent() {
      const jsonData = {
        title: '從 JSON 載入的標題',
        text: '這是從 JSON 模擬資料載入的內容。'
      };
      this.updateContent(jsonData.title, jsonData.text);
    },

    loadWeatherAPI() {
      this.updateContent('載入天氣資料中...', '');
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=25.038&longitude=121.5645&current=temperature_2m,weather_code';

      fetch(url)
        .then(res => res.json())
        .then(data => {
          const temp = data.current.temperature_2m;
          const code = data.current.weather_code;
          this.updateContent('台北即時天氣', `氣溫：${temp}°C，天氣代碼：${code}`);
        })
        .catch(err => {
          this.updateContent('載入失敗', err.message);
        });
    },

    drawChart() {
      this.updateContent('圖表區', '圖表將顯示於此（可結合 Chart.js）。');
      // 這邊你可以放 Chart.js 的繪圖程式碼
    }
  };
}
