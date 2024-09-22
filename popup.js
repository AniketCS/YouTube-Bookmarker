import { getActiveTabURL } from "./utils.js";

const addNewBookmark = (bookmarks, bookmark) => {
    const bookmarkTitleElement = document.createElement("div");
    const controlsElement = document.createElement("div");
    const newBookmarkElement = document.createElement("div");
  
    bookmarkTitleElement.textContent = bookmark.desc;
    bookmarkTitleElement.className = "bookmark-title";
    controlsElement.className = "bookmark-controls";
  
    setBookmarkAttributes("play", onPlay, controlsElement);
    setBookmarkAttributes("delete", onDelete, controlsElement);
  
    //this will guarantee a unique id for each row - bookmark along with time
    newBookmarkElement.id = "bookmark-" + bookmark.time;
    newBookmarkElement.className = "bookmark";
    newBookmarkElement.setAttribute("timestamp", bookmark.time);
  
    newBookmarkElement.appendChild(bookmarkTitleElement);
    newBookmarkElement.appendChild(controlsElement);
    bookmarks.appendChild(newBookmarkElement);
  };

const viewBookmarks = (currentBookmarks=[]) => {
    const bookmarksElement = document.getElementById("bookmarks");
    bookmarksElement.innerHTML = "";
  
    if (currentBookmarks.length > 0) {
      for (let i = 0; i < currentBookmarks.length; i++) {
        const bookmark = currentBookmarks[i];
        //adding one bookmark at a time and call the function every time we are adding a bookmark
        addNewBookmark(bookmarksElement, bookmark);
      }
    } else {
      bookmarksElement.innerHTML = '<i class="row">No bookmarks to show</i>';
    }
  
    return;
  };
  
const onPlay = async e => {
    const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
    const activeTab = await getActiveTabURL();
  
    chrome.tabs.sendMessage(activeTab.id, {
      type: "PLAY",
      value: bookmarkTime,
    });
};

const onDelete = async e => {
    const activeTab = await getActiveTabURL();
    const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
    const bookmarkElementToDelete = document.getElementById(
      "bookmark-" + bookmarkTime
    );
  
    bookmarkElementToDelete.parentNode.removeChild(bookmarkElementToDelete);
  
    chrome.tabs.sendMessage(activeTab.id, {
      type: "DELETE",
      value: bookmarkTime,
    }, viewBookmarks);
};
  
const setBookmarkAttributes =  (src, eventListener, controlParentElement) => {
    const controlElement = document.createElement("img");

    controlElement.src = "assets" + src + ".png";
    controlElement.title = src;
    controlElement.addEventListener("click", eventListener);
    controlParentElement.appendChild(controlElement);

};


document.addEventListener("DOMContentLoaded", async () => {
    const currentTab = await getActiveTabURL ();
    const queryParameters = currentTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo =  urlParameters.get("v");

    //the Youtube video's unique identifier in the URL is used to storage bookmarks in the chrome storage, and so will also search using it
    if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
        chrome.storage.sync.get([currentVideo], (data) => {
          const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];
    
          viewBookmarks(currentVideoBookmarks);
        });
    } 
    else {
        const container = document.getElementsByClassName("container")[0];
    
        container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
    }

});
