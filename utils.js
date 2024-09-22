//Code snippet taken from https://developer.chrome.com/docs/extensions/reference/api/tabs for getting current tab on chrome

export async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true
  });

  return tabs[0];
}

