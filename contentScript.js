(() =>{
let youtubeLeftControls, youtubePlayer;
let currentVideo= "";
let currentVideoBookmarks = [];

//listen to background.js message
const fetchBookmarks = () =>{
    return new Promise((resolve) =>{
        chrome.storage.sync.get([currentVideo], (obj) =>{
            // if our current video has bookmarks or exits in storage we parse it, else we return an empty array
            resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]): []);
        })
    })
}

const newVideoLoaded = async () => {
    const bookmarkButtonExists = document.getElementsByClassName("bookmark-btn")[0];
    currentVideoBookmarks = await fetchBookmarks();
    
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

  const addNewBookmarkEventHandler = async () => {
    const currentTime = youtubePlayer.currentTime;
    const newBookmark = {
        //in seconds, which we convert to normal time using getTime
        time: currentTime,
        desc:"Bookmark at " + getTime(currentTime),
    };
    console.log(newBookmark);

    currentVideoBookmarks = await fetchBookmarks();

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