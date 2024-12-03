const imagePromises = [];
const favorites = [];
let dogImages = [];
let favoriteImages = [];

for (let i = 0; i < 30; i++) {
  imagePromises.push(fetch("https://dog.ceo/api/breeds/image/random"));
}

Promise.all(imagePromises)
  .then((res) => {
    return Promise.all(
      res.map((res) => {
        if (!res.ok) {
          throw new Error("Response failed");
        }
        return res.json();
      })
    );
  })
  .then((dataArray) => {
    const dogImagesContainer = document.getElementById("dog-images-container");
    const favoritesContainer = document.getElementById("favorites-container");

    // Create cards for images
    dataArray.forEach((data) => {
      const dogCard = document.createElement("div");
      dogCard.className = "dog-card";

      const imgElement = document.createElement("img");
      imgElement.src = data.message;
      imgElement.alt = "Picture of a dog";

      const addToFavoritesButton = document.createElement("button");
      addToFavoritesButton.textContent = "Add to Favorites";
      addToFavoritesButton.addEventListener("click", () => {
        addToFavorites(data, dogCard);
      });

      dogCard.appendChild(imgElement);
      dogCard.appendChild(addToFavoritesButton);

      dogImages.push(dogCard);
      dogImagesContainer.appendChild(dogCard);
    });

    // function to add item to favorites
    function addToFavorites(data, dogCard) {
      dogImagesContainer.removeChild(dogCard);
      favorites.push({ data });

      const favoriteCard = document.createElement("div");
      favoriteCard.className = "dog-card";

      const imgElement = document.createElement("img");
      imgElement.src = data.message;
      imgElement.alt = "Dog Image";

      const removeFromFavoritesButton = document.createElement("button");
      removeFromFavoritesButton.textContent("Remove from Favorites");
      removeFromFavoritesButton.addEventListener("click", () => {
        removeFromFavoritesButton(data, favoriteCard);
      });
      favoriteCard.appendChild(imgElement);
      favoriteCard.appendChild(removeFromFavoritesButton);

      favoriteImages.push(favoriteCard);
      favoritesContainer.appendChild(favoriteCard);
    }
  })
  .catch((err) => {
    console.error("Error fetching images", err);
  });
