document.addEventListener('DOMContentLoaded', function() {
  var cssSelect = document.getElementById('css-select');
  var increaseButton = document.getElementById('increase-font');
  var decreaseButton = document.getElementById('decrease-font');
  var cssFileInput = document.getElementById('css-file');


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
});
