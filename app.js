async function searchCard(cardName) {
  try {
    const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(cardName)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.data) {
      showError("No card found");
      return;
    }

    const card = data.data[0];
    displayCard(card);

  } catch (error) {
    showError("API error or card not found");
    console.error(error);
  }
}
