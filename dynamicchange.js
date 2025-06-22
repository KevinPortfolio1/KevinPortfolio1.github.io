document.addEventListener("DOMContentLoaded", () => {
  const twoSumBtn = document.getElementById("load-two-sum");

  twoSumBtn.addEventListener("click", async () => {
    try {
      const res = await fetch('leetocdequestion.json');
      if (!res.ok) throw new Error("無法載入資料");
      const data = await res.json();

      const container = document.getElementById("leetcode-content");

      const html = `
        <h1 class="text-center mb-4">${data.title}</h1>
        <div class="mb-4">
          <h3>題目說明</h3>
          <p>${data.description.zh}</p>
        </div>

        <div class="mb-4">
          <h3>範例</h3>
          ${data.examples.map(ex => `
            <pre><code>
輸入: ${ex.input}
輸出: ${ex.output}
${ex.explanation_zh ? "說明: " + ex.explanation_zh : ""}
            </code></pre>
          `).join('')}
        </div>

        <div class="mb-4">
          <h3>約束條件</h3>
          <ul>
            ${data.constraints.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>

        <div class="mb-4">
          <h3>延伸問題</h3>
          <p>${data.followUp.zh}</p>
        </div>

        <div class="mb-4">
          <h3>解法</h3>
          ${data.solutions.map(sol => `
            <h5>${sol.type} 解法 - ${sol.language}</h5>
            <pre><code>${sol.code}</code></pre>
            ${sol.steps ? `<strong>步驟:</strong><ul>${sol.steps.map(step => `<li>${step}</li>`).join('')}</ul>` : ''}
            <p><strong>時間複雜度:</strong> ${sol.timeComplexity}, <strong>記憶體複雜度:</strong> ${sol.spaceComplexity}</p>
            ${sol.explanation ? `<p><em>說明:</em> ${sol.explanation}</p>` : ''}
          `).join('')}
        </div>
      `;

      container.innerHTML = html;

    } catch (error) {
      console.error("載入 JSON 發生錯誤:", error);
    }
  });
});
