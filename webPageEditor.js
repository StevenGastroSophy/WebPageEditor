// Remove class attribute if it is empty
const removeClass = (el, className) => {
	el.classList.remove(className);
	if (el.classList.length === 0) {el.removeAttribute("class");}
}

class Selecting {
	constructor() {
			this.className = {
				click: 'wpe_onclick',
				hover: 'wpe_onhover'
			}
	}

	// this.className would be element.className if you don't use arrow function
	_onClick = (event) => {
		event.preventDefault();
		this.resetClass();
		const el = event.currentTarget;
		el.classList.add(this.className.click);
	}

	_onMouseover = (event) => {
		const el = event.currentTarget;
		el.classList.add(this.className.hover);
	}

	_onMouseleave = (event) => {
		const el = event.currentTarget;
		removeClass(el, this.className.hover);
	}

	addListener(el) {
		el.addEventListener('mouseover', this._onMouseover);
		el.addEventListener('mouseleave', this._onMouseleave);
		el.addEventListener('click', this._onClick);	
	}

	removeListener(el) {
		el.removeEventListener('mouseover', this._onMouseover);
		el.removeEventListener('mouseleave', this._onMouseleave);
		el.removeEventListener('click', this._onClick);
	}

	resetClass() {
		document.querySelectorAll(`.${this.className.click}`).forEach(
			(el) => {
				removeClass(el, this.className.click);
			}
		);
		document.querySelectorAll(`.${this.className.hover}`).forEach(
			(el) => {
				removeClass(el, this.className.hover);
			}
		);
	}
}

class Editing {
	constructor() {
			this.className = {
				show: 'wpe_onshow',
				hide: 'wpe_onhide',
				edit: 'wpe_onediting'
			}
	}

	// replaceed by _addContentEditable and _removeContentEditable
	// this.className would be element.className if you don't use arrow function
	_onDoubleclickText = (event) => {
		event.preventDefault();
		const el = event.currentTarget;
		// use a class to determine whether el is currently being edited or not
		const isEditing = el.classList.contains(this.className.edit);
		if (isEditing) { removeClass(el, this.className.edit); return; }
		el.classList.add(this.className.edit);
		const oldInnerHTML = el.innerHTML;
		el.innerHTML = `
			<div id="oldInnerHTML" style="display:none">
				${oldInnerHTML}
			</div>
			<input id="editingInput" type="text" ondblclick="(
					function(el){ 
						var old = document.getElementById('oldInnerHTML');
						if (el.value.length > 0) {
							el.parentNode.innerHTML = el.value; 
						} else {
							el.parentNode.innerHTML = old.innerHTML;
							old.parentNode.removeChild(old);
						}
					}
				)(this);" />
		`;
	}

	_addContentEditable = (el) => {
		el.contentEditable = true;
	}

	_removeContentEditable = (el) => {
		el.contentEditable = false;
		el.removeAttribute("contentEditable");
	}

	_onDoubleclickHref = (event) => {
		event.preventDefault();
		const el = event.currentTarget;
		const oldHref = el.href;
		if (!oldHref) {
			alert('The target you selected has no link.');
			return;
		}
		const href = window.prompt('Please Insert a new link.', oldHref);
		if (href) {
			el.href = href;
		} else {
			el.href = oldHref;
		}
	}

	_onDoubleclickSrc = (event) => {
		event.preventDefault();
		const el = event.currentTarget;
		const oldSrc = el.src;
		if (!oldSrc) {
			alert('The target you selected has no reference.');
			return;
		}
		const src = window.prompt('Please Insert a new reference.', oldSrc);
		if (src) {
			el.src = src;
		} else {
			el.src = oldSrc;
		}
	}

	_addDataset = (event) => {
		event.preventDefault();
		const el = event.currentTarget;
		const inputDataName = window.prompt("Please enter the name of this data-attributes", '');
		if (inputDataName && inputDataName !== '') {
			const dataName = inputDataName.replace(/ /g, '');
			const dataValue = window.prompt(`Please enter the value of this data-${dataName}`, '');
			if (dataValue) {
				el.dataset[dataName] = dataValue;
				this._addDataset(event);
			} else {
				return;
			}
		} else {
			return;
		}
	}

	_editDataset = (event) => {
		event.preventDefault();
		const el = event.currentTarget;
		if (Object.keys({...el.dataset}).length > 0) {
			for (let key in el.dataset) {
				const dataValue = window.prompt(`Please enter the value of data-${key}`, el.dataset[key]);
				if (dataValue) { el.dataset[key] = dataValue }
			}
		} else {
			alert('There is no data-attribute on your target');
		}
	}

	addListener(el, selectType) {
		switch (selectType) {
			case 'EDIT_TEXT':
				// replaceed by _addContentEditable and _removeContentEditable
				// el.addEventListener('dblclick', this._onDoubleclickText);
				this._addContentEditable(el);
				break;
			case 'EDIT_HREF':
				el.addEventListener('dblclick', this._onDoubleclickHref);
				break;
			case 'EDIT_SRC':
				el.addEventListener('dblclick', this._onDoubleclickSrc);
				break;
			case 'DISPLAY_BLOCK':
				removeClass(el, this.className.hide);
				el.classList.add(this.className.show);
				break;
			case 'DISPLAY_NONE':
				removeClass(el, this.className.show);
				el.classList.add(this.className.hide);
				break;
			case 'ADD_DATASET':
				el.addEventListener('dblclick', this._addDataset);
				break;
			case 'EDIT_DATASET':
				el.addEventListener('dblclick', this._editDataset);
				break;
			default:
				break;
		}
	}

