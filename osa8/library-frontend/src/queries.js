import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const ALL_BOOKS = gql`
query {
allBooks {
    title
    author {
      name
    }
    published
    genres
    id
    }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}
`
export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
        name: $name,
        born: $born
    ) {
        name
        born
    }
}
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const FAVORITE_GENRE = gql`
{
  me {
    favoriteGenre
  }
}`

export const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  id
  title
  author {
    name
    born
    bookCount
  }
  published
  genres
}
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded  {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`