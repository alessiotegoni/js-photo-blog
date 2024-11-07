const API_URL = "https://jsonplaceholder.typicode.com/photos";

const cardsContainer = document.querySelector(".blog-cards__container ul");

const alertContainer = document.querySelector(".alert__container");
const alertContent = alertContainer.querySelector(".alert__content");
const closeAlertBtn = alertContainer.querySelector("button");

const showCard = (e) => {
  const card = e.currentTarget.cloneNode(true);
  alertContainer.classList.add("active");

  alertContent.innerHTML = "";
  alertContent.appendChild(card);
};

const hideCard = () => alertContainer.classList.remove("active");
closeAlertBtn.addEventListener("click", hideCard);

const renderCards = (cards) => {
  cardsContainer.innerHTML = "";
  const cardEl = cards.map(
    (c) =>
      `<li class="card" data-id="${c.id}">
            <img src="./img/pin.svg" alt="pin-icon" class="card__pin" />
             <figure>
                <img src="${c.url}" alt="${c.title}" class="card__thumb" />
                <figcaption class="thumb__title">
                  ${c.title}
                </figcaption>
              </figure>
        </li>`
  );

  cardsContainer.innerHTML = cardEl.join(" ");

  cardsContainer
    .querySelectorAll(".blog-cards .card")
    .forEach((c) => c.addEventListener("click", showCard));
};

const fetchCards = async (length = 6) => {
  try {
    const photos = (await axios.get(API_URL, { params: { _limit: length } }))
      .data;

    renderCards(photos);
  } catch (err) {
    console.error(err.message);
  }
};

fetchCards();
