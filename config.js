// In-page cache of the user's options
const options = {};

// Initialize the form with the user's option settings
chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
    if(String(options.list)) {
        optionsForm.blacklist.value = String(options.list);
    }else {
        optionsForm.blacklist.value = ""
    }

});

// Immediately persist options changes
optionsForm.saveButton.addEventListener('click', () => {
    options.list =  optionsForm.blacklist.value;
    chrome.storage.sync.set({options});
});
