(function() {
  var video;
  var source = document.createElement("source");
  var hasVideoSupport = document.createElement('video').canPlayType;

  var container = document.createElement("div");
  container.id = "_weaintfoundshit_";

  container.style.position  = "fixed";
  container.style.top       = 0;
  container.style.right     = 0;
  container.style.width     = "100%";
  container.style.zIndex    = 1050;
  container.style.textAlign = "center";

  document.getElementsByTagName("body")[0].appendChild(container);

  window.WEAINTFOUND_VIDEO_TYPE = "video/mp4";
  window.WEAINTFOUND_VIDEO_URL  = "//i.imgur.com/2IuUuar.mp4"; // I'm a professional

  if (document.querySelector && document.querySelectorAll) {
    var oldQuerySelector    = document.querySelector;
    var oldQuerySelectorAll = document.querySelectorAll;

    document.querySelector = function (selector) {
      var result = oldQuerySelector.call(document, selector);
      mockedSelector(!result);
      return result;
    };

    document.querySelectorAll = function (selector) {
      var result = oldQuerySelectorAll.call(document, selector);
      mockedSelector(result.length === 0);
      return result;
    };
  }

  if (jQuery) {
    var oldinit    = jQuery.fn.init;
    var rootjQuery = jQuery(document);

    jQuery.fn.init = function(selector, context) {
      var result = new oldinit(selector, context, rootjQuery);
      var shouldRun = (selector || context) && !result.length;
      mockedSelector(shouldRun);
      return result;
    }
  }

  function mockedSelector(shouldRun) {
    if(shouldRun && !container.getElementsByTagName("video").length) {
      source.type = window.WEAINTFOUND_VIDEO_TYPE;
      source.src  = window.WEAINTFOUND_VIDEO_URL;
      
      if (hasVideoSupport) {
        if (!video) {
          video = document.createElement('video');

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
          container.style.backgroundColor = 'transparent';
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
  }

  function triggerFinish() {
    if (jQuery) rootjQuery.trigger('finished.weaintfoundshit', arguments);
  }
})();
