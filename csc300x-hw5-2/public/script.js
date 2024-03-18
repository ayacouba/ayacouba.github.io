document.addEventListener("DOMContentLoaded", function () {
  const jokeDisplay = document.getElementById("joke-display");
  const categoryList = document.getElementById("category-list");
  const jokeCategorySelect = document.getElementById("joke-category");
  const newJokeForm = document.getElementById("new-joke-form");

  async function fetchCategories() {
    try {
      const response = await fetch("/jokebook/categories");
      const categories = await response.json();

      categoryList.innerHTML = "";
      jokeCategorySelect.innerHTML = "";

      categories.forEach((category) => {
        const listItem = document.createElement("li");
        listItem.textContent = category;
        categoryList.appendChild(listItem);

        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        jokeCategorySelect.appendChild(option);
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }
  async function fetchRandomJoke() {
    try {
      const response = await fetch("/jokebook/random-joke");
      const jokeData = await response.json();
      jokeDisplay.textContent = `${jokeData.joke} - ${jokeData.response}`;
    } catch (error) {
      console.error("Failed to fetch a random joke:", error);
      jokeDisplay.textContent = "Failed to load joke.";
    }
  }

  document
    .getElementById("random-joke-btn")
    .addEventListener("click", fetchRandomJoke);

  newJokeForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const joke = document.getElementById("new-joke").value;
    const response = document.getElementById("new-response").value;
    const category = jokeCategorySelect.value;

    try {
      const postResponse = await fetch("/jokebook/joke/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, joke, response }),
      });

      if (!postResponse.ok) {
        throw new Error("Joke submission failed");
      }

      const newJokes = await postResponse.json();
      console.log(newJokes);
      alert("Joke added successfully!");

      // Clear form fields after successful submission
      document.getElementById("new-joke").value = "";
      document.getElementById("new-response").value = "";
    } catch (error) {
      console.error("Failed to submit new joke:", error);
      alert("Failed to add joke. Please try again.");
    }
  });

  // Initial fetch of categories
  fetchCategories();
});
