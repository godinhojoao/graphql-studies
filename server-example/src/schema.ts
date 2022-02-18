import { gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    getBooks: [Book!]
    getBook(id: Int!): Book
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book
    updateBook(id: Int!, input: UpdateBookInput!): Book
    deleteBook(id: Int!): Book
  }

  type Book {
    id: Int!
    title: String!
    author: String!
    archived: Boolean
  }

  input CreateBookInput {
    title: String @constraint(maxLength: 80)
    author: String
    archived: Boolean
  }

  input UpdateBookInput {
    title: String @constraint(maxLength: 80)
    author: String
  }
`

export { typeDefs }
