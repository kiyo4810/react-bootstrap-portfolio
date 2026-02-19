import React, { useState } from "react";

const LinkExplorer = () => {
  const [links, setLinks] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  // 🚫 ここに除外したい番号を文字列で追加してください
  // index10.html なら "10"、index10-1.html なら "10-1" と書きます
  const ngPages = ["19", "10", "10-1"];

  const baseUrl = "https://kiyo4810.github.io/autocal/html_ver/";

  const scanLinks = async () => {
    setIsScanning(true);
    let allFoundLinks = [];
    let mainIndex = 1;

    while (true) {
      const mainNum = `${mainIndex}`;
      const mainFilename = `index${mainNum}.html`;

      if (!ngPages.includes(mainNum)) {
        const mainUrl = `${baseUrl}${mainFilename}`;
        // 改修ポイント：戻り値をオブジェクトに変更
        const pageData = await fetchPageData(mainUrl);

        if (!pageData) break;
        allFoundLinks.push({ url: mainUrl, ...pageData });
      } else {
        const checkExists = await fetchPageData(`${baseUrl}${mainFilename}`);
        if (!checkExists) break;
      }

      let subIndex = 1;
      while (true) {
        const subNum = `${mainIndex}-${subIndex}`;
        const subUrl = `${baseUrl}index${subNum}.html`;
        const subData = await fetchPageData(subUrl);

        if (!subData) break;

        if (!ngPages.includes(subNum)) {
          allFoundLinks.push({ url: subUrl, ...subData });
        }
        subIndex++;
      }
      mainIndex++;
      setLinks([...allFoundLinks]);
    }
    setIsScanning(false);
  };

  // 関数名を fetchPageData に変更して日付も取るように
  const fetchPageData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) return null;

      // --- 📅 改修ポイント：GitHub APIからコミット日時を取得 ---
      // 例: https://kiyo4810.github.io/autocal/html_ver/index1.html
      // から GitHubのリポジトリパスを取得してAPIを叩きます
      const fileName = url.split("/").pop();
      const apiTarget = `https://api.github.com/repos/kiyo4810/autocal/commits?path=html_ver/${fileName}&page=1&per_page=1`;

      let dateStr = "不明";
      try {
        const apiRes = await fetch(apiTarget);
        if (apiRes.ok) {
          const commits = await apiRes.json();
          if (commits.length > 0) {
            // 最新のコミット日時を取得
            const commitDate = commits[0].commit.committer.date;
            dateStr = new Date(commitDate).toLocaleDateString();
          }
        }
      } catch (e) {
        console.error("GitHub API Error:", e);
      }
      // ---------------------------------------------------

      const text = await response.text();
      const doc = new DOMParser().parseFromString(text, "text/html");
      const title = doc.querySelector("title")?.innerText || "タイトルなし";

      return { title, date: dateStr };
    } catch {
      return null;
    }
  };

  return (
    <div className="mt-5 p-4 border rounded bg-white shadow-sm text-start">
      <h2 className="h4 mb-4 text-center">🔗 自動生成リンク集</h2>
      <div className="text-center">
        <button onClick={scanLinks} disabled={isScanning} className="btn btn-outline-primary mb-3">
          {isScanning ? "探索中..." : "リンクを読み込む"}
        </button>
      </div>

      <div className="list-group">
        {links.map((link, idx) => (
          <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="list-group-item list-group-item-action mb-2 shadow-sm rounded">
            <div className="d-flex w-100 justify-content-between align-items-center">
              <h6 className="mb-1">{link.title}</h6>
              {/* 🕒 日付を表示 */}
              <span className="badge bg-secondary-subtle text-secondary fw-normal">更新: {link.date}</span>
            </div>
            <small className="text-muted">{link.url.split("/").pop()}</small>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinkExplorer;
