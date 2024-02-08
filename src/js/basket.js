//  === basket.js ===

const order = document.querySelector(".order");
const orderTop = order.querySelector(".order__top");

let productsData2 = [];

getProducts2();

// Получение товара
async function getProducts2() {
  try {
    if (!productsData2.length) {
      const res = await fetch("../files/data.json");
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      productsData2 = await res.json();
    }

    loadProductBasket(productsData2);
    hiddenOnOff();
    productCounterBasket();
    calcTotalPriceOrder();
  } catch (err) {
    showErrorMessage(ERROR_SERVER);
    console.log(err.message);
  }
}

// Загрузка товара в корзине
function loadProductBasket(data) {
  if (!data || !data.length) {
    showErrorMessage(ERROR_SERVER);
    return;
  }

  checkingRelevanceValueBasket(data);

  const basket = getBasketLocalStorage();

  orderTop.textContent = "";

  const findProducts = data.filter((item) => basket.includes(String(item.id)));

  if (!findProducts.length) {
    return;
  }

  renderProductsBasket(findProducts);
}

// Рендер товаров в корзине
function renderProductsBasket(arr) {
  arr.forEach((card) => {
    const { id, img, title, price, weight } = card;

    const cardItem = `
            <div class="order__product d-flex justify-content-between align-items-center" data-product-id="${id}">
                <div class="d-flex">
                    <img class="order__img" src="img/products/${img}" width="64" height="52" alt="Заказанный продукт">
                    <div>
                        <div class="order__name">${title}</div>
                        <div class="order__weight">${weight}</div>
                        <div class="order__price">${price}</div>
                    </div>
                </div>
                <div class="counter d-flex justify-content-between align-items-center" data-counter-id="${id}">
                    <button class="counter__minus" type="button">-</button>
                    <div class="counter__result">1</div>
                    <button class="counter__plus" type="button">+</button>
                </div>
            </div>
            `;

    orderTop.insertAdjacentHTML("beforeend", cardItem);
  });
}

// Радио кнопки в форме оформления заказа
const radio1 = document.getElementById("radio1");
const radio2 = document.getElementById("radio2");
const element = document.querySelector(".form__radio-checked");

radio1.addEventListener("click", () => {
  element.classList.add("visibility");
});

radio2.addEventListener("click", () => {
  element.classList.remove("visibility");
});

// Счетчик товара в корзине и его удаление
function productCounterBasket() {
  const counter = document.querySelectorAll(".counter");

  counter.forEach((el) => {
    let count = 0;

    const basket = getBasketLocalStorage();

    basket.forEach((item) => {
      if (item == el.dataset.counterId) {
        count++;
        el.querySelector(".counter__result").textContent = count;
      }
    });

    el.querySelector(".counter__plus").addEventListener("click", () => {
      count++;
      el.querySelector(".counter__result").textContent = count;

      const card = el.closest(".order__product");
      const id = card.dataset.productId;
      const basket = getBasketLocalStorage();

      basket.push(id);
      setBasketLocalStorage(basket);

      calcTotalPriceOrder();
    });

    el.querySelector(".counter__minus").addEventListener("click", () => {
      count--;
      el.querySelector(".counter__result").textContent = count;

      const card = el.closest(".order__product");
      const id = card.dataset.productId;
      const basket = getBasketLocalStorage();

      basket.splice(basket.indexOf(id), 1);
      setBasketLocalStorage(basket);

      calcTotalPriceOrder();

      if (count < 1) {
        const newBasket = basket.filter((item) => item !== id);
        setBasketLocalStorage(newBasket);

        loadProductBasket(productsData2);
        hiddenOnOff();
        productCounterBasket();
        checkingActiveButtons(getBasketLocalStorage());
      }
    });
  });
}

// Калькулятор итоговой стоимости заказа
function calcTotalPriceOrder() {
  const counter = document.querySelectorAll(".counter");
  const totalPrice = document.querySelector(".order__sum");

  let sum = 0;

  counter.forEach((el) => {
    const parent = el.closest(".order__product");
    const price = parent.querySelector(".order__price");
    const counterResult = parent.querySelector(".counter__result");

    let totalPriceEl = parseInt(price.textContent) * counterResult.textContent;

    sum += totalPriceEl;
    totalPrice.textContent = sum + "₴";

    freeDelivery();
  });
}

// Свернуть / Развернуть корзину (Активно при наличии товара в корзине)
const collapse = document.querySelector(".btn--collapse");
const expand = document.querySelector(".btn--expand");

visibilityToggle();

collapse.addEventListener("click", () => {
  order.classList.add("hidden");
  visibilityToggle();
});

expand.addEventListener("click", () => {
  order.classList.remove("hidden");
  visibilityToggle();
});

function visibilityToggle() {
  if (order.classList.contains("hidden")) {
    expand.classList.remove("visibility");
  } else {
    expand.classList.add("visibility");
  }
}

// Бесплатная доставка от 300грн
function freeDelivery() {
  const delivery = document.querySelector(".order__delivery");
  const totalPrice = document.querySelector(".order__sum");

  if (parseInt(totalPrice.textContent) >= 300) {
    delivery.classList.remove("visibility");
  } else {
    delivery.classList.add("visibility");
  }
}

// Отображение / Скрытие блока заказа и текста если корзина пуста
function hiddenOnOff() {
  const basketText = document.querySelector(".basket__text");
  const orderProduct = document.querySelectorAll(".order__product");
  const orderBottom = document.querySelector(".order__bottom");

  if (!orderProduct.length) {
    orderBottom.classList.add("hidden");
    basketText.classList.remove("visibility");
  } else {
    orderBottom.classList.remove("hidden");
    basketText.classList.add("visibility");
  }
}
