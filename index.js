const imagePromises = [];
const favorites = [];
let dogImages = [];

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

    // Create cards for images
    dataArray.forEach((data) => {
      const dogCard = document.createElement("div");
      dogCard.className = "dog-card";

      const imgElement = document.createElement("img");
      imgElement.src = data.message;
      imgElement.alt = "Picture of a dog";

      dogCard.appendChild(imgElement);
      dogImages.push(dogCard);
      dogImagesContainer.appendChild(dogCard);
    });
  })
  .catch((err) => {
    console.error("Error fetching images", err);
  });
