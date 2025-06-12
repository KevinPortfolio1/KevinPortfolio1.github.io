function mainContentHandler() {
  return {
    mainTitle: '主要內容',
    mainText: '這裡是主內容區。',

    updateContent() {
      this.mainTitle = '已更新的主標題';
      this.mainText = '這是透過 Alpine.js 更新的內容。';
    },

    loadJsonContent() {
      const jsonData = {
        title: '從 JSON 載入的標題',
        text: '這是從 JSON 模擬資料載入的內容。'
      };
      this.mainTitle = jsonData.title;
      this.mainText = jsonData.text;
    },

    loadWeatherAPI() {
      this.mainTitle = '載入天氣資料中...';
	  const url = 'https://api.open-meteo.com/v1/forecast?latitude=25.038&longitude=121.5645&current=temperature_2m,weather_code';

      fetch(url)
        .then(res => res.json())
        .then(data => {
          const temp = data.current.temperature_2m;
		  const code = data.current.weather_code;
		  this.mainTitle = '台北即時天氣';
		  this.mainText = `氣溫：${temp}°C，天氣代碼：${code}`;
        })
        .catch(err => {
          this.mainTitle = '載入失敗';
          this.mainText = err.message;
        });
    },

    drawChart() {
      this.mainTitle = '圖表區';
      this.mainText = '圖表將顯示於此（可結合 Chart.js）。';
    }
  };
}