
  /*
    slides：抓取包含所有圖片的 .slides 容器。
	totalSlides：計算有幾張輪播圖片（即 .slide 元素個數）。
    dotsContainer：底下顯示點點（導航小圓點）的容器。
    currentIndex：目前正在顯示的圖片索引，預設是第 0 張（第一張圖）。
  
  */

  const slides = document.getElementById('slides');
  const totalSlides = slides.children.length;
  const dotsContainer = document.getElementById('dots');
  let currentIndex = 0;
  
  /*
    用迴圈建立與圖片數相等的點點。
	每個點點是 <span>，加上 dot class。
	第一個點加上 active class（表示當前圖片）。
	為每個點點加上點擊事件 → 點一下可跳轉到該張圖（透過 goToSlide(i)）。
  */

  // 建立點點
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  /*
    透過 transform: translateX() 讓圖片橫向滑動。
    例如 currentIndex = 1，則滑動 -100%，顯示第 2 張圖。
    更新底下點點的狀態，只讓當前那一個有 active 樣式。
  */
  function updateSlidePosition() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  //nextSlide()：把 currentIndex 加 1，如果超過最後一張就回到第一張（用 % 做循環）。
  //prevSlide()：把 currentIndex 減 1，如果小於 0 就跳回最後一張。

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
  }
   //goToSlide(index)：用在點點被點選的時候，直接顯示對應圖片。
  function goToSlide(index) {
    currentIndex = index;
    updateSlidePosition();
  }

  //
  //每 5 秒呼叫一次 nextSlide()，自動切換到下一張圖片。
  setInterval(nextSlide, 5000);
