//  === card.js ===

const modalAdd = document.getElementById("add");
let productsData3 = [];

getProducts3();

// Получение товара
async function getProducts3() {
  try {
    if (!productsData3.length) {
      const res = await fetch("../files/data.json");
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      productsData3 = await res.json();
    }

    loadProductDetails(productsData3);
    modal();
  } catch (err) {
    showErrorMessage(ERROR_SERVER);
    console.log(err.message);
  }
}

// Загрузка информации о товаре в модальном окне
function loadProductDetails(data) {
  if (!data || !data.length) {
    showErrorMessage(ERROR_SERVER);
    return;
  }

  checkingRelevanceValueBasket(data);

  document.addEventListener("click", (event) => {
    if (event.target.dataset.imgId) {
      if (!event.target.dataset.imgId) {
        showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND);
        return;
      }

      modalAdd.textContent = "";

      const findProduct = data.find(
        (card) => card.id == event.target.dataset.imgId
      );

      if (!findProduct) {
        showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND);
        return;
      }

      renderInfoProduct(findProduct);
      productCounterInModal();
      modalsDialogStopPropagation();
      addProductFromModalToBasket();
      calcSubtotalPriceProduct();
      checkingActiveButtonInModal();
    }
  });
}

// Рендер информации о товаре
function renderInfoProduct(product) {
  const {
    id,
    img,
    title,
    price,
    weight,
    ccal,
    cp1,
    cp2,
    cp3,
    cp4,
    cp5,
    descr,
  } = product;

  const productItem = `
        <div class="modal__dialog  modal__dialog--height">
            <button class="btn  btn--close" type="button" data-close="#add">
              <svg width="24" height="24">
                <use href="./img/icons.svg#close"></use>
              </svg>
            </button>

            <div class="modal-inner">
                <h2 class="modal-inner__title">
                    ${title}
                </h2>

                <div class="modal-inner__direction">
                    <div class="modal-inner__left">
                        <img class="img modal-inner__photo" src="img/products/${img}" width="276" height="220" alt="Продукт">
                    </div>

                    <div class="modal-inner__right">
                        <div class="modal-inner__text">
                            ${descr}
                        </div>
                        <ul class="modal-inner__list">
                            <li class="modal-inner__item">
                                Состав:
                            </li>
                            <li class="modal-inner__item">
                                ${cp1}
                            </li>
                            <li class="modal-inner__item">
                                ${cp2}
                            </li>
                            <li class="modal-inner__item">
                                ${cp3}
                            </li>
                            <li class="modal-inner__item">
                                ${cp4}
                            </li>
                            <li class="modal-inner__item">
                                ${cp5}
                            </li>
                            <li class="modal-inner__item">
                                ${weight}, ккал ${ccal}
                            </li>
                        </ul>
                    </div> <!-- /.modal-inner__right -->
                </div> <!-- /.modal-inner__direction -->

                <div class="d-flex flex-wrap mt-auto">
                    <button class="btn btn--orange btn--modal" type="button" data-modal-add="addto" data-modal-button-id="${id}">Добавить</button>
                    <div class="modal-counter d-flex justify-content-between align-items-center" data-modal-counter-id="${id}">
                        <button class="modal-counter__minus" type="button">-</button>
                        <div class="modal-counter__result">1</div>
                        <button class="modal-counter__plus" type="button">+</button>
                    </div>
                    <div class="modal-inner__price d-flex align-items-center">
                        ${price}
                    </div>
                </div>
            </div>
        </div>
        `;

  modalAdd.insertAdjacentHTML("beforeend", productItem);
}

// Счетчик количества товаров в модальном окне
function productCounterInModal() {
  const modalCounter = document.querySelector(".modal-counter");
  const modalCounterPlus = document.querySelector(".modal-counter__plus");
  const modalCounterMinus = document.querySelector(".modal-counter__minus");
  const modalCounterResult = document.querySelector(".modal-counter__result");

  const basket = getBasketLocalStorage();

  let count1 = 0;

  basket.forEach((item) => {
    if (item == modalCounter.dataset.modalCounterId) {
      count1++;
      modalCounterResult.textContent = count1;
    }
  });

  let count2 = 1;

  modalCounterPlus.addEventListener("click", () => {
    count2++;
    modalCounterResult.textContent = count2;
  });

  modalCounterMinus.addEventListener("click", () => {
    if (count2 > 1) {
      count2--;
    }
    modalCounterResult.textContent = count2;
  });
}

// Калькулятор подытога товара в модальном окне
function calcSubtotalPriceProduct() {
  const modalCounterResult = document.querySelector(".modal-counter__result");
  const modalInnerPrice = document.querySelector(".modal-inner__price");

  let subtotalPriceEl =
    modalCounterResult.textContent * parseInt(modalInnerPrice.textContent);

  modalInnerPrice.textContent = subtotalPriceEl + "₴";
}

// Добавление товаров из модального окна в корзину
function addProductFromModalToBasket() {
  const modalButtonAdd = modalAdd.querySelector("[data-modal-add]");
  const modalCounter = document.querySelector(".modal-counter");
  const modalCounterResult = document.querySelector(".modal-counter__result");

  modalButtonAdd.addEventListener("click", () => {
    const id = modalCounter.dataset.modalCounterId;
    const count = modalCounterResult.textContent;
    const basket = getBasketLocalStorage();

    if (basket.includes(id)) return;

    for (let i = 1; i <= count; i++) {
      basket.push(id);
      setBasketLocalStorage(basket);
    }

    loadProductBasket(productsData3);
    hiddenOnOff();

    productCounterBasket();
    calcTotalPriceOrder();
    calcSubtotalPriceProduct();

    checkingActiveButtons(getBasketLocalStorage());
    checkingActiveButtonInModal();
  });
}

// Проверка активности кнопки (Изменение текста и цвета кнопки если товар добавлен в корзину)
function checkingActiveButtonInModal() {
  const modalCounter = document.querySelector(".modal-counter");
  const modalButtonAdd = modalAdd.querySelector("[data-modal-add]");
  const modalCounterPlus = document.querySelector(".modal-counter__plus");
  const modalCounterMinus = document.querySelector(".modal-counter__minus");

  const id = modalCounter.dataset.modalCounterId;
  const basket = getBasketLocalStorage();
  const isInBasket = basket.includes(id);

  modalButtonAdd.disabled = isInBasket;
  modalCounterPlus.disabled = isInBasket;
  modalCounterMinus.disabled = isInBasket;

  modalButtonAdd.classList.toggle("active", isInBasket);
  modalButtonAdd.textContent = isInBasket ? "Добавлено" : "Добавить";
}
