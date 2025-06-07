// 定位按鈕與內容區塊
const contentSection = document.querySelector('.content');
const loadButton = document.getElementById('loadButton');

// 按下按鈕時載入 JSON 並更新內容
loadButton.addEventListener('click', () => {
  fetch('changedata1.json')
    .then(response => response.json())
    .then(data => {
      contentSection.innerHTML = ''; // 清空舊資料

      data.web_applications.forEach(category => {
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = `📁 ${category.category}`;
        contentSection.appendChild(categoryTitle);

        category.examples.forEach(app => {
          const appBlock = document.createElement('div');
          appBlock.classList.add('app-block');

          const name = document.createElement('h3');
          name.textContent = `🔹 ${app.name}`;
          appBlock.appendChild(name);

          const features = document.createElement('ul');
          app.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            features.appendChild(li);
          });
          appBlock.appendChild(features);

          const exampleSites = document.createElement('p');
          exampleSites.innerHTML = `📍範例：<strong>${app.examples.join(', ')}</strong>`;
          appBlock.appendChild(exampleSites);

          contentSection.appendChild(appBlock);
        });
      });
    })
    .catch(error => {
      console.error('讀取失敗：', error);
      contentSection.innerHTML = '<p style="color:red;">載入資料時發生錯誤。</p>';
    });
});
