(function() {
  // Initialization
  var video;
  var source = document.createElement("source");
  var hasVideoSupport = document.createElement("video").canPlayType;
  var hasjQuery = typeof jQuery !== "undefined"

  var container = document.createElement("div");
  container.id = "_weaintfoundshit_";

  container.style.position  = "fixed";
  container.style.top       = 0;
  container.style.right     = 0;
  container.style.width     = "100%";
  container.style.zIndex    = 1050;
  container.style.textAlign = "center";

  document.getElementsByTagName("body")[0].appendChild(container);

  // Configuration (I'm a professional)
  window.WEAINTFOUND_VIDEO_TYPE = "video/mp4";
  window.WEAINTFOUND_VIDEO_URL  = "//i.imgur.com/2IuUuar.mp4";

  // Mock ALL the things
  var methods = ["getElementById", "getElementsByTagName", "getElementsByClassName", "querySelector", "querySelectorAll"];
  for (var i = 0; i < methods.length; i++) {
    mockNativeMethod(methods[i])
  }

  if (hasjQuery) {
    mockjQuery()
  }

  function mockNativeMethod(method) {
    var oldMethod = document[method];

    if (oldMethod) {
      document[method] = function (selector) {
        var result = oldMethod.call(document, selector);
        var shouldRun = result instanceof NodeList ? result.length === 0 : !result; // gasp
        delayedShowVideo(shouldRun);
        return result;
      };
    }
  };

  function mockjQuery() {
    var oldinit    = jQuery.fn.init;
    var rootjQuery = jQuery(document);

    jQuery.fn.init = function(selector, context) {
      var result = new oldinit(selector, context, rootjQuery);
      var shouldRun = (selector || context) && !result.length;
      delayedShowVideo(shouldRun);
      return result;
    }
  };

  var delayedShowVideo = (function delayedShowVideo () {
    // Why is this here I hear you ask. Well, aside from the fact that setTimeout solves everything
    // it's so we avoid "locking" the execution of some piece of JS that relies on timing (or AJAX) when loading the video
    var timerId
    return function (shouldRun) {
      if (shouldRun) {
        clearTimeout(timerId)
        timerId = setTimeout(function() { showVideo(shouldRun); }, 100)
      }
    }
  })()

  function showVideo (shouldRun) {
    if(shouldRun && !container.getElementsByTagName("video").length) {
      source.type = window.WEAINTFOUND_VIDEO_TYPE;
      source.src  = window.WEAINTFOUND_VIDEO_URL;
      
      if (hasVideoSupport) {
        if (!video) {
          video = document.createElement("video");

          video.style.position = "relative";
          video.style.top      = "50px";
          video.style.width    = "595px";
          video.style.height   = "321px";

          video.onended = function(event) {
            container.removeChild(video);
            triggerFinish(this);
          };

          source.onerror = fallback;

          video.appendChild(source);
        } else {
          video.pause();
          video.load();
        }

        container.appendChild(video);
        video.play();
      } else {
        fallback();
      }
    }
  };

  function fallback () {
    if (container.getElementsByTagName("a").length) {
      return;
    }
    var link = document.createElement("a");
    var h1   = document.createElement("h1");
    var h1Data = [{ text: " ain't", delay: 200 }, { text: " found ", delay: 300 }, { text: "SHIT", delay: 750 }];

    var executeCallbacks = function() {
      if (h1Data.length) {
        var data = h1Data.shift();
        setTimeout(function() {
          if (h1Data.length) {
            h1.innerHTML += data.text;
          } else {
            h1.innerHTML += "<span>" + data.text + "</span>";
          }
          executeCallbacks();
        }, data.delay);
      } else {
        setTimeout(function() {
          container.removeChild(link);
          container.style.backgroundColor = "transparent";
          triggerFinish([this, "Source error"]);
        }, 1900);
      }
    };

    container.style.backgroundColor = "#FFF";
    link.href = window.WEAINTFOUND_VIDEO_URL;
    link.target = "_blank";

    h1.innerHTML = "We";
    h1.style.textAlign = "center";
    h1.style.marginTop = "20px";
    h1.style.marginBottom = "20px";

    link.appendChild(h1);
    container.removeChild(video);
    container.appendChild(link);
    executeCallbacks();
  };

  function triggerFinish () {
    if (hasjQuery) jQuery(document).trigger("finished.weaintfoundshit", arguments);
  };
})();
