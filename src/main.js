"use strict";
// Special Class to open a You-tube video on constent of user
class consentYoutube extends HTMLElement {
    constructor() {
        super();

        let this2 = this;

        const fakeDOM = this.attachShadow({mode: 'open'});

        let mainDiv = document.createElement('div');
        mainDiv.style.borderWidth = "1px";
        mainDiv.style.borderStyle = "solid";
        mainDiv.style.borderColor = "inherit";
        mainDiv.style.padding = "5px";


        let source;
        if(this.hasAttribute('src')) {
            source = this.getAttribute('src');
        } else {
            throw "This element must have a Youtube link in the src field."
        }
        
        let askString;

        if(this.hasAttribute('title')) {
            askString = "I would like to share <em>" + this.getAttribute('title') + "</em> from YouTube. Do you consent?";
        } else {
            askString = "I would like to share a video from YouTube. Do you consent?";
        }

        let consentPrompt = document.createElement("p");
        consentPrompt.innerHTML = askString;

        let consentButton = document.createElement("button");
        consentButton.innerHTML = "Consent";
        consentButton.style.fontFamily = "inherit";
        consentButton.style.fontSize = "18pt";
        consentButton.style.width = "200px";
        consentButton.style.height = "50px";

        fakeDOM.appendChild(mainDiv);
        mainDiv.appendChild(consentPrompt);
        mainDiv.appendChild(consentButton);

        consentButton.addEventListener('click', function() {
            let youtubeFrame = document.createElement("iframe");
            youtubeFrame.src = "https://www.youtube-nocookie.com/embed/" + source.substring(32);
            youtubeFrame.title = "YouTube video player";
            youtubeFrame.width = this2.width;
            youtubeFrame.height = this2.height;
            youtubeFrame.frameBorder = "0";
            youtubeFrame.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            youtubeFrame.allowFullscreen = true;
            mainDiv.replaceWith(youtubeFrame);
        });
    }
}
class fancyDate extends HTMLElement {
    constructor() {
        super();
        
        this.style = `
            margin-top: 5px;
            width: 75px;
            height: 100px;
            padding: 0px;
            text-align: center;
            border-radius: 5px;
            background-image: linear-gradient(to right, #E5E5E5, #EEE);
            overflow: hidden;
            display: block;
        `;

        const fakeDOM = this.attachShadow({mode: 'open'});

        let month = document.createElement("div");
        month.style = `
            width: 100%;
            background-color: red;
            color: white;
            margin-bottom: 0px;
        `;
        month.textContent = this.getAttribute('month');

        let day = document.createElement("h1");
        day.style = `
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: bold;
        `;
        day.textContent = this.getAttribute('day');

        let weekday = document.createElement("p");
        weekday.style = `
            margin-top: 0px;
        `;
        weekday.textContent = this.getAttribute('weekday');

        fakeDOM.appendChild(month);
        fakeDOM.appendChild(day);
        fakeDOM.appendChild(weekday);
    }
}
customElements.define('consent-youtube', consentYoutube);
customElements.define('fancy-date', fancyDate);

setupHeader();
appendCommon();

function setupHeader(lang="en") {
    document.body.style.display = "none";
    //Set page language to English or set Language
    document.getElementsByTagName("html")[0].lang = lang;

    //Set character set to UTF-8
    let charset = document.createElement("meta");
    charset.httpEquiv = "Content-Type";
    charset.content = "text/html; charset=utf-8";
    document.head.appendChild(charset);

    //Make the page responsive
    let viewport = document.createElement("meta");
    viewport.name = "viewport";
    viewport.content = "width=device-width, initial-scale=1.0"
    document.head.appendChild(viewport);

    // Link main.css and append it to the document head.
    let stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/src/css/main.css";
    document.head.appendChild(stylesheet);
    document.body.style.display = "inherit";
}

//Append the common html code for all pages
function appendCommon() {
    fetch("/src/html/common.html")
    .then(res => res.text())
    .then(text => {
            var newBits = document.createElement("div");
            newBits.innerHTML = text;
            document.body.appendChild(newBits);
        }
    )
    }