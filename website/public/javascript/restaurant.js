document.addEventListener("DOMContentLoaded", function () {
  const restaurantImages = document.querySelectorAll(".restaurant-image");

  restaurantImages.forEach(function (imageContainer) {
    const img = imageContainer.querySelector("img");
    const restaurantInfo = imageContainer.querySelector(".restaurant-info");

    imageContainer.addEventListener("mouseenter", function () {
      restaurantInfo.style.display = "block";
    });

    imageContainer.addEventListener("mouseleave", function () {
      restaurantInfo.style.display = "none";
    });
  });
});
