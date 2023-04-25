document.addEventListener('DOMContentLoaded', function() {
  var cssSelect = document.getElementById('css-select');
  var increaseButton = document.getElementById('increase-font');
  var decreaseButton = document.getElementById('decrease-font');
  
  cssSelect.addEventListener('change', function() {
    var selectedCss = cssSelect.value;
    console.log(selectedCss);
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
});
