import { useEffect, useState } from "react";
import "../styles/PokemonCard.css";

function PokemonCard() {
  const [pokemonData, setPokemonData] = useState(null);
  const [themeColor, setThemeColor] = useState("");

  const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };

  const url = "https://pokeapi.co/api/v2/pokemon/";

  const getPokeData = () => {
    const id = Math.floor(Math.random() * 150) + 1;
    const finalUrl = url + id;
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
        setThemeColor(typeColor[data.types[0].type.name]);
      });
  };

    useEffect(() =>{
        getPokeData()
    },[]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const hp = pokemonData.stats[0].base_stat;
  const imgSrc = pokemonData.sprites.other.dream_world.front_default;
  const pokeName = pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1);
  const statAttack = pokemonData.stats[1].base_stat;
  const statDefense = pokemonData.stats[2].base_stat;
  const statSpeed = pokemonData.stats[5].base_stat;

  const cardStyle = {
    background: `radial-gradient(circle at 50% 0%, ${themeColor} 36%, #ffffff 36%)`,
  };

  return (
    <div className="container">
      <div id="card" style={cardStyle}>
        <p className="hp">
          <span>HP</span>
          {hp}
        </p>
        <img src={imgSrc || "/placeholder.svg"} alt={pokeName} />
        <h2 className="poke-name">{pokeName}</h2>
        <div className="types">
          {pokemonData.types.map((item, index) => (
            <span key={index} style={{ backgroundColor: themeColor }}>
              {item.type.name}
            </span>
          ))}
        </div>
        <div className="stats">
          <div>
            <h3>{statAttack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>{statDefense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>{statSpeed}</h3>
            <p>Speed</p>
          </div>
        </div>
      </div>
      <button id="btn" onClick={getPokeData}>
        Generate
      </button>
    </div>
  );
}

export default PokemonCard;