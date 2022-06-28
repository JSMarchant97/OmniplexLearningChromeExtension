let storageItem : any;
document.addEventListener('DOMContentLoaded', () => { //runs the code in the function once the extension popup is loaded
    chrome.storage.sync.get(['username', 'password'], (items) => {
        if (items.username && items.password){
            storageItem = items;
            formSetup('.logged-in-form');
        } else {
            formSetup('.login-form');
        }
    });
});

const openSocialLink = (url : string) => {
    chrome.tabs.create({ url: url });
}

const formSetup = (selector : string) => {
    const instagramBtn = document.querySelector('#instagramLink');
    const linkedInBtn = document.querySelector('#linkedInLink');
    const twitterBtn = document.querySelector('#twitterLink');
    let socialsArr = [instagramBtn, linkedInBtn, twitterBtn];
    socialsArr.forEach((social) => {
        let url = social?.getAttribute('data-link') as string;
        social?.addEventListener('click', () => {
            openSocialLink(url);
        });
    })
    const lForm = document.querySelector(selector);
    const lTemplate = lForm?.querySelector('template');
    if (lForm && lTemplate){
        lForm.appendChild(lTemplate.content.cloneNode(true));
        const loginButton = lForm.querySelector('#log-in-btn');
        loginButton?.addEventListener('click', logIn);
        document.addEventListener('keypress', (e) => {
            if (e.code === 'Enter' && document.activeElement?.nodeName === 'INPUT'){
                logIn();
            }
        })
        const logoutButton = lForm.querySelector('#log-out-btn');
        logoutButton?.addEventListener('click', logOut);
        if (selector === '.logged-in-form'){
            const userPlaceholder = document.querySelector('#usernameHolder') as HTMLSpanElement;
            userPlaceholder.innerText = storageItem.username;
        }
    }
}

const logIn = () => {
    const username = document.querySelector('input[name="username"]') as HTMLInputElement;
    const password = document.querySelector('input[name="password"]') as HTMLInputElement;
    const errorEl = document.querySelector('#error-msg') as HTMLElement;
    let passedChecks = true;
    if (username.value === ''){
        if(errorEl){
            errorEl.innerHTML = 'Username is required' + '<br>';
        }
        passedChecks = false;
    }
    if (password.value !== 'password' && passedChecks === true){
        if(errorEl){
            errorEl.innerHTML = 'Password is incorrect' + '<br>';
        }
        passedChecks = false;
    }
    if (passedChecks){
        chrome.storage.sync.set({
            username : username.value,
            password : password.value
        }, () => {
            console.log('Settings saved');
        });
        window.close();
    }
}

const logOut = () => {
    chrome.storage.local.clear(() => {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
        // do something more
    });
    chrome.storage.sync.clear(); // callback is optional
    window.close();
}