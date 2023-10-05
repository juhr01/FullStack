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

/*   let authors = [
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
]
 */
const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
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
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {}

      if (args.author) {
        query.author = args.author
      }

      if (args.genre) {
        query.genre = args.genre
      }

      const books = await Book.find(query).populate('author')
      return books

      /* if (!args.author && !args.genre) {
        return Book
      }
      if (args.author && !args.genre) {
        return Book.filter(book => book.author === args.author)
      }

      if (!args.author && args.genre) {
        return Book.filter(book => book.genres.includes(args.genre))
      }

      if (args.author && args.genre) {
        const filteredBooks = Book.filter(book => book.genres.includes(args.genre))
        return filteredBooks.filter(book => book.author === args.author)
      }
       */
    },
    allAuthors: async () => {
      const authors = await Author.find()
      return authors
    },
  },
  Mutation: {
    addBook: async (root, args) => {

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({
          name: args.author
        })
       await author.save()
      }

      const newBook = new Book ({
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres,
      })
      await newBook.save()
      return newBook
    },
    newAuthor: (root, args) => {
      const authorExists = Find.find(author => author.name === args.name)
        if (authorExists) {
          throw new Error("Author already exists")
        }
        
        const newAuthor = {
          name: args.name
        }

        Author.push(newAuthor)
        return newAuthor
    },
    editAuthor: (root, args) => {
      const author = Author.find(author => author.name === args.name)
      
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
    author: async (root) => root.author,
    id: (root) => root.id,
    genres: (root) => root.genres
  },
  Author: {
    bookCount: async (root) => {
      const authorName = root.name

      const bookCount = await Book.countDocuments({ author: authorName })
      return bookCount
    },
    born: (root) => {
      return root.born !== undefined ? root.born : null
    }
  }
}

startServer();
/* 
async function populateCollections() {
  try {
    await Author.deleteMany()
    await Book.deleteMany()
    // Insert authors into the 'authors' collection
    const insertedAuthors = await Author.insertMany(authors);

    // Update 'author' references in books
    const authorMap = {}; // Map author names to their corresponding MongoDB _id
    insertedAuthors.forEach((author) => {
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
populateCollections() */