let units = [];
let weapon1 = [];
let weapon2 = [];
let options = [];
let featFlaw = [];
let featMonstruous = [];
let featSupernatural = [];
let featStandard = [];

let army = JSON.parse(localStorage.getItem("army")) || [];

const unitSelect = document.getElementById("unitSelect");
const optionSelect = document.getElementById("optionSelect");
const weapon1Select = document.getElementById("weapon1Select");
const weapon2Select = document.getElementById("weapon2Select");
const armyList = document.getElementById("armyList");
const totalCostEl = document.getElementById("totalCost");

fetch("data/Armes.json")
  .then(response => response.json())
  .then(data => {
    weapon1 = data;
	weapon1.forEach(weapon => {
		if(weapon.range > 0){
			weapon2.push(weapon);
		}
	};
    populateweapon(weapon1,weapon1Select);
    populateweapon(weapon2,weapon2Select);
  });
  
 fetch("data/options.json")
  .then(response => response.json())
  .then(data => {
    options = data;
    populateoptionSelect();
   });
  
fetch("data/units.json")
  .then(response => response.json())
  .then(data => {
    units = data;
    populateUnitSelect();
    renderArmy();
  });


  
function populateOptionSelect() {
  options.forEach(optionsi => {
    const option = document.createElement("option");
    option.value = optionsi.id;
    option.textContent = `${optionsi.name} pts)`; 
		var li = $('<li/>')
            .addClass('ui-menu-item')
            .attr('role', 'menuitem')
            .appendTo(optionSelect);

        var input = $('<input/>')
            .addClass('ui-all')
            .attr('type', 'checkbox')
            .appendTo(li);

       var aaa = $('<a/>')
            .addClass('ui-all')
            .text(optionsi.name)
            .appendTo(li);
  });
}
  
function populateUnitSelect() {
  units.forEach(unit => {
    const option = document.createElement("option");
    option.value = unit.id;
    option.textContent = `${unit.name} (${unit.cost} pts)`;
    unitSelect.appendChild(option);
  });
}

function populateweapon(source, target) {
  source.forEach(weapon => {
    const option = document.createElement("option");
    option.value = weapon.id;
    option.textContent = `${weapon.name} (${weapon.cost} pts)`;
    target.appendChild(option);
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


