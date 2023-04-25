document.addEventListener('DOMContentLoaded', function() {
  var cssSelect = document.getElementById('color-select');
  var increaseButton = document.getElementById('increase-font');
  var decreaseButton = document.getElementById('decrease-font');
  var cssFileInput = document.getElementById('css-file');
  var selectedCssUrl = null;

  function applyCSS() {
    var selectedCss = cssSelect.value;
    if (selectedCssUrl !== null) {
      URL.revokeObjectURL(selectedCssUrl);
    }
    chrome.tabs.executeScript({
      code: 'var link = document.createElement("link"); link.rel = "stylesheet"; link.href = "' + selectedCss + '"; document.head.appendChild(link);'
    });
  }


  cssSelect.addEventListener('change', function() {
    var selectedCss = cssSelect.value;
    chrome.tabs.executeScript({
      code: 'var link = document.createElement("link"); link.rel = "stylesheet"; link.href = "' + selectedCss + '"; document.head.appendChild(link);'
    });
  });

  increaseButton.addEventListener('click', function() {
    chrome.tabs.executeScript({
      code: 'document.body.style.fontSize = parseInt(window.getComputedStyle(document.body).getPropertyValue("font-size")) + 1 + "px";'
    });
  });

  decreaseButton.addEventListener('click', function() {
    chrome.tabs.executeScript({
      code: 'document.body.style.fontSize = parseInt(window.getComputedStyle(document.body).getPropertyValue("font-size")) - 1 + "px";'
    });
  });

  cssFileInput.addEventListener('change', function() {
    var reader = new FileReader();
    reader.onload = function(event) {
      var cssContent = event.target.result;
      chrome.tabs.executeScript({
        code: 'var link = document.createElement("link"); link.rel = "stylesheet"; link.href = URL.createObjectURL(new Blob([`' + cssContent + '`], {type: "text/css"})); document.head.appendChild(link);'
      });
    };
    reader.readAsText(cssFileInput.files[0]);
  });

  cssSelect.addEventListener('change', function() {
    applyCSS(); // call applyCSS()
    // add the existing code that applies the CSS here as well
  });
});
