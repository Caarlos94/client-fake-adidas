import React from "react";
import Autosuggest from "react-autosuggest";
import { Sugest } from "../../interfaces/interfaces";
import "./autosuges.css";
import { useMyContext } from "../../index";
import { BiSearchAlt2 } from "react-icons/bi";
import { IconContext } from "react-icons";

const categories: Sugest[] = [
  { id: 1, category: "CALZADO" },
  { id: 2, category: "PLAYERAS" },
  { id: 3, category: "SUDADERAS" },
  { id: 4, category: "PANTS" },
  { id: 5, category: "JERSEY" },
];

export default function AutoSuggestFn({ setBtnValue }) {
  const propsContext = useMyContext();
  const inputRef = React.useRef<HTMLButtonElement>(null);
  const [value, setValue] = React.useState("");
  const [category, setCategory] = React.useState(categories);

  const filterCategories = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    var filtrado = categories.filter((cat) => {
      if (cat.category.toLocaleLowerCase().includes(inputValue)) return cat;
    });
    return inputLength === 0 ? [] : filtrado;
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setCategory(filterCategories(value));
  };

  const onSuggestionsClearRequested = () => {
    setCategory([]);
  };

  // Es una función que toma una sugerencia y devuelve el valor que se mostrará en el campo de entrada cuando esa sugerencia se seleccione.
  const getSuggestionValue = (suggestion: Sugest) => {
    return `${suggestion.category}`;
  };

  const renderSuggestion = (suggestion: Sugest) => {
    return <div>{suggestion.category}</div>;
  };

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Buscar",
    value,
    onChange,
  };

  function handleClick() {
    setBtnValue("any");
    if (propsContext) {
      propsContext.setSearch(value.toLocaleLowerCase());
      propsContext.setButton((prevStatus) => !prevStatus);
    }
    setValue("");
  }

  return (
    <div className="autosuggest-container">
      <Autosuggest
        suggestions={category}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />

      <IconContext.Provider value={{ size: "22px" }}>
        <button
          ref={inputRef}
          className="button-icon-autosuggest"
          onClick={handleClick}
        >
          <BiSearchAlt2 />
        </button>
      </IconContext.Provider>
    </div>
  );
}
