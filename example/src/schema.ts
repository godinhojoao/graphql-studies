import { gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    books: [Book!]
    book(id: Int!): Book
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
    title: String
    author: String
    archived: Boolean
  }

  input UpdateBookInput {
    title: String
    author: String
  }
`

export { typeDefs }