	removeListener(el) {
		// replaceed by _addContentEditable and _removeContentEditable
		// el.removeEventListener('dblclick', this._onDoubleclickText);
		this._removeContentEditable(el);
		if (el.classList.length === 0) {el.removeAttribute("class");}
		el.removeEventListener('dblclick', this._onDoubleclickHref);
		el.removeEventListener('dblclick', this._onDoubleclickSrc);
		el.removeEventListener('dblclick', this._addDataset);
		el.removeEventListener('dblclick', this._editDataset);
	}

	resetClass() {
		document.querySelectorAll(`.${this.className.show}`).forEach(
			(el) => {
				removeClass(el, this.className.show);
				if (el.classList.length === 0) {el.removeAttribute("class");}
			}
		);
		document.querySelectorAll(`.${this.className.hide}`).forEach(
			(el) => {
				removeClass(el, this.className.hide);
				if (el.classList.length === 0) {el.removeAttribute("class");}
			}
		);
	}

	// replaceed by _addContentEditable and _removeContentEditable
	resetInput() {
		const editingInput = document.getElementById('editingInput');
		if (editingInput) { 
			const event = new MouseEvent('dblclick', {
				'view': window,
				'bubbles': true,
				'cancelable': true
			});
			editingInput.dispatchEvent(event); 
		}
	}
}

const selecting = new Selecting();
const editing = new Editing();

const applyElementSelecting = (selectorString, selectType) => {
	const els = document.querySelectorAll(selectorString);
	for (i = 0; i < els.length; i += 1) {
		if (selectType === 'SELECT') {
			selecting.addListener(els[i]);
		} else {
			selecting.addListener(els[i]);
			editing.addListener(els[i], selectType);
		}
	}
}

const removeElementSelecting = (selectorString) => {
	selecting.resetClass();
	// replaceed by _addContentEditable and _removeContentEditable
	// editing.resetInput();
	const els = document.querySelectorAll(selectorString);
	for (i = 0; i < els.length; i += 1) {
		selecting.removeListener(els[i]);
		editing.removeListener(els[i]);
	}
}

const combineBefore = (...funcs) => {
	return (callback, prevSelectorString = '') => {
		funcs.forEach((func) => {
			func(() => {}, prevSelectorString)();
		});
		return (...args) => {
			callback(...args);
		}
	}
}

const removeClassBefore = (callback, prevSelectorString = '') => {
	return (...args) => {
		editing.resetClass();
		callback(...args);
	}
}

const removeSelectingBefore = (callback, prevSelectorString = '') => {
	return (...args) => {
		if (prevSelectorString.length > 0) { removeElementSelecting(prevSelectorString); }
		callback(...args);
	}
}

const applyElementSelectingEvent = (selectorString, selectType) => {
	applyElementSelecting(selectorString, selectType);
	alert('Selecting/Editing mode is on.');
}

// need to remove show/hide class before
const doneEvent = () => {
	alert('Selecting/Editing mode is off.');
}

const cloneAddEvent = (type) => {
	const el = document.querySelector(`.${selecting.className.click}`);
	if (!el) {alert('Please select a target first.'); return;}
	const insertType = (type === 'beforebegin') ? 'beforebegin' : 'afterend';
	const newEl = el.insertAdjacentElement(insertType, el.cloneNode(true));
	removeClass(newEl, selecting.className.click);
	selecting.addListener(newEl);
}

const removeEvent = () => {
	const el = document.querySelector(`.${selecting.className.click}`);
	if (!el) {alert('Please select a target first.'); return;}
	el.parentNode.removeChild(el);
}

// need to remove show/hide class before
const downloadEvent = (selectorString, filename, isAll = false) => {
	let data = '';
	if (!isAll) {
		data = document.querySelector(selectorString).outerHTML;
	} else {
		data = [...document.querySelectorAll(selectorString)].map(
			(el) => el.outerHTML
		).join('');
	}
	const blob = new Blob([data], { type: 'text/html' });
	const url = URL.createObjectURL(blob);
	chrome.runtime.sendMessage({ action: 'DOWNLOAD_BACKGROUND', url: url, filename: filename });
};

const onMessage = (message) => {
	switch (message.action) {
		case 'DOWNLOAD_FIRST':
			combineBefore(removeClassBefore, removeSelectingBefore)(
				downloadEvent, message.prevSelectorString
			)(
				message.targetSelectorString,
				message.outputFileName,
				false
			);
			break;
		case 'DOWNLOAD_ALL':
			combineBefore(removeClassBefore, removeSelectingBefore)(
				downloadEvent, message.prevSelectorString
			)(
				message.targetSelectorString,
				message.outputFileName,
				true
			);
			break;
		case 'APPLY_ELEMENT_SELECTING':
			console.log(message.selectorString);
			console.log(message.prevSelectorString);
			console.log(message.selectType);
			removeSelectingBefore(applyElementSelectingEvent, message.prevSelectorString)(
				message.selectorString,
				message.selectType
			);
			break;
		case 'CLONE_APPEND':
			cloneAddEvent('afterend');
			break;
		case 'CLONE_CONS':
			cloneAddEvent('beforebegin');
			break;
		case 'REMOVE':
			removeEvent();
			break;
		case 'DONE':
			combineBefore(removeClassBefore, removeSelectingBefore)(
				doneEvent, message.prevSelectorString
			)();
			break;
		default:
			break;
	}
}

chrome.runtime.onMessage.addListener(onMessage);
