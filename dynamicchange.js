<script>
  let problemsData = null;  // 全域變數存放 json 內容

  // 頁面載入時，先 fetch JSON 檔案
  fetch('merged.json')
    .then(response => response.json())
    .then(data => {
      problemsData = data.problems; // 取出 problems 陣列
    })
    .catch(err => console.error('Error loading JSON:', err));

  // 點擊事件設定
  document.querySelectorAll('.sidebar p').forEach(p => {
    p.addEventListener('click', () => {
      const dateId = p.id; // 取得被點擊的 p 的 id (日期)
      if (!problemsData) {
        alert('問題資料尚未載入完成，請稍後再試');
        return;
      }

      // 從陣列中找到對應日期的題目物件
      const problem = problemsData.find(item => item.date === dateId);

      if (problem) {
        // 簡單輸出標題和描述
        let html = `
          <h3>${problem.title}</h3>
          <p>${problem.description.en}</p>
          <h4>Example:</h4>
          <ul>
        `;

        problem.examples.forEach(ex => {
          html += `<li><strong>Input:</strong> ${ex.input}<br>
                   <strong>Output:</strong> ${ex.output}<br>
                   <strong>Explanation:</strong> ${ex.explanation_en || ''}</li>`;
        });

        html += '</ul>';

        document.getElementById('leetcode-content').innerHTML = html;
      } else {
        document.getElementById('leetcode-content').innerHTML = '<p>找不到對應題目資料</p>';
      }
    });
  });
</script>
