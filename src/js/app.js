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
        titles.forEach((atr)=> {
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


