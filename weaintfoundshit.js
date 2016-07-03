(function() {
    var oldinit = jQuery.fn.init;
    var rootjQuery = jQuery(document);

    var video;
    var body = document.getElementsByTagName("body")[0];
    var container = document.createElement("div");
    container.id = "_weaintfoundshit_";
    jQuery(container).css({
        position: "fixed",
        top: 0,
        right: 0,
        width: "100%",
        zIndex: 1050,
        textAlign: "center"
    });

    body.appendChild(container);

    jQuery.fn.init = function(selector, context) {
        var result = new oldinit(selector, context, rootjQuery);

        if((selector || context) && !result.length && !container.getElementsByTagName("video").length) {
            if (!video) {
                var sourceMP4 = document.createElement("source"); 
                var sourceWebm = document.createElement("source"); 
                video = document.createElement('video');

                sourceMP4.type = "video/mp4";
                sourceMP4.src = "//i.imgur.com/2IuUuar.mp4";

                sourceWebm.type = "video/webm";
                sourceWebm.src = "//i.imgur.com/2IuUuar.webm";

                video.style.position = "relative";
                video.style.top = "50px";
                video.style.width = "595px";
                video.style.height = "321px";
                video.onended = function(event) {
                    container.removeChild(video);
                };

                sourceWebm.onerror = sourceMP4.onerror = function() {
                    if (container.getElementsByTagName("a").length) {
                        return;
                    }
                    var link = document.createElement("a");
                    var h1 = document.createElement("h1");
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
                            setTimeout(function() { container.removeChild(link); }, 1900);
                        }
                    };
                    container.style.backgroundColor = "#FFF";
                    link.href = "https://i.imgur.com/2IuUuar.gifv";
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

                video.appendChild(sourceMP4);
                video.appendChild(sourceWebm);
            }

            container.appendChild(video);
            video.play();
        }

        return result;
    };
})();