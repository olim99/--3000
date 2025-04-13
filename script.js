let apples = [...appleVarieties];

document.addEventListener("DOMContentLoaded", () => {
  const appleList = document.getElementById("appleList");
  const sortSelect = document.getElementById("sortSelect");
  const searchInput = document.getElementById("searchInput");

  function displayApples(arr) {
    appleList.innerHTML = "";
    arr.forEach(apple => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${apple.Image}" alt="${apple.Name}" />
        <h2>${apple.Name}</h2>
        <p><strong>Origin:</strong> ${apple.Origin}</p>
        <p><strong>Description:</strong> ${apple.Description}</p>
        <p><strong>Color:</strong> ${apple.Color}</p>
        <p><strong>Best Use:</strong> ${apple.BestUse}</p>
        <button class="speak-btn">Озвучить</button>
      `;

      card.querySelector(".speak-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        const utterance = new SpeechSynthesisUtterance(`
          Название: ${apple.Name}.
          Происхождение: ${apple.Origin}.
          Цвет: ${apple.Color}.
          Описание: ${apple.Description}.
          Лучше всего использовать для: ${apple.BestUse}.
        `);
        utterance.lang = "ru-RU";
        speechSynthesis.speak(utterance);
      });

      card.addEventListener("click", () => {
        localStorage.setItem("selectedApple", JSON.stringify(apple));
        window.location.href = "details.html";
      });

      appleList.appendChild(card);
    });
  }

  sortSelect.addEventListener("change", () => {
    const value = sortSelect.value;
    if (value) {
      apples.sort((a, b) => a[value].localeCompare(b[value]));
    }
    displayApples(apples);
  });

  searchInput.addEventListener("input", () => {
    const filtered = apples.filter(apple =>
      apple.Name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    displayApples(filtered);
  });

  displayApples(apples);
});
