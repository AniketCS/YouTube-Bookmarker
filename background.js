chrome.tabs.onUpdated.addListener((tabId, tab)=>{

  if(changeInfo.status === 'complete' && tab.url && tab.url.includes("youtube.com/watch")) {

    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    console.log(urlParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    
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

        
      }
    }




  }
});