let list = [];
const options = {};

// Initialize the form with the user's option settings
chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
    if(String(options.list)) {
        list = options.list.split("\n");
        console.log(list);
    }
});

setInterval(censorMessages,200);
censorMessages();


chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.options?.newValue) {
        const newList = String(changes.options.newValue.list);
        list = newList.split("\n");
    }
});

function censorMessages() {

    if(list.length > 0) {
        const text = document.querySelectorAll('div');
        for (const element of text) {
            for (let i = 0;i<list.length;i++) {
                if(list[i].toString().trim().length == 0) {
                    continue;
                }
                if (element.className.includes('copyable-text') && element.getAttributeNode('data-pre-plain-text') != null && element.getAttributeNode('data-pre-plain-text').value.includes(list[i].toString())) {
                    element.innerHTML = "<span>Censored   </span>"
                }
            }

        }
    }
}




