import { getCurrentTab } from "./utils.js";

const addNewBookmark = (bookmarksElement, bookmark) => {
    
};

const viewBookmarks = (currentBookmarks =[]) => {
    const bookmarksElement = document.getElementById("bookmarks");
    bookmarksElement.innerHTML = "";

    if (currentBookmarks.length > 0){
        for(let i=0; i<currentBookmarks.length; i++){
            const bookmark = currentBookmarks[i];
            //adding one bookmark at a time and call the function every time we are adding a bookmark
            addNewBookmark(bookmarksElement, bookmark);
        }
    }
    else{
        bookmarksElement.innerHTML = '<i class="row"> No bookmarks to show</i>';
    }
};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", async () => {
    const currentTab = await getCurrentTab();
    const queryParameters = currentTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo =  urlParameters.get("v");

    //the Youtube video's unique identifier in the URL is used to storage bookmarks in the chrome storage, and so will also search using it
    if (currentTab.url.includes("youtube.com/watch") && currentVideo) {
        chrome.storage.sync.get([currentVideo], (data) => {
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

            //view bookmarks

        })
    } 
    else {
        const container = document.getElementsByClassName("container")[0];

        container.innerHTML = '<div class="title"> This is not a youtube video page.</div>';
    }

});
