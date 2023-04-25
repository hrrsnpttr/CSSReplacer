document.addEventListener('DOMContentLoaded', function() {
  var cssSelect = document.getElementById('css-select');
  var increaseButton = document.getElementById('increase-font');
  var decreaseButton = document.getElementById('decrease-font');
  var cssFileInput = document.getElementById('css-file');

  cssSelect.addEventListener('change', function() {
    var val = cssSelect.value;
    if(val === "0"){
      chrome.tabs.executeScript({
        code: "document.body.style.color = 'white'; document.body.style.background = 'black'; document.div.style.background = '#3f3f3f'; document.div.style.color = '#ffffff'"
      });
    }
    else if(val === "1"){
      chrome.tabs.executeScript({
        code: "document.body.style.color = 'black'; document.body.style.background = 'white'; document.div.style.background = '#000000'; document.div.style.color = '#ffffff'"
      });
    }
    else if(val === "2"){
      chrome.tabs.executeScript({
        code: "document.body.style.color = 'yellow'; document.body.style.background = 'purple';"
      });
    }
    else if(val === "3"){
      chrome.tabs.executeScript({
        code: "document.body.style.color = 'green'; document.body.style.background = 'white';"
      });
    }
    else if(val === "4"){
      chrome.tabs.executeScript({
        code: "document.body.style.color = 'yellow'; document.body.style.background = 'black';"
      });
    }
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
