import { CardContainer, PokeType } from "./style";
import { API } from "../../services";
import { useState } from "react";
import { useEffect } from "react";
export const PokemonCard = ({ pokemonName }) => {
  const [pokemonInfo, setPokemonInfo] = useState("");
  const [reload, setReload] = useState(true);
  const [isShiny, setShiny] = useState(false);
  useEffect(() => {
    API.get(`/pokemon-form/${pokemonName}`).then((res) => {
      setPokemonInfo(res.data);
    });
  }, []);

  useEffect(() => {
    setShiny(false);
    setReload(false);
    API.get(`/pokemon-form/${pokemonName}`).then((res) => {
      setPokemonInfo(res.data);

      setReload(true);
    });
  }, [pokemonName]);

  const setImage = () => {
    let img = document.getElementById(`img${pokemonInfo.id}`);
    let container = img.parentNode;

    if (img.src === pokemonInfo.sprites.front_default) {
      img.src = pokemonInfo.sprites.back_default;
      container.removeChild(img);
      container.prepend(img);
      setShiny(false);
    } else if (img.src === pokemonInfo.sprites.back_default) {
      if (pokemonInfo.sprites.front_shiny != null) {
        img.src = pokemonInfo.sprites.front_shiny;
        container.removeChild(img);
        container.prepend(img);
        console.log(container.firstChild);
        setShiny(true);
      } else {
        img.src = pokemonInfo.sprites.front_default;
        container.removeChild(img);
        container.prepend(img);
        setShiny(false);
      }
    } else if (img.src === pokemonInfo.sprites.front_shiny) {
      img.src = pokemonInfo.sprites.back_shiny;
      container.removeChild(img);
      container.prepend(img);
      setShiny(true);
    } else if (img.src === pokemonInfo.sprites.back_shiny) {
      img.src = pokemonInfo.sprites.front_default;
      container.removeChild(img);
      container.prepend(img);
      setShiny(false);
    }
  };
  return pokemonInfo.length != "" && reload === true ? (
    <CardContainer onClick={() => setImage()}>
      <figure>
        <img
          id={`img${pokemonInfo.id}`}
          src={pokemonInfo.sprites.front_default}
          alt=""
          srcset=""
        />
      </figure>

      {pokemonInfo.id.toString().length === 1 ? (
        <span>N°00{pokemonInfo.id}</span>
      ) : pokemonInfo.id.toString().length === 2 ? (
        <span>N°0{pokemonInfo.id}</span>
      ) : (
        <span>N°{pokemonInfo.id} </span>
      )}
      <h2>
        {pokemonInfo.name} {isShiny === true ? <span>Shiny</span> : ""}
      </h2>
      <div>
        {pokemonInfo.types.map((item) => (
          <PokeType type={item.type.name}>{item.type.name}</PokeType>
        ))}
      </div>
    </CardContainer>
  ) : (
    ""
  );
};