const loadOptions = (select, elements) => {
	const options = elements.map(el => `<option value="${el.CSS_SELECTOR}">${el.NAME}</option>`);
	select.innerHTML = options.join('');
}

const getSelectedTab = (tab) => {
	const tabId = tab.id;
	const sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
	
	const elementSelector = document.getElementById('elementSelector');

	let currentSelectorString = '';
	let targetSelectorString = '';
	let outputFileName = '';
	chrome.storage.sync.get({
		downloadTarget: 'body',
		outputFileName: 'output.shtml',
    elements: [{
      "NAME": "BODY",
      "CSS_SELECTOR": "body"
    }],
    currentSelectorString: 'body',
  }, (option) => {
		loadOptions(elementSelector, option.elements);
		currentSelectorString = option.currentSelectorString || option.elements[0].CSS_SELECTOR;
		targetSelectorString = option.downloadTarget;
		outputFileName = option.outputFileName;
	});

	document.getElementById('download').addEventListener('click',
		() => {
			const prevSelectorString = currentSelectorString;
			sendMessage({ 
				action: 'DOWNLOAD',
				targetSelectorString: targetSelectorString,
				outputFileName: outputFileName,
				prevSelectorString: prevSelectorString
			});
		}
	);
	
	document.getElementById('applyElementSelecting').addEventListener('click', () => {
		const prevSelectorString = currentSelectorString;
		const selectorString = document.getElementById('elementSelector').value;
		const selectType = document.getElementById('selectType').value;
		currentSelectorString = selectorString;
		chrome.storage.sync.set({
			currentSelectorString: currentSelectorString
		}, () => {
			sendMessage({
				action: 'APPLY_ELEMENT_SELECTING',
				selectType: selectType,
				selectorString: selectorString,
				prevSelectorString: prevSelectorString
			});
		}); 
	});
	document.getElementById('cloneCons').addEventListener('click',
		() => sendMessage({ action: 'CLONE_CONS' })
	);
	document.getElementById('cloneAppend').addEventListener('click',
		() => sendMessage({ action: 'CLONE_APPEND' })
	);
	document.getElementById('done').addEventListener('click', () => {
		const prevSelectorString = currentSelectorString;
		sendMessage({
			action: 'DONE',
			prevSelectorString: prevSelectorString
		});
	});
}
chrome.tabs.getSelected(null, getSelectedTab);

document.getElementById('goToOptions').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});
