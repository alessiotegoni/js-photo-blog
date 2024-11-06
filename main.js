const API_URL = "https://jsonplaceholder.typicode.com/photos";

const cardsContainer = document.querySelector(".blog-cards__container ul");

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
};

const generateCards = async (length = 6) => {
  try {
    const photos = (await axios.get(API_URL, { params: { _limit: length } }))
      .data;
    console.log(photos);

    renderCards(photos);
  } catch (err) {
    console.error(err.message);
  }
};

generateCards();
