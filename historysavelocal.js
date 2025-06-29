// 取得目前頁面 URL
const currentPage = window.location.href;

// 取得目前時間
const currentTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Taipei' }).replace(' ', 'T');

// 儲存到 localStorage
localStorage.setItem('lastVisitedPage', currentPage);
localStorage.setItem('lastVisitedTime', currentTime);

// 檢查儲存結果（可選）
console.log('儲存的頁面:', localStorage.getItem('lastVisitedPage'));
console.log('儲存的時間:', localStorage.getItem('lastVisitedTime'));
