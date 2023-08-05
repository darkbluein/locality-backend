import gql from "graphql-tag";

const typedefs = gql`
  type User {
    name: String
  }
`;

export default typedefs;
