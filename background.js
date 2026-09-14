const TARGET_GAME_ID = "7491927311";

function blockGame(tabId) {
  chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      alert(
        "Stop playing UTPR! Go do something productive with your life. Play anything better than this. Genuinely."
      );
    }
  }).finally(() => {
    chrome.tabs.remove(tabId).catch(() => {}); // close the game page because it's UTPR, their balancers suck, and their owner is a pushover who cant make decisions for himself.
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "loading" &&
    tab.url?.includes(`/games/${TARGET_GAME_ID}/`)
  ) {
    blockGame(tabId);
  }
});


chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  try {
    const tab = await chrome.tabs.get(tabId);

    if (tab.url?.includes(`/games/${TARGET_GAME_ID}/`)) {
      blockGame(tabId);
    }
  } catch {
    // Tab may have already been closed
  }
});