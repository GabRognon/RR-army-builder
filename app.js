let units = [];
let army = JSON.parse(localStorage.getItem("army")) || [];

const unitSelect = document.getElementById("unitSelect");
const armyList = document.getElementById("armyList");
const totalCostEl = document.getElementById("totalCost");

fetch("data/units.json")
  .then(response => response.json())
  .then(data => {
    units = data;
    populateUnitSelect();
    renderArmy();
  });

function populateUnitSelect() {
  units.forEach(unit => {
    const option = document.createElement("option");
    option.value = unit.id;
    option.textContent = `${unit.name} (${unit.cost} pts)`;
    unitSelect.appendChild(option);
  });
}

document.getElementById("addUnit").addEventListener("click", () => {
  const selectedId = unitSelect.value;
  army.push(selectedId);
  saveArmy();
  renderArmy();
});

function renderArmy() {
  armyList.innerHTML = "";
  let total = 0;

  army.forEach(unitId => {
    const unit = units.find(u => u.id === unitId);
    if (!unit) return;

    const li = document.createElement("li");
    li.textContent = `${unit.name} - ${unit.cost} pts`;
    armyList.appendChild(li);
    total += unit.cost;
  });

  totalCostEl.textContent = total;
}

function saveArmy() {
  localStorage.setItem("army", JSON.stringify(army));
}
