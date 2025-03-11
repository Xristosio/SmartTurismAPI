document
  .getElementById("filterForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const criterion = document.getElementById("criterion").value;
    const type = document.getElementById("type").value;
    const limit = document.getElementById("limit").value;

    const apiUrl = `http://localhost:3000/api/v1/tourism/filter?criterion=${criterion}&type=${type}&limit=${limit}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Clear previous results
      const tbody = document.querySelector("#resultsTable tbody");
      tbody.innerHTML = "";

      if (data) {
        data.data.forEach((country) => {
          console.log(country);
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${country.Country}</td>
            <td>${country.QualityOfLife}</td>
            <td>${country.Adventure}</td>
            <td>${country.Heritage}</td>
            <td>${country.CostOfLivingIndex}</td>
            <td>${country.RestaurantPriceIndex}</td>
          `;
          tbody.appendChild(row);
        });
      } else {
        tbody.innerHTML = `<tr><td colspan="6">No results found.</td></tr>`;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      const tbody = document.querySelector("#resultsTable tbody");
      tbody.innerHTML = `<tr><td colspan="6">Error fetching data. Please try again.</td></tr>`;
    }
  });
