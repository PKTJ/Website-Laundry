function adjustViewport() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var viewport = document.querySelector('meta[name="viewport"]');
    
    console.log("Current dimensions:", width, "x", height); // Debug info
    
    // iPad 9.7 and similar" (768x1024)
    if (width >= 760 && width <= 785 && height >= 1015 && height <= 1035) {
      viewport.setAttribute('content', 'width=1024');
      console.log("Applied 1024 viewport for 768x1024 device");
    }
    // iPad 1 and similar" (820x1180)
    else if (width >= 810 && width <= 830 && height >= 1170 && height <= 1190) {
      viewport.setAttribute('content', 'width=1024');
      console.log("Applied 1024 viewport for 820x1180 device");
    }
    // others
    else {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1');
      console.log("Applied default viewport");
    }
  }
  
  window.addEventListener('load', adjustViewport);
  window.addEventListener('resize', adjustViewport);