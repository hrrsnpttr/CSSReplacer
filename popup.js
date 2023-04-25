document.addEventListener('DOMContentLoaded', function() {
    var cssSelect = document.getElementById('css-select');
    cssSelect.addEventListener('change', function() {
      var selectedCss = cssSelect.value;
      chrome.tabs.executeScript({
        code: 'var link = document.createElement("link"); link.rel = "stylesheet"; link.href = "' + selectedCss + '"; document.head.appendChild(link);'
      });
    });
  });