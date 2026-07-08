async function searchCard(cardName) {
  try {
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(cardName)}`
    );

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      showError("No card found");
      return;
    }

    displayCard(data.data[0]);

  } catch (error) {
  console.error(error);
  alert(error.message);
}
}


function displayCard(card) {

  const viewer = document.getElementById("cardViewer");

  let statLine = "";

  if (card.type.includes("Link")) {

    statLine = `
      <p><strong>Link Rating:</strong> ${card.linkval}</p>
      <p><strong>ATK:</strong> ${card.atk}</p>
    `;

  } else if (card.type.includes("XYZ")) {

    statLine = `
      <p><strong>Rank:</strong> ${card.level}</p>
      <p><strong>ATK:</strong> ${card.atk}</p>
      <p><strong>DEF:</strong> ${card.def}</p>
    `;

  } else if (card.type.includes("Monster")) {

    statLine = `
      <p><strong>Level:</strong> ${card.level}</p>
      <p><strong>ATK:</strong> ${card.atk}</p>
      <p><strong>DEF:</strong> ${card.def}</p>
    `;

  }

  const pendulum =
    card.scale !== undefined
      ? `<p><strong>Pendulum Scale:</strong> ${card.scale}</p>`
      : "";

  const archetype =
    card.archetype
      ? `<p><strong>Archetype:</strong> ${card.archetype}</p>`
      : "";

  viewer.innerHTML = `
    <div class="card">

      <img src="${card.card_images[0].image_url}" alt="${card.name}">

      <h2>${card.name}</h2>

      <p><strong>Type:</strong> ${card.type}</p>

      <p><strong>Attribute:</strong> ${card.attribute || "-"}</p>

      ${statLine}

      ${pendulum}

      ${archetype}

      <p>${card.desc}</p>

    </div>
  `;
}

function showError(message) {
  document.getElementById("cardViewer").innerHTML = `
    <p>${message}</p>
  `;
}


// Search box + dropdown

const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("searchSuggestions");

let searchTimer;


searchInput.addEventListener("input", function(event) {

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


  } catch(error) {

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


console.log("app.js loaded");
