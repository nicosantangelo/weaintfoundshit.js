# weaintfoundshit.js

A script to quickly tell whether or not your search for a DOM element was sucessful

## Use

To give it a try, add the script to your site and do something like:

```
document.querySelectorAll('itsamemario')
document.querySelector('#its > .john ~ .cena')

// If you use jQuery
jQuery('#not-enough-jquery')
```

<sub>If any of those matched something, please email me your site</sub>

## Customize

If you don't like the default video (or like to be edgy by making the name of the script rather pointless) you can modify:

```
window.WEAINTFOUND_VIDEO_TYPE  // Default: "video/mp4";
window.WEAINTFOUND_VIDEO_URL   // Default: "//i.imgur.com/2IuUuar.mp4";
```

If the URL produces an error, you don't have `<video>` support, or you're not connected to the interwebs, a fallback with text will ensue.

## What if I want to use it in every site I visit ?


I got you covered, add this as an URL to a new bookmark:

```
javascript:var s = document.createElement('script');s.src = 'https://cdn.rawgit.com/NicoSantangelo/weaintfoundshit.js/master/weaintfoundshit.min.js';document.getElementsByTagName('body')[0].appendChild(s);s.onload = function () { console.log('Script loaded, everybody rejoice!')};
```

## Demo

[Over here](https://nicosantangelo.github.io/weaintfoundshit.js) ( [mobile/not dev version](https://nicosantangelo.github.io/weaintfoundshit.js/interactive.html) )


**That's all folks**
