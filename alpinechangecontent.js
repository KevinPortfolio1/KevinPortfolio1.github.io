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

    // 你可以把 loadWeatherAPI() 也整合進來
    loadWeatherAPI() {
      // 假設這是抓 API 更新內容的函式
      this.updateContent('新的標題', 'API 載入的新內容');
    }
  }
}
