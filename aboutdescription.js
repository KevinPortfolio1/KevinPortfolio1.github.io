fetch('elementway.json')
      .then(response => response.json())
      .then(data => {
        document.getElementById("description").textContent = data["說明"];

        function populateList(id, items, labelKey, valueKey) {
          const list = document.getElementById(id);
          items.forEach(item => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = `${item[labelKey]}：${item[valueKey]}`;
            list.appendChild(li);
          });
        }

        populateList("structure-list", data["結構性元素"], "元素", "說明");
        populateList("content-list", data["內容元素"], "元素", "說明");
        populateList("style-list", data["外觀與樣式"], "項目", "說明");
        populateList("feature-list", data["常見功能或設計元素"], "元素或功能", "說明");
      })
      .catch(error => {
        console.error("載入 JSON 失敗：", error);
      });