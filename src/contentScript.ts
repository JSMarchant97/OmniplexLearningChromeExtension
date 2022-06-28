let username : string;
chrome.storage.sync.get(['username', 'password'], (items) => {
    if (items.username && items.password){
        username = items.username
        initialiseInactivityDetector();
    }
});

const initialiseInactivityDetector = () => {
    let timeout : any;
    
    const inactivityDetection = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            openPopup();
        }, 5000);
    }

    document.addEventListener('mousemove', inactivityDetection);
    document.addEventListener('click', inactivityDetection);
    document.addEventListener('keydown', inactivityDetection);
    
    const openPopup = () => {
        document.removeEventListener('mousemove', inactivityDetection);
        document.removeEventListener('click', inactivityDetection);
        document.removeEventListener('keydown', inactivityDetection);
        fetch(chrome.runtime.getURL('onSitePopup.html')).then(r => r.text()).then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            const template = document.querySelector('template#popUpTemplate') as HTMLTemplateElement;
            let popup = template?.content.cloneNode(true) as HTMLDivElement;
            const usernameEl = popup.querySelector('h4 span.username') as HTMLSpanElement;
            usernameEl.innerText = username;
            const yesBtn = popup.querySelector('#helperPopup #helper-btn-yes');
            const noBtn = popup.querySelector('#helperPopup #helper-btn-no');
            yesBtn?.addEventListener('click', () => {
                window.open('https://help.nickelled.com');
                var popupEl = document.querySelector('#helperPopup')
                popupEl?.remove();
            });

            noBtn?.addEventListener('click', () => {
                var popupEl = document.querySelector('#helperPopup')
                popupEl?.remove();
            });
            document.body.appendChild(popup);
        });
    }
}
