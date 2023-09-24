import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();


import Swiper, { Navigation, Pagination } from 'swiper';

const swiper = new Swiper();


// Filter

const filters = document.querySelectorAll('[data-filter]');
const categories = document.querySelectorAll('[data-category]');
const titles = document.querySelectorAll('[data-title]');

filters.forEach((item) => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        let filter = item.getAttribute('data-filter');

        categories.forEach((el) => {
            let category = el.getAttribute('data-category');

            if (category === filter) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        })
        titles.forEach((atr) => {
            let title = atr.getAttribute('data-title');
            if (title === filter) {
                atr.classList.remove('hidden');
            } else {
                atr.classList.add('hidden');
            }
        })
    })
    item.addEventListener('click', () => {
        filters.forEach(e => e.classList.remove('active'))
        item.classList.add('active');
    })
});


// Basket collapse and expand

const collapse = document.querySelector('.btn--collapse');
const expand = document.querySelector('.btn--expand');
const order = document.querySelector('.order');

visibilityToggle();

collapse.addEventListener('click', () => {
    order.classList.add('hidden');
    visibilityToggle();
});

expand.addEventListener('click', () => {
    order.classList.remove('hidden');
    visibilityToggle();
});

function visibilityToggle() {
    if (order.classList.contains('hidden')) {
        expand.classList.remove('visibility');
    } else { expand.classList.add('visibility'); }
}


// Modal

const body = document.body;
const modals = document.querySelectorAll('.modal');
const modalsDialog = document.querySelectorAll('.modal__dialog');
const modalBtn = document.querySelectorAll('[data-modal]');
const modalCloses = document.querySelectorAll('[data-close]');

modalBtn.forEach(btn => btn.addEventListener('click', () => {
    let modalId = btn.getAttribute('data-modal');

    document.querySelector(modalId).classList.remove('hidden');
    body.classList.add('no-scroll');
}));

modalCloses.forEach(el => el.addEventListener('click', () => {
    let modalParent = el.getAttribute('data-close');

    document.querySelector(modalParent).classList.add('hidden');
    body.classList.remove('no-scroll');
}));

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach((mdl => mdl.classList.add('hidden')));
        body.classList.remove('no-scroll');
    }
});

modals.forEach(mdl => mdl.addEventListener('click', () => {
    mdl.classList.add('hidden');
    body.classList.remove('no-scroll');
}));

modalsDialog.forEach(el => el.addEventListener('click', (e) => {
    e.stopPropagation();
}));











