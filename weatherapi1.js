// weatherapi1.js
document.getElementById('weatherapi').addEventListener('click', async () => {
  const contentSection = document.querySelector('.content');

  try {
    // 範例：呼叫公開的免費天氣 API (Open-Meteo)
    // 這裡用台北座標示範（latitude: 25.033, longitude: 121.565）
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=25.033&longitude=121.565&current_weather=true');
    if (!response.ok) throw new Error('天氣資料取得失敗');
    
    const data = await response.json();

    // 取出當前天氣溫度跟風速
    const temperature = data.current_weather.temperature;
    const windspeed = data.current_weather.windspeed;

    // 更新內容區域
    contentSection.innerHTML = `
      <h2>台北目前天氣</h2>
      <p>溫度: ${temperature}°C</p>
      <p>風速: ${windspeed} 公里/小時</p>
    `;
  } catch (error) {
    contentSection.innerHTML = `<p>載入天氣資料時發生錯誤：${error.message}</p>`;
  }
});
