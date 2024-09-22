(() =>{
let youtubeLeftControls, youtubePlayer;
let currentVideo= "";

//listen to background.js message

chrome.runtime.onMessage.addListener ((obj, sender, response) =>{
    const {type, value, videoId} =obj;

    if(type === "NEW") {
        currentVideo =videoId;
        newVideoLoaded();
    }
});

})();