(function () {
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
        }, 2750)
      }
    }

    return false
  })

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
