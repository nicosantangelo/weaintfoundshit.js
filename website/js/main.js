(function () {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  var $navAnchor = jQuery('#js-nav-anchor')
  if (isMobile) {
    $navAnchor.html("I'm on a phone")
  }

  $navAnchor.removeClass('invisible')
})()

jQuery(document).one('finished.weaintfoundshit', function () {
  var space = Array(34).join(' ')
  var styles = "padding:4px 0px;font-size:12px;font-family:Consolas;color:#242729;background-color:#e1e3e5;"

  console.log("Wasn't that %cawesome?", "color:green;")
  console.log("You can change the source/type of the video using\n ")
  console.log("%c" + space, styles)
  console.log("%c  window.WEAINTFOUND_VIDEO_URL   ", styles)
  console.log("%c  window.WEAINTFOUND_VIDEO_TYPE  ", styles)
  console.log("%c" + space, styles)
  console.log("\nWhile you're at it, try adding a wrong URL\n ")

  var uses = 2
  jQuery(document).on('finished.weaintfoundshit', function (event, video, error) {
    if(error) {
      console.log("Holy tostitos that fallback was %cimpressive", "color:green;")
    }
    if (uses === 3) {
      console.log("You really liked the script huh?")
    }
    if (uses === 4) {
      console.log("Are you're expecting something else to happen?")
    }
    if (uses === 5) {
      console.log("Enough!")
      WEAINTFOUND_VIDEO_URL = 'https://i.imgur.com/dVop7h0.mp4'
      jQuery('Hero Quest')
    }
    uses += 1
  })
})
