(function () {
  //
  // First step
  //

  var selector = document.getElementById('js-selector-input')
  var results  = document.getElementById('js-results')

  var defaultPlaceholder = selector.placeholder

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
        delay(function () {
          results.innerHTML = "Wasn't that awesome?"
          delayedCleanResults()

          jQuery('#js-hidden-step').fadeIn()
        }, 2800)
      }
    }

    return false
  })

  //
  // Second step
  //

  var defaultUrl = window.WEAINTFOUND_VIDEO_URL

  jQuery('#js-url-input').on('keyup', function () {
    window.WEAINTFOUND_VIDEO_URL = this.value
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
