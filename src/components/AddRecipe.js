import React, { useState, useEffect } from "react";
import { css } from "glamor";
import { graphql } from "react-apollo";

import CreateRecipe from "gql/mutations/CreateRecipe";
import ListRecipes from "gql/queries/ListRecipes";

const AddRecipe = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState([]);

  const addInstrution = () => {
    if (instruction === "") return;
    setInstructions([...instructions, instruction]);
  };

  const addIngredient = () => {
    if (ingredient === "") return;
    setIngredients([...ingredients, ingredient]);
  };

  const addRecipe = () => {
    onAdd({
      ingredients,
      instructions,
      name
    });

    resetState();
  };

  const resetState = () => {
    setName("");
    setIngredient("");
    setIngredients([]);
    setInstruction("");
    setInstructions([]);
  };

  return (
    <div {...css(styles.container)}>
      <h2>Create Recipe</h2>

      <input
        value={name}
        onChange={evt => setName(evt.target.value)}
        placeholder="Recipe name"
        {...css(styles.input)}
      />

      <div>
        <p>Recipe Ingredients:</p>
        {ingredients && ingredients.map((ing, i) => <p key={i}>{ing}</p>)}
      </div>

      <input
        value={ingredient}
        onChange={evt => setIngredient(evt.target.value)}
        placeholder="Ingredient"
        {...css(styles.input)}
      />
      <button onClick={addIngredient} {...css(styles.button)}>
        Add Ingredient
      </button>

      <div>
        <p>Recipe Instructions:</p>
        {instructions &&
          instructions.map((inst, i) => <p key={i}>{`${i + 1}. ${inst}`}</p>)}
      </div>

      <input
        value={instruction}
        onChange={evt => setInstruction(evt.target.value)}
        placeholder="Instruction"
        {...css(styles.input)}
      />
      <button onClick={addInstrution} {...css(styles.button)}>
        Add Instruction
      </button>

      <div {...css(styles.submitButton)} onClick={addRecipe}>
        <p>Add Recipe</p>
      </div>
    </div>
  );
};

export default graphql(CreateRecipe, {
  props: props => ({
    onAdd: recipe =>
      props.mutate({
        variables: recipe,
        optimisticResponse: {
          __typename: "Mutation",
          createRecipe: { ...recipe, __typename: "Recipe" }
        },
        update: (proxy, { data: { createRecipe } }) => {
          const data = proxy.readQuery({ query: ListRecipes });
          data.listRecipes.items.push(createRecipe);
          proxy.writeQuery({ query: ListRecipes, data });
        }
      })
  })
})(AddRecipe);

const styles = {
  button: {
    border: "none",
    background: "rgba(0, 0, 0, .1)",
    width: 250,
    height: 50,
    cursor: "pointer",
    margin: "15px 0px"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 100,
    paddingRight: 100,
    textAlign: "left"
  },
  input: {
    outline: "none",
    border: "none",
    borderBottom: "2px solid #00dd3b",
    height: "44px",
    fontSize: "18px"
  },
  textarea: {
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "18px"
  },
  submitButton: {
    backgroundColor: "#00dd3b",
    padding: "8px 30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.85,
    cursor: "pointer",
    ":hover": {
      opacity: 1
    }
  }
};
