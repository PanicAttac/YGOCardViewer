async function searchCard(cardName) {
  try {
    const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(cardName)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      showError("No cards found");
      return;
    }

    displayResults(data.data);

  } catch (error) {
    showError("API error or card not found");
    console.error(error);
  }
}

function displayResults(cards) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  cards.forEach(card => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${card.name}</h3>
      <img src="${card.card_images[0].image_url}" width="150">
      <p>${card.type}</p>
    `;

    container.appendChild(div);
  });
}

function showError(message) {
  document.getElementById("results").innerHTML = `
    <p>${message}</p>
  `;
}

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", async (event) => {
  const searchText = event.target.value.trim();

  if (searchText.length < 2) {
    document.getElementById("results").innerHTML = "";
    return;
  }

  await searchCard(searchText);
});
