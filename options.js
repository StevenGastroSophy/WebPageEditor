const loadOptions = (event) => {
  const el = event.target;
  const files = el.files;
  console.log(files);
  if (files.length <= 0) {
    return false;
  }

  const fileName = el.value.split('\\').pop();
  if (fileName) { document.getElementById('fileName').textContent = fileName; }

  const fr = new FileReader();
  fr.onload = function(e) { 
    console.log(e);
    const result = JSON.parse(e.target.result);
    const formatted = JSON.stringify(result, null, 2);
    console.log(formatted);
    document.getElementById('result').value = formatted;
  }

  fr.readAsText(files.item(0));

  el.value = null;
}


// Saves options to chrome.storage
const saveOptions = () => {
  const formatted = document.getElementById('result').value;
  const result = JSON.parse(formatted);
  console.log(result)
  chrome.storage.sync.set({
    downloadTarget: result.downloadTarget,
    outputFileName: result.outputFileName,
    elements: result.elements
  }, () => {
    // Pop out an alert to let user know options were saved.
    window.alert("OPTIONS SAVED.");
  });  
}

document.getElementById('file').addEventListener('change', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);
