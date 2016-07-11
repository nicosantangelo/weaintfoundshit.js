(function () {
  var isChromium = window.chrome
  var vendorName = window.navigator.vendor
  var isOpera    = window.navigator.userAgent.indexOf("OPR") > -1
  var isIEedge   = window.navigator.userAgent.indexOf("Edge") > -1

  if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
    // Browser detecting like is 1999
    // https://bugs.chromium.org/p/chromium/issues/detail?id=626415
    console.log('Hey!, look ↑, some versions of Chrome tend to change the frame for no reason, make sure it says top')
  }
})();

(function () {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  var $navAnchor = jQuery('#js-nav-anchor')
  if (isMobile) {
    $navAnchor.html("I'm on a phone").removeAttr('title')
  }

  $navAnchor.removeClass('invisible')
})();

jQuery(document).one('finished.weaintfoundshit', function () {
  var space = Array(34).join(' ')
  var styles = "padding:4px 0px;font-size:12px;font-family:Consolas;color:#242729;background-color:#e1e3e5;"

  console.log("Wasn't that %cawesome?", "color:green;")
  console.log('I know what you are thinking, "how much free time does this guy have?" and "what if I want another video?"')
  console.log('Well, You can change the source/type of the video changing\n')
  console.log("%c" + space, styles)
  console.log("%c  window.WEAINTFOUND_VIDEO_URL   ", styles)
  console.log("%c  window.WEAINTFOUND_VIDEO_TYPE  ", styles)
  console.log("%c" + space, styles)
  console.log("\nWhile you're at it, try adding a wrong URL\n ")

  var uses = 2
  var fallbackUsed = false

  var defaultUrl = window.WEAINTFOUND_VIDEO_URL

  jQuery(document).on('finished.weaintfoundshit', function (event, video, error) {
    if(! fallbackUsed && error) {
      console.log("Holy tostitos that fallback was %cimpressive", "color:green;")
      console.log("I reseted the default URL so you can try again")
      window.WEAINTFOUND_VIDEO_URL = defaultUrl
      fallbackUsed = true
      return
    }
    if (uses === 2) {
      console.log("You really liked the script huh?")
    }
    if (uses === 3) {
      console.log("Are you're expecting something else to happen?")
    }
    if (uses === 4) {
      console.log("Enough!")
      WEAINTFOUND_VIDEO_URL = 'https://i.imgur.com/dVop7h0.mp4'
      jQuery('Hero Quest')
    }
    uses += 1
  })
})
