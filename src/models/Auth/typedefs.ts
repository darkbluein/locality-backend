import gql from "graphql-tag";

export const authTypeDefs = gql`
  type Auth {
    id: ID!
    code: Int
    contact: ContactType
    messagingSid: String
    status: AuthStatusEnum
  }
  enum AuthStatusEnum {
    VERIFIED
    UNVERIFIED
  }

  input VerifyCodeInput {
    id: String
    code: Int
  }

  type Query {
    status: Boolean
  }
  type Mutation {
    generateCode(contact: ContactInputType): String
    verifyCode(verifyCodeDto: VerifyCodeInput): Boolean
  }
`;
