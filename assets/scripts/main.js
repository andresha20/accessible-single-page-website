let width = window.innerWidth;
let hamburger = document.getElementById('navigationdrawer');
let slidingMenu = document.getElementById('slidingmenu');
let background = document.getElementById('background');
let isSlidingMenuOpen = false;

window.onload = () => {
    width = window.innerWidth;
    if (width > 600) {
        hamburger.style.display = 'none';
        slidingMenu.style.transform = 'translate(60%, 0px)';
        background.style.opacity = 0;
        background.style.display = 'none';
        hamburger.innerHTML = `<i id="navigationdrawer" class="bi bi-list"></i>`;
    } else {
        hamburger.style.display = 'block';
        if(isSlidingMenuOpen) {
            slidingMenu.style.transform = 'translate(-99%, 0px)';
            background.style.opacity = 0.7;
            background.style.display = 'block;'
            hamburger.innerHTML = `<i id="navigationdrawer" class="bi bi-x-lg"></i>`;
        }
    }
}

window.onresize = () => {
    width = window.innerWidth;
    if (width <= 600) {
        hamburger.style.display = 'block';
        background.style.display = 'block';
        slidingMenu.style.display = 'block';
    } else {
        hamburger.style.display = 'none';
        slidingMenu.style.display = 'none';
        background.style.display = 'none';
    }
}

const url_arr = document.URL.split('/');
const route = url_arr[url_arr.length - 1];
const routeName = route.split('.');
const activeElement = document.getElementById(routeName?.[0] || "index"); 

activeElement?.classList.add('active-menu-item');

const handleClicks = (e) => {
    let { id: clickedElementId } = e.target;
    switch (clickedElementId) {
        case 'navigationdrawer':
            if (!isSlidingMenuOpen) {
                slidingMenu.style.transform = 'translate(-99%, 0px)';
                background.style.opacity = 0.7;
                hamburger.innerHTML = `<i id="navigationdrawer" class="bi bi-x-lg"></i>`;
                isSlidingMenuOpen = true;
            } else {
                slidingMenu.style.transform = 'translate(60%, 0px)';
                background.style.opacity = 0;
                hamburger.innerHTML = `<i id="navigationdrawer" class="bi bi-list"></i>`;
                isSlidingMenuOpen = false;
            }
            break;
    
        case 'tab-1':
        case 'tab-2':
        case 'tab-3':
            let tabs = ['tab-1', 'tab-2', 'tab-3'];
            if (tabs.includes(e.target.id) == false) return false;
            tabs.forEach(el => {
                let splitString = el.split('-');
                let panelId = `panel-${splitString[1]}`;
                let targetPanel = document.getElementById(panelId);
                if (el == e.target.id) {
                    e.target.classList.add('active-tab');
                    targetPanel.style.display = 'block';
                    e.target.ariaSelected = 'true';
                } else {
                    let inactiveTab = document.getElementById(el);
                    inactiveTab?.classList?.remove('active-tab');
                    targetPanel.style.display = 'none';
                    inactiveTab.ariaSelected = 'false';
                }
            });
            break;
        default:
            if (e.target.id !== 'slidingmenu' && e.target.id !== 'navigationdrawer' && !slidingMenu.contains(e.target)) {
                slidingMenu.style.transform = 'translate(60%, 0px)';
                background.style.opacity = 0;
                hamburger.innerHTML = `<i id="navigationdrawer" class="bi bi-list"></i>`;
                isSlidingMenuOpen = false;
            }
            break;
    }
}

addEventListener('click', handleClicks);

