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
      const mainNum = `${mainIndex}`; // "1", "2"...
      const mainFilename = `index${mainNum}.html`;

      // メイン番号のNGチェック
      if (!ngPages.includes(mainNum)) {
        const mainUrl = `${baseUrl}${mainFilename}`;
        const mainTitle = await fetchTitle(mainUrl);

        if (!mainTitle) break;
        allFoundLinks.push({ url: mainUrl, title: mainTitle });
      } else {
        // NGリストに入っていても、その先に枝番があるかもしれないので
        // 存在確認だけはして、ループを止めるか続行するか判断します
        const checkExists = await fetchTitle(`${baseUrl}${mainFilename}`);
        if (!checkExists) break;
      }

      // 2. 枝番 (indexN-M.html) の探索
      let subIndex = 1;
      while (true) {
        const subNum = `${mainIndex}-${subIndex}`; // "1-1", "1-2"...
        const subFilename = `index${subNum}.html`;

        // 枝番のNGチェック
        if (!ngPages.includes(subNum)) {
          const subUrl = `${baseUrl}${subFilename}`;
          const subTitle = await fetchTitle(subUrl);
          if (!subTitle) break;
          allFoundLinks.push({ url: subUrl, title: subTitle });
        } else {
          // NGの場合もファイルが存在するかだけ確認（次の枝番があるかもしれないので）
          const checkExists = await fetchTitle(`${baseUrl}${subFilename}`);
          if (!checkExists) break;
        }
        subIndex++;
      }

      mainIndex++;
      setLinks([...allFoundLinks]);
    }
    setIsScanning(false);
  };

  const fetchTitle = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      const text = await response.text();
      const doc = new DOMParser().parseFromString(text, "text/html");
      return doc.querySelector("title")?.innerText || "タイトルなし";
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
            <div className="d-flex w-100 justify-content-between">
              <h6 className="mb-1">{link.title}</h6>
            </div>
            <small className="text-muted">{link.url.split("/").pop()}</small>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinkExplorer;
