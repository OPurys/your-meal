// === modals.js ===
const modals = document.querySelectorAll(".modal");

// Body disable / enable
const body = document.body;

function disable() {
  let paddingOffset = window.innerWidth - body.offsetWidth + "px";
  body.classList.add("no-scroll");
  body.style.paddingRight = paddingOffset;
}

function enable() {
  setTimeout(() => {
    body.classList.remove("no-scroll");
    body.style.paddingRight = "0px";
  }, 250);
}

function modal() {
  const modalBtn = document.querySelectorAll("[data-modal]");

  // Открытие модального окна
  modalBtn.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let modalId = btn.getAttribute("data-modal");

      document.querySelector(modalId).classList.remove("is-open");
      disable();
    })
  );

  // Закрытие модального окна при нажатии на кнопку Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((mdl) => mdl.classList.add("is-open"));
      enable();
    }
  });

  // Закрытие модального окна при клике вне диалогового окна
  modals.forEach((mdl) =>
    mdl.addEventListener("click", () => {
      mdl.classList.add("is-open");
      enable();
    })
  );

  modalsDialogStopPropagation();
  closeModalWhenPressButtonClose();
  closeModalWhenPressButtonAdd();
}

// Отмена закрытия модального окна при клике на диалоговое окно
function modalsDialogStopPropagation() {
  const modalsDialog = document.querySelectorAll(".modal__dialog");

  modalsDialog.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  closeModalWhenPressButtonClose();
  closeModalWhenPressButtonAdd();
}

// Закрытие модального окна при нажатии на кнопку Добавить
function closeModalWhenPressButtonAdd() {
  const modalButtonAdd = modalAdd.querySelectorAll("[data-modal-add]");

  modalButtonAdd.forEach((btn) =>
    btn.addEventListener("click", () => {
      modalAdd.classList.add("is-open");
      enable();
    })
  );
}

// Закрытие модального окна при нажатии на крестик
function closeModalWhenPressButtonClose() {
  const modalCloses = document.querySelectorAll("[data-close]");

  modalCloses.forEach((el) =>
    el.addEventListener("click", () => {
      let modalParent = el.getAttribute("data-close");

      document.querySelector(modalParent).classList.add("is-open");
      enable();
    })
  );
}
