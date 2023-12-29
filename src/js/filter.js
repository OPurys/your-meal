// === filter.js ===

// Скрытие товаров кроме бургеров при загрузке стартовой страницы (В фильтре категории товаров кнопка с бургерами активна по умолчанию)
function filterShowBurgers() {

    document.querySelectorAll('[data-category]').forEach((el) => {
        const atr = el.getAttribute('data-category');

        if (atr != 'burger') {
            el.classList.add('hidden');
        }
    });
}


// Фильтр по категориям
function filter() {

    const filters = document.querySelectorAll('[data-filter]');

    filters.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            let filter = item.getAttribute('data-filter');

            document.querySelectorAll('[data-category]').forEach((el) => {
                let category = el.getAttribute('data-category');

                if (category === filter) {
                    el.classList.remove('hidden');
                }
                else {
                    el.classList.add('hidden');
                }
            });
            document.querySelectorAll('[data-title]').forEach((el) => {
                let title = el.getAttribute('data-title');
                if (title === filter) {
                    el.classList.remove('hidden');
                } else {
                    el.classList.add('hidden');
                }
            });
        });

        item.addEventListener('click', () => {
            filters.forEach(e => e.classList.remove('active'))
            item.classList.add('active');
        });
    });
}