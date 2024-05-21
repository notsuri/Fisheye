const btnContact = document.querySelector(".contact_button");
const modal = document.querySelector("#contact_modal");
const closeModal = document.querySelector("#close_modal");
const form = modal.querySelector(".contact_form");

// affiche la modal au click du btn contactez-moi
btnContact.addEventListener("click", () => {
  modal.showModal();
});

// ferme la modal de contact
closeModal.addEventListener("click", () => {
  modal.close();
});

form.addEventListener("submit", (s) => {
  s.preventDefault();

  const firstName = form.querySelector("#firstname").value;
  const lastName = form.querySelector("#lastname").value;
  const email = form.querySelector("#email").value;
  const message = form.querySelector("#message").value;

  console.log(firstName, lastName, email, message);
  modal.close();
});
