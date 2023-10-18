const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const config = require('./config')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

mongoose.set('strictQuery', false)

/* async function startServer() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.info('Connected to MongoDB');

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: config.PORT },
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7), process.env.JWT_SECRET
          )
          const currentUser = await User
            .findById(decodedToken.id).populate('favoriteGenre')
          return { currentUser }
        }
      },
    });

    console.log(`Server ready at ${url}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

startServer(); */

// setup is now within a function
const start = async () => {
  try {
    mongoose.connect(config.MONGODB_URI)
    console.info('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
  }
  
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  })

  await server.start()
  
  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id).populate(
            'favoriteGenre'
          )
          return { currentUser }
        }
      },
    }),
  )
  const PORT = config.PORT
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}
start()

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