const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuidv4 } = require('uuid')
const config = require('./config')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('strictQuery', false)

async function startServer() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.info('Connected to MongoDB');

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: config.PORT },
    });

    console.log(`Server ready at ${url}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}


/* let authors = [
  {
    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
  },
  { 
    name: 'Sandi Metz', // birthyear not known
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution']
  },
] */

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    newAuthor(
      name: String!
    ): Author

    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books
      }
      if (args.author && !args.genre) {
        return books.filter(book => book.author === args.author)
      }

      if (!args.author && args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      }

      if (args.author && args.genre) {
        const filteredBooks = books.filter(book => book.genres.includes(args.genre))
        return filteredBooks.filter(book => book.author === args.author)
      }
      
    },
    allAuthors: () => authors,
  },
  Mutation: {
    addBook: (root, args) => {

      let author = authors.find(author => author.name === args.author)

      if (!author) {
        author = {
          name: args.author,
          id: uuidv4()
        }
        
        authors.push(author)
      }

      const newBook = {
        title: args.title,
        author: args.author,
        published: args.published,
        genres: args.genres,
        id: uuidv4()
      }
      books.push(newBook)
      return newBook
    },
    newAuthor: (root, args) => {
      const authorExists = authors.find(author => author.name === args.name)
        if (authorExists) {
          throw new Error("Author already exists")
        }
        
        const newAuthor = {
          name: args.name
        }

        authors.push(newAuthor)
        return newAuthor
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name)
      
      if (!author) {
        return null
      }

      author.born = args.born
      return author
    }
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    id: (root) => root.id,
    genres: (root) => root.genres
  },
  Author: {
    bookCount: (root) => {
      return books.filter(book => book.author === root.name).length
    },
    born: (root) => {
      return root.born !== undefined ? root.born : null
    }
  }
}

startServer();

/* async function populateCollections() {
  try {
    // Clear existing data (optional)
    await Author.deleteMany({});
    await Book.deleteMany({});

    // Insert authors into the 'authors' collection
    await Author.insertMany(authors);

    // Update 'author' references in books
    const authorMap = {}; // Map author names to their corresponding MongoDB _id
    authors.forEach((author) => {
      authorMap[author.name] = author._id;
    });
    books.forEach((book) => {
      book.author = authorMap[book.author];
    });

    // Insert books into the 'books' collection
    await Book.insertMany(books);

    console.log('Data has been inserted into MongoDB collections.');
  } catch (error) {
    console.error('Error populating collections:', error.message);
  } finally {
    mongoose.disconnect(); // Close the MongoDB connection
  }
}

// Call the function to populate the collections
populateCollections(); */