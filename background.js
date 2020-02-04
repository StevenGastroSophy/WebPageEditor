const downloadEvent = (url, filename) => {
  chrome.downloads.download({
    url: url,
    filename: filename,
    saveAs: false,
  });
};

const onMessage = (message) => {
	switch (message.action) {
    case 'DOWNLOAD_BACKGROUND':
			downloadEvent(message.url, message.filename);
			break;
    default:
      break;
  }
}

chrome.runtime.onMessage.addListener(onMessage);
