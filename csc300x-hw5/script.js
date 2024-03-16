document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  const searchField = document.getElementById("search-field");
  const gallery = document.getElementById("gallery");

  searchButton.addEventListener("click", () => {
    const username = searchField.value.trim();
    if (username) {
      fetchRepositories(username);
    }
  });

  async function fetchNumberOfCommits(username, repoName) {
    const commitsResponse = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/commits`
    );
    const commmitsData = await commitsResponse.json();
    return commmitsData.length;
  }

  async function fetchRepositories(username) {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      if (!response.ok) {
        throw new Error(`Fetching repositories failed`);
      }
      const repositories = await response.json();
      gallery.innerHTML = "";
      for (const repo of repositories) {
        const commitCount = await fetchNumberOfCommits(username, repo.name);

        gallery.innerHTML += `
        <div class="card">
         <a href="${repo.html_url}" class="repo-name">
            <i class="fab fa-github"></i>
            <span>${repo.name}</span>
          </a>
          <span class="stars"> 
           <i class="fa fa-star"></i>
           <span> ${repo.stargazers_count} </span>
          </span>
          <p class="description">${repo.description}</p>
          <ul class="details">
          <li>Commits: ${commitCount}</li>
          <li>Created: ${new Date(repo.created_at).toDateString()}</li>
          <li>Updated: ${new Date(repo.updated_at).toDateString()}</li>
          <li>Watchers: ${repo.watchers_count}</li>
          </ul>
          <span class="language">${repo.language}</span>
          </div>
        `;
      }
    } catch (error) {
      gallery.innerHTML += `<p> Error fetching repositories: ${error.message} </p>`;
    }
  }
});
