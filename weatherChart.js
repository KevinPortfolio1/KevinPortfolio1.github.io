function drawWeatherChart() {
  // 確認 content 區塊存在
  const contentSection = document.querySelector('.content');

  // 如果已經有 canvas，就不再新增
  if (!document.getElementById('weatherChart')) {
    const canvas = document.createElement('canvas');
    canvas.id = 'weatherChart';
    canvas.width = 600;
    canvas.height = 400;
    contentSection.appendChild(canvas); // 加入 canvas 到內容區塊
  }

  const ctx = document.getElementById('weatherChart').getContext('2d');

  const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=25.0330&longitude=121.5654&daily=temperature_2m_max&temperature_unit=celsius&timezone=Asia/Taipei';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const dates = data.daily.time;
      const temps = data.daily.temperature_2m_max;

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: '台北日間最高溫 (°C)',
            data: temps,
            borderColor: 'orange',
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          scales: {
            x: { title: { display: true, text: '日期' } },
            y: { title: { display: true, text: '溫度 (°C)' } }
          }
        }
      });
    })
    .catch(error => console.error('載入天氣資料錯誤:', error));
}

// 綁定drawWeather按鈕點擊事件
document.getElementById('drawWeather').addEventListener('click', drawWeatherChart);
