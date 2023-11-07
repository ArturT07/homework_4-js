fetch("https://ajax.test-danit.com/api/swapi/films")
    .then(response => response.json())
    .then(data => {

      displayFilms(data);
    })
    .catch(error => {
      console.error("Помилка отримання списку фільмів: " + error);
    });

function displayFilms(films) {
    const filmList = document.getElementById("film-list");


    films.sort((a, b) => a.episodeId - b.episodeId);

    films.forEach(film => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `Епізод ${film.episodeId}: ${film.name}<br>${film.openingCrawl}`;
        listItem.addEventListener("click", () => {

            fetchCharacters(film);
        });

        filmList.appendChild(listItem);
    });
}


function fetchCharacters(film) {
  const characters = film.characters;
  const characterPromises = characters.map(characterUrl => fetch(characterUrl));

  Promise.all(characterPromises)
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(characterData => {

        displayCharacters(film, characterData);
      })
      .catch(error => {
        console.error("Помилка отримання персонажів: " + error);
      });
}

function displayCharacters(film, characters) {
  const characterList = document.getElementById("character-list");
  characterList.innerHTML = "";

  const filmTitle = document.createElement("h2");
  filmTitle.innerHTML = `Персонажі фільму "${film.name}"`;
  characterList.appendChild(filmTitle);

  characters.forEach(character => {
    const characterName = document.createElement("p");
    characterName.innerHTML = character.name;
    characterList.appendChild(characterName);
  });
}
