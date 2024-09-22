(() =>{
let youtubeLeftControls, youtubePlayer;
let currentVideo= "";
let currentVideoBookmarks = [];

//listen to background.js message

chrome.runtime.onMessage.addListener ((obj, sender, response) =>{
    const {type, value, videoId} =obj;

    if(type === "NEW") {
        currentVideo =videoId;
        newVideoLoaded();
    }
});

const newVideoLoaded = () => {
    const bookmarkButtonExists = document.getElementsByClassName("bookmark-btn")[0];
    
    console.log(bookmarkButtonExists);

    if (!bookmarkButtonExists){
      const bookmarkButton = document.createElement("img");

      bookmarkButton.src=chrome.runtime.getURL("assets/bookmark.png");
      bookmarkButton.className = "youtube-button" + "bookmark-button";
      bookmarkButton.title = "Click to bookmark the current timestamp";

      youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];

      youtubePlayer = document.getElementsByClassName("video-stream")[0];

      youtubeLeftControls.appendChild(bookmarkButton);
      bookmarkButton.addEventListener("click", addNewBookmarkEventHandler);

    }
  }

  const addNewBookmarkEventHandler = () => {
    const currentTime = youtubePlayer.currentTime;
    const newBookmark = {
        //in seconds, which we convert to normal time using getTime
        time: currentTime,
        desc:"Bookmark at " + getTime(currentTime),
    };
    console.log(newBookmark);

    //set chrome storage with each bookmark
    chrome.storage.sync.set({
        [currentVideo]:JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a,b) => a.time -b.time))
    });
  }

  // for edge cases when we refresh the same youtube video, as url won't be updated, so we are calling the function again.
  //   newVideoLoaded();

})();

//this is a default function from JS, can be derived using pieces, I wrote it manually
const getTime = t => {
    var date = new Date(0);
    date.setSeconds(t);

    return date.toISOString().substring(11, 8);
};