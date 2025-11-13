// frontend/app.js

const API_URL = "http://localhost:3000/api/exhibits";

const tableBody = document.querySelector("#exhibit-table tbody");
const form = document.querySelector("#exhibit-form");
const idField = document.querySelector("#exhibit-id");
const titleField = document.querySelector("#title");
const descField = document.querySelector("#description");
const originField = document.querySelector("#origin");
const eraField = document.querySelector("#era");
const yearField = document.querySelector("#year");
const displayField = document.querySelector("#display");

// Load all exhibits when the page opens
async function loadExhibits() {
  tableBody.innerHTML = "<tr><td colspan='7'>Loading...</td></tr>";
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    tableBody.innerHTML = "";
    data.forEach(ex => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${ex.id}</td>
        <td>${ex.exhibit_title}</td>
        <td>${ex.origin}</td>
        <td>${ex.era}</td>
        <td>${ex.year_discovered}</td>
        <td>${ex.on_display ? "Yes" : "No"}</td>
        <td>
          <button onclick="editExhibit(${ex.id})">Edit</button>
          <button onclick="deleteExhibit(${ex.id})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan='7'>Error loading data</td></tr>`;
  }
}

// Handle form submit (add or update)
form.addEventListener("submit", async e => {
  e.preventDefault();
  const exhibit = {
    exhibit_title: titleField.value,
    description: descField.value,
    origin: originField.value,
    era: eraField.value,
    year_discovered: parseInt(yearField.value),
    on_display: displayField.value === "true"
  };

  try {
    if (idField.value) {
      // Update existing
      await fetch(`${API_URL}/${idField.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exhibit)
      });
      alert("Exhibit updated!");
    } else {
      // Create new
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exhibit)
      });
      alert("Exhibit added!");
    }

    form.reset();
    idField.value = "";
    loadExhibits();
  } catch (err) {
    alert("Error saving exhibit.");
  }
});

// Edit exhibit (loads data into form)
async function editExhibit(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const ex = await res.json();
    idField.value = ex.id;
    titleField.value = ex.exhibit_title;
    descField.value = ex.description;
    originField.value = ex.origin;
    eraField.value = ex.era;
    yearField.value = ex.year_discovered;
    displayField.value = ex.on_display ? "true" : "false";
    window.scrollTo({ top: form.offsetTop, behavior: "smooth" });
  } catch (err) {
    alert("Error loading exhibit for edit.");
  }
}

// Delete exhibit
async function deleteExhibit(id) {
  if (!confirm("Delete this exhibit?")) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadExhibits();
  } catch (err) {
    alert("Error deleting exhibit.");
  }
}

// Load everything on page start
loadExhibits();