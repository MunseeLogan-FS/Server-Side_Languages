const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(express.json());

async function getPokemonData(id) {
  console.log(id);
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      throw new Error("Network response not OK");
    }
    const data = await response.json();
    const name = data.name;
    const height = data.height;
    const weight = data.weight;
    const types = data.types.map((type) => type.type.name);

    const getSpecies = await fetch(data.species.url);
    if (!getSpecies.ok) throw new Error("Failed to fetch species");
    const speciesData = await getSpecies.json();

    const englishFlavor = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const flavorText = englishFlavor.flavor_text.replace(/\f|\n/g, " ");
    const habitat = speciesData.habitat.name;
    const legendary = speciesData.is_legendary;

    // console.log(speciesData);
    return {
      name,
      height,
      weight,
      types,
      flavorText,
      habitat,
      legendary,
    };
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function assignmentTask() {
  const randomID = Math.floor(Math.random() * 151) + 1;
  const pokemon = await getPokemonData(randomID);
  console.log(pokemon);
}

assignmentTask();

module.exports = app;
