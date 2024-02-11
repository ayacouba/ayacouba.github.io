document.addEventListener("DOMContentLoaded", function () {
  const dishes = document.querySelectorAll(".dish");

  dishes.forEach((dish) => {
    dish.addEventListener("click", function () {
      document.querySelectorAll(".dish-description").forEach((desc) => {
        desc.style.display = "none";
      });
      this.querySelector(".dish-description").style.display = "block";
    });
  });
});
