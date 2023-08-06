import gql from "graphql-tag";

export const userTypeDefs = gql`
  type UserType {
    name: String
    storeOwner: Boolean
    contact: ContactType
    lastLoginAt: String
    addressBook: [String]
    accounts: [String]
    status: UserStatusEnum
  }
  type ContactType {
    ISD: String
    number: String
  }
  enum UserStatusEnum {
    ACTIVE
    IN_ACTIVE
    DELETED
  }

  input ContactInputType {
    ISD: String
    number: String
  }
`;
