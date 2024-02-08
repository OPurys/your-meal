// === modals.js ===

// Body disable / enable
const body = document.body;

function disable() {
  let paddingOffset = window.innerWidth - body.offsetWidth + "px";
  body.classList.add("no-scroll");
  body.style.paddingRight = paddingOffset;
}

function enable() {
  body.classList.remove("no-scroll");
  body.style.paddingRight = "0px";
}

function modal() {
  const modals = document.querySelectorAll(".modal");
  const modalsDialog = document.querySelectorAll(".modal__dialog");
  const modalBtn = document.querySelectorAll("[data-modal]");
  const modalCloses = document.querySelectorAll("[data-close]");
  const modalButtonAdd = modalAdd.querySelectorAll("[data-modal-add]");

  // Открытие модального окна
  modalBtn.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let modalId = btn.getAttribute("data-modal");

      document.querySelector(modalId).classList.remove("hidden");
      disable();

      setTimeout(() => {
        modals.forEach((el) => (el.style.transform = "scale(1)"));
      }, 1);
    })
  );

  // Закрытие модального окна при нажатии на крестик
  modalCloses.forEach((el) =>
    el.addEventListener("click", () => {
      let modalParent = el.getAttribute("data-close");

      setTimeout(() => {
        document.querySelector(modalParent).classList.add("hidden");
        enable();
      }, 400);

      modals.forEach((el) => (el.style.transform = "scale(0)"));
    })
  );

  // Закрытие модального окна при нажатии на кнопку Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setTimeout(() => {
        modals.forEach((mdl) => mdl.classList.add("hidden"));
        enable();
      }, 400);

      modals.forEach((el) => (el.style.transform = "scale(0)"));
    }
  });

  // Закрытие модального окна при клике вне диалогового окна
  modals.forEach((mdl) =>
    mdl.addEventListener("click", () => {
      setTimeout(() => {
        mdl.classList.add("hidden");
        enable();
      }, 400);

      modals.forEach((el) => (el.style.transform = "scale(0)"));
    })
  );

  modalsDialog.forEach((el) =>
    el.addEventListener("click", (e) => {
      e.stopPropagation();
    })
  );

  // Закрытие модального окна при нажатии на кнопку Добавить
  modalButtonAdd.forEach((btn) =>
    btn.addEventListener("click", () => {
      setTimeout(() => {
        modalAdd.classList.add("hidden");
        enable();
      }, 400);

      modals.forEach((el) => (el.style.transform = "scale(0)"));
    })
  );
}
