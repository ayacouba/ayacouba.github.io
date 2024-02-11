document.addEventListener("DOMContentLoaded", () => {
  const dishes = [
    { name: "Cheese Pizza", price: 17.99, restaurant: "New York Pizza" },
    {
      name: "Sicilian Cheese Pizza",
      price: 23.99,
      restaurant: "New York Pizza",
    },
    { name: "Gluten Free Pizza", price: 12.99, restaurant: "New York Pizza" },
    {
      name: "Buffalo Chicken Pizza",
      price: 25.0,
      restaurant: "New York Pizza",
    },
    { name: "Pesto Pizza", price: 24.5, restaurant: "New York Pizza" },
    { name: "Caprese Pizza", price: 24.0, restaurant: "New York Pizza" },
    { name: "California Roll", price: 6.5, restaurant: "Sushi Republic" },
    { name: "Alaska Roll", price: 8.0, restaurant: "Sushi Republic" },
    { name: "Tuna Roll", price: 7.0, restaurant: "Sushi Republic" },
    { name: "Greensboro Roll", price: 12.0, restaurant: "Sushi Republic" },
    {
      name: "Crunchy Spicy Tuna Wrap",
      price: 12.0,
      restaurant: "Sushi Republic",
    },
    { name: "Island Roll", price: 11.5, restaurant: "Sushi Republic" },
    { name: "Creamy Avocado Boba", price: 7.0, restaurant: "Boba House" },
    { name: "Pineapple Boba", price: 12.0, restaurant: "Boba House" },
    { name: "Pina Colada Boba", price: 7.0, restaurant: "Boba House" },
    { name: "Eternal Bliss", price: 10.0, restaurant: "Boba House" },
    { name: "Stir Fried Green Beans", price: 10.0, restaurant: "Boba House" },
    { name: "Pad Thai", price: 1.0, restaurant: "Boba House" },
  ];

  const mealOptions = document.getElementById("meal-options");

  dishes.forEach((dish) => {
    const dishElement = document.createElement("div");
    dishElement.classList.add("dish-option");
    dishElement.innerHTML = `
      <h3>${dish.name} - ${dish.restaurant}</h3>
      <p>$${dish.price.toFixed(2)}</p>
      <button>Add to Meal Plan</button>
    `;
    dishElement
      .querySelector("button")
      .addEventListener("click", () => addToMealPlan(dish.name, dish.price));
    mealOptions.appendChild(dishElement);
  });

  function addToMealPlan(dishName, price) {
    const mealList = document.getElementById("meal-list");
    const li = document.createElement("li");
    li.textContent = `${dishName} - $${price.toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      removeFromMealPlan(li, price);
    };

    li.appendChild(removeButton);
    mealList.appendChild(li);

    updateTotal(price);
  }

  function removeFromMealPlan(item, price) {
    item.remove();
    updateTotal(-price);
  }

  function updateTotal(addAmount) {
    const totalAmountSpan = document.getElementById("total-amount");
    let currentTotal = parseFloat(totalAmountSpan.textContent.replace("$", ""));
    currentTotal += addAmount;
    totalAmountSpan.textContent = `$${currentTotal.toFixed(2)}`;
  }
});
