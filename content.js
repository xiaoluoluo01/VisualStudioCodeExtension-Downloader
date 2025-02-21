// // 创建下载按钮
// const downloadButton = document.createElement("a");
// downloadButton.className = "download-btn";
// downloadButton.textContent = `下载插件`;
// downloadButton.target = "_blank";
// downloadButton.style.cssText = `
//   display: inline-block;
//   position: fixed;
//   right: 20px;
//   top: 50%;
//   transform: translateY(-50%);
//   padding: 12px 20px;
//   background-color: #0078d4;
//   color: white;
//   text-decoration: none;
//   border-radius: 8px;
//   font-weight: 600;
//   cursor: pointer;
//   box-shadow: 0 4px 12px rgba(0, 120, 212, 0.3);
//   transition: all 0.3s ease;
//   z-index: 9999;
//   font-size: 14px;
// `;

// downloadButton.onmouseover = () => {
//   downloadButton.style.backgroundColor = '#106ebe';
//   downloadButton.style.transform = 'translateY(-50%) scale(1.05)';
//   downloadButton.style.boxShadow = '0 6px 16px rgba(0, 120, 212, 0.4)';
// };

// downloadButton.onmouseout = () => {
//   downloadButton.style.backgroundColor = '#0078d4';
//   downloadButton.style.transform = 'translateY(-50%) scale(1)';
//   downloadButton.style.boxShadow = '0 4px 12px rgba(0, 120, 212, 0.3)';
// };

// 获取插件下载链接
const getVSIXDownloadUrl = (version) => {
  const urlParams = new URLSearchParams(window.location.search);
  const itemName = urlParams.get("itemName");
  if (!itemName) return null;
  const itemNames = itemName.split(".");
  return `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${itemNames[0]}/vsextensions/${itemNames[1]}/${version}/vspackage`;
};

// 监听安装按钮容器
const observeInstallButton = () => {
  const targetNode = document.body;
  const observer = new MutationObserver((mutations) => {
    const columns = document.querySelectorAll(
      ".version-history-container-column"
    );
    if (columns.length) {
      Array.from(columns).forEach((column) => {
        if (column.innerText.indexOf(".") === -1) return;
        const downloadButton = document.createElement("a");
        downloadButton.className = "download-btn";
        downloadButton.textContent = `下载插件`;
        downloadButton.target = "_blank";
        downloadButton.href = getVSIXDownloadUrl(column.innerText);
        column.nextElementSibling.append(downloadButton);
      });
      observer.disconnect(); 
    }
  });

  observer.observe(targetNode, {
    childList: true,
    subtree: true,
  });
};

observeInstallButton();
