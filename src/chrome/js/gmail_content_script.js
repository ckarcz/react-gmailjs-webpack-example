// https://developer.chrome.com/extensions/content_scripts
// this script is injected for URL pattern https://mail.google.com/*

"use strict";

function addScript(src) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.extension.getURL(src);
    (document.body || document.head || document.documentElement).appendChild(script);
}

addScript("js/gmail_injection_script.bundle.js");