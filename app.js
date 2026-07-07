async function searchCard(cardName) {
  try {
    const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(cardName)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      showError("No cards found");
      return;
    }

    // Look for an exact match (ignoring upper/lower case)
    const exactMatch = data.data.find(
      card => card.name.toLowerCase() === cardName.toLowerCase()
    );

    if (exactMatch) {
      displayResults([exactMatch]);
    } else {
      displayResults(data.data);
    }

  } catch (error) {
    showError("API error or card not found");
    console.error(error);
  }
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
const suggestionsBox = document.getElementById("searchSuggestions");

let searchTimer;

searchInput.addEventListener("input", (event) => {
  clearTimeout(searchTimer);

  const searchText = event.target.value.trim();

  if (searchText.length < 2) {
    suggestionsBox.innerHTML = "";
    return;
  }

  searchTimer = setTimeout(() => {
    getSuggestions(searchText);
  }, 300);
});


async function getSuggestions(searchText) {
  try {
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(searchText)}`
    );

    const data = await response.json();

    if (!data.data) {
      suggestionsBox.innerHTML = "";
      return;
    }

    showSuggestions(data.data);

  } catch (error) {
    console.error(error);
  }
}


function showSuggestions(cards) {
  suggestionsBox.innerHTML = "";

  cards.slice(0, 10).forEach(card => {

    const div = document.createElement("div");

    div.className = "searchSuggestion";
    div.textContent = card.name;

    div.addEventListener("click", () => {
      searchInput.value = card.name;
      suggestionsBox.innerHTML = "";

      searchCard(card.name);
    });

    suggestionsBox.appendChild(div);

  });
}
