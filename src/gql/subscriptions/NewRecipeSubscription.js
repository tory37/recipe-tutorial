import gql from "graphql-tag";

export default gql`
  subscription newRecipeSub {
    onCreateRecipe {
      name
      id
      ingredients
      instructions
    }
  }
`;
