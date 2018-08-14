let windowId = 0;
const CONTEXT_MENU_ID_DCGMAIL = 'dealcloud_gmail_context_menu';

function closeIfExist() {
  if (windowId > 0) {
    chrome.windows.remove(windowId);
    windowId = chrome.windows.WINDOW_ID_NONE;
  }
}

// https://developer.chrome.com/extensions/windows
function popWindow(type) {
  closeIfExist();
  const options = {
    type: 'popup',
    left: 100,
    top: 100,
    width: 800,
    height: 475,
  };
  if (type === 'open') {
    options.url = 'window.html';
    chrome.windows.create(options, (win) => {
      windowId = win.id;
    });
  }
}

chrome.contextMenus.create({
  id: CONTEXT_MENU_ID_DCGMAIL,
  title: 'DealCloud',
  contexts: ['all'],
  documentUrlPatterns: [
    'https://mail.google.com/*'
  ]
});

chrome.contextMenus.onClicked.addListener((event) => {
  if (event.menuItemId === CONTEXT_MENU_ID_DCGMAIL) {
    popWindow('open');
  }
});
