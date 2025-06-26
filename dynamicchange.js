let problemsData = null;  // 全域變數存放 json 內容

// 頁面載入時，先 fetch JSON 檔案
fetch('merged.json')
  .then(response => response.json())
  .then(data => {
    problemsData = data.problems; // 取出 problems 陣列
  })
  .catch(err => console.error('Error loading JSON:', err));

// 點擊事件設定
document.querySelectorAll('.sidebar a').forEach(p => {
  p.addEventListener('click', () => {
    const dateId = p.id; // 取得被點擊的 p 的 id (日期)
    if (!problemsData) {
      alert('問題資料尚未載入完成，請稍後再試');
      return;
    }

    // 從陣列中找到對應日期的題目物件
    const problem = problemsData.find(item => item.date === dateId);

    if (problem) {
      let html = `
        <h3>${problem.title}</h3>
        <h4>Description</h4>
        <p><strong>English:</strong> ${problem.description.en || ''}</p>
        <p><strong>中文說明:</strong> ${problem.description.zh || ''}</p>
      `;

      // Constraints 限制條件
      if (problem.constraints) {
        html += `<h4>Constraints</h4>`;
        if (Array.isArray(problem.constraints)) {
          html += '<ul>';
          problem.constraints.forEach(c => {
            html += `<li>${c}</li>`;
          });
          html += '</ul>';
        } else {
          html += `<p>${problem.constraints}</p>`;
        }
      }

      // Follow-up
      if (problem.followUp) {
        html += `<h4>Follow-up</h4>`;
        if (typeof problem.followUp === 'object') {
          html += `<p><strong>English:</strong> ${problem.followUp.en || ''}</p>`;
          html += `<p><strong>中文:</strong> ${problem.followUp.zh || ''}</p>`;
        } else {
          html += `<p>${problem.followUp}</p>`;
        }
      } else if (problem.follow_up_en || problem.follow_up_zh) {
        html += `<h4>Follow-up</h4>`;
        if (problem.follow_up_en) html += `<p><strong>English:</strong> ${problem.follow_up_en}</p>`;
        if (problem.follow_up_zh) html += `<p><strong>中文:</strong> ${problem.follow_up_zh}</p>`;
      }

      // Examples 範例
      if (problem.examples && problem.examples.length) {
        html += `<h4>Examples</h4><ul>`;
        problem.examples.forEach(ex => {
          html += `<li>
            <p><strong>Input:</strong> ${ex.input || ''}</p>
            <p><strong>Output:</strong> ${ex.output || ''}</p>
            <p><strong>Explanation (en):</strong> ${ex.explanation_en || ''}</p>
            <p><strong>說明 (中):</strong> ${ex.explanation_zh || ''}</p>
          </li>`;
        });
        html += '</ul>';
      }

      // Solutions 解法
      if (problem.solutions && problem.solutions.length) {
        html += `<h4>Solutions</h4>`;
        problem.solutions.forEach(sol => {
          html += `
            <div style="border:1px solid #ccc; margin-bottom:10px; padding:10px;">
              <h5>${sol.type} (${sol.language})</h5>
              <pre style="background:#f5f5f5; padding:10px; overflow-x:auto;">${sol.code}</pre>
              ${sol.explanation ? `<p><strong>Explanation:</strong> ${sol.explanation}</p>` : ''}
              ${sol.explanation_zh ? `<p><strong>說明 (中):</strong> ${sol.explanation_zh}</p>` : ''}
              <p><strong>Time Complexity:</strong> ${sol.timeComplexity || sol.time_complexity || ''}</p>
              <p><strong>Space Complexity:</strong> ${sol.spaceComplexity || sol.space_complexity || ''}</p>
            </div>
          `;
        });
      }

      document.getElementById('leetcode-content').innerHTML = html;
    } else {
      document.getElementById('leetcode-content').innerHTML = '<p>找不到對應題目資料</p>';
    }
  });
});