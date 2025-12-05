// DOM elements

// search div
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-bar");

// creature div
const idNum = document.getElementById("creature-id");
const crName = document.getElementById("creature-name");
const height = document.getElementById("height");
const weight = document.getElementById("weight");

// types
const types = document.getElementById("types");

// creature ability
const ability = document.getElementById("ability-name");
const descr = document.getElementById("ability-descr");

// stat values
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

// APIs
const validCreatures = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const creatureUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

// clear types before each search
const clearTypes = () => types.innerHTML = "";

// validate search input
const search = async () => {
    try {
        const nameId = searchInput.value.toLowerCase();
        const res = await fetch(`${creatureUrl}${nameId}`);
        if (!res.ok) {
            throw new Error();
        }
        const data = await res.json();

        // creature information
        idNum.textContent = `#${data.id}`;
        crName.textContent = `${data.name.toUpperCase()}`;
        height.textContent = `Height: ${data.height}`;
        weight.textContent = `Weight: ${data.weight}`;
        ability.textContent = `Ability: ${data.special.name}`;
        descr.textContent = data.special.description;
        // types
        types.innerHTML = data.types.map(el => `<span class="type ${el.name}">${el.name}</span>`).join("");
        // creature stats
        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        spAttack.textContent = data.stats[3].base_stat;
        spDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;
    } catch (error) {
        resetValues();
        alert("Creature not found");
    }
}

searchBtn.addEventListener("click", () => {
    search();
})
searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        search();
    }
})