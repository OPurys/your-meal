//  === index.js ===

const products = document.querySelector(".products__items");
let productsData1 = [];

getProducts1();

products.addEventListener("click", handleCardClick);

// Получение товара
async function getProducts1() {
  try {
    if (!productsData1.length) {
      const res = await fetch("../files/data.json");
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      productsData1 = await res.json();
    }

    renderStartPage(productsData1);
    filterShowBurgers();
    filter();
  } catch (err) {
    showErrorMessage(ERROR_SERVER);
    console.log(err.message);
  }
}

// Загрузка стартовой страницы
function renderStartPage(data) {
  if (!data || !data.length) {
    showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY);
    return;
  }

  createCards(data);
  checkingRelevanceValueBasket(data);

  const basket = getBasketLocalStorage();
  checkingActiveButtons(basket);
}

// Добавление товара в корзину
function handleCardClick(event) {
  const targetButton = event.target.closest("[data-basket]");
  if (!targetButton) return;

  const card = targetButton.closest(".products__item");
  const id = card.dataset.productId;
  const basket = getBasketLocalStorage();

  if (basket.includes(id)) return;

  basket.push(id);
  setBasketLocalStorage(basket);

  loadProductBasket(productsData1);
  hiddenOnOff();

  productCounterBasket();
  calcTotalPriceOrder();

  checkingActiveButtons(basket);
}

// Проверка активности кнопок (Если товар в корзине изменение цвета и текста кнопки)
function checkingActiveButtons(basket) {
  const buttons = document.querySelectorAll("[data-basket]");

  buttons.forEach((btn) => {
    const card = btn.closest(".products__item");
    const id = card.dataset.productId;
    const isInBasket = basket.includes(id);

    btn.disabled = isInBasket;
    btn.classList.toggle("active", isInBasket);
    btn.textContent = isInBasket ? "Добавлено" : "Добавить";
  });
}

// Рендер карточки
function createCards(data) {
  data.forEach((card) => {
    const { id, img, title, price, weight, category } = card;
    const cardItem = `
                <div class="products__item" data-product-id="${id}" data-category="${category}">
                    <a href="#" data-modal="#add">
                        <img class="img products__img" src="img/products/${img}" width="276" height="220" alt="${category}" data-img-id="${id}">
                    </a>
                    <div class="products__price">${price}</div>
                    <div class="products__name">${title}</div>
                    <div class="products__weight">${weight}</div>
                    <button class="btn" type="button" data-basket="order">Добавить</button>
                </div>
            `;
    products.insertAdjacentHTML("beforeend", cardItem);
  });
}
