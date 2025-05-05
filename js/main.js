(function() {
  var lastAppliedViewport = '';
  var isAdjusting = false;
  
  function adjustViewportByDimensions() {
    if (isAdjusting) {
      return;
    }

    isAdjusting = true;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var viewport = document.querySelector('meta[name="viewport"]');
    
    if (!viewport) {
      console.log("Viewport meta not found");
      isAdjusting = false;
      return;
    }
    
    var newContent;
    // device pixel detection
    
    // general ipad device sizes and similar :
    // - iPad Mini: ~768x1024
    // - iPad (genral): ~768x1024 up to 834x1112
    // - iPad Pro: ~834x1194 up to 1024x1366
    
    if (
      // Tablet mode
      (width >= 750 && width <= 1024 && height >= 1000 && height <= 1366) ||
      (height >= 750 && height <= 1024 && width >= 1000 && width <= 1366)
    ) {
      newContent = 'width=1024';
      console.log("Dimensi tablet terdeteksi:", width, "x", height, "- menerapkan viewport tablet");
    }
    // mobile mode
    else if (width < 750 || height < 750) {
      newContent = 'width=device-width, initial-scale=1';
      console.log("Dimensi mobile terdeteksi:", width, "x", height, "- menerapkan viewport default");
    }
    // Desktop mode
    else {
      newContent = 'width=device-width, initial-scale=1';
      console.log("Dimensi desktop terdeteksi:", width, "x", height, "- menerapkan viewport default");
    }
    
    // Only change if the viewport needs to be changed
    if (lastAppliedViewport !== newContent) {
      viewport.setAttribute('content', newContent);
      lastAppliedViewport = newContent;
      console.log("Viewport diatur ke:", newContent);
    }
    
    setTimeout(function() {
      isAdjusting = false;
    }, 300);
  }
  
  // run DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', adjustViewportByDimensions);
  } else {
    adjustViewportByDimensions();
  }
  
  // prevent loop
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (!isAdjusting) {
        adjustViewportByDimensions();
      }
    }, 250);
  });
})();