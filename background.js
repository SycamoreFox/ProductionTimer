chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', 
    {  frame: "none",
       id: "framelessWinID",
       innerBounds: {
         width: 360,
         height: 300,
         left: 600,
         minWidth: 300,
         minHeight: 300
      }
  });
});