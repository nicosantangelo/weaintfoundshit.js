(function () {
  var $document = jQuery(document)
  
  //
  // First step
  //

  var selector = document.getElementById('js-selector-input')
  var results  = document.getElementById('js-results')

  var defaultPlaceholder = selector.placeholder

  var uses = 1
  var fallbackUsed = false

  jQuery('#js-search-form').on('submit', function () {
    selector.placeholder = defaultPlaceholder
    results.innerHTML = ''

    if (!selector.value) {
      selector.placeholder = "Come on now, you can do better than that"
      delayedCleanPlaceholder()
      
    } else {
      var $results = jQuery(selector.value) // where the magic happens

      if ($results.length) {
        var pluralizedText = $results.length === 1 ? 'element' : 'elements'
        results.innerHTML = "Found " + $results.length + " " + pluralizedText + " for '" + selector.value + "'. Good job sport!"
        delayedCleanResults()

      } else {
        $document.one('finished.weaintfoundshit', function (event, video, error) {
          if(! fallbackUsed && error) {
            results.innerHTML = "Holy tostitos that fallback was impressive"
            fallbackUsed = true
            return
          }

          if (uses === 2) {
            results.innerHTML = "You really liked the script huh?"
          } else if (uses === 3) {
            results.innerHTML = "Are you're expecting something else to happen?"
          } else if (uses === 4) {
            results.innerHTML = "Enough!"
            setTimeout(function () {
              WEAINTFOUND_VIDEO_URL = 'https://i.imgur.com/dVop7h0.mp4'
              jQuery('Hero Quest')
            }, 50)
          } else {
            results.innerHTML = "Wasn't that awesome?"
          }

          delayedCleanResults()

          jQuery('#js-hidden-step').fadeIn()
          uses += 1
        })
      }
    }

    return false
  })

  //
  // Second step
  //

  var defaultUrl = window.WEAINTFOUND_VIDEO_URL

  jQuery('#js-url-input').on('keyup', function () {
    if (! this.value) {
      window.WEAINTFOUND_VIDEO_URL = defaultUrl
    } else {
      window.WEAINTFOUND_VIDEO_URL = this.value
    }
  })

  jQuery('#js-reset-url').on('click', function (event) {
    var urlInput = document.getElementById('js-url-input')
    var placeholder = urlInput.placeholder

    urlInput.value = ''
    window.WEAINTFOUND_VIDEO_URL = defaultUrl

    urlInput.placeholder = "URL reseted, I'm so proud of you"
    delay(function () { urlInput.placeholder = placeholder })

    event.preventDefault()
  })

  //
  // Utils
  //

  function delayedCleanResults () {
    delay(function () { results.innerHTML = '' })
  }
  function delayedCleanPlaceholder () {
    delay(function () { selector.placeholder = defaultPlaceholder })
  }
  function delay (fn, time) {
    setTimeout(fn, time || 2500)
  }

})()
