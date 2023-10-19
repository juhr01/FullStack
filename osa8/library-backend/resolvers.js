const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const config = require('./config')

const resolvers = {
    Query: {
      me: (root, args, context) => {
        return context.currentUser
      },
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        let query = {}
  
        if (args.author) {
          // Find the author document by name
          const author = await Author.findOne({ name: args.author });
  
          if (author) {
            // If the author is found, filter books by author's ObjectId
            query.author = author._id;
          } else {
            // If the author is not found, return an empty array
            return [];
          }
        }
  
        if (args.genre) {
          query.genres = args.genre
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
      addBook: async (root, args, context) => {
  
        let author = await Author.findOne({ name: args.author })
  
        if (!author) {
          author = new Author({
            name: args.author
          })
  
          try {
            await author.save()
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author.name,
                error
              }
            })
          }
        }
  
        const newBook = new Book({
          title: args.title,
          author: author._id,
          published: args.published,
          genres: args.genres,
        })
  
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }

        const bookAdded = {
            title: newBook.title,
            published: newBook.published,
            author: {
              name: author.name, // Ensure that the author's name is not null
            },
            genres: newBook.genres,
            id: newBook._id,
          };
  
        try {
          await newBook.save()
          pubsub.publish('BOOK_ADDED', { bookAdded })

          return bookAdded

        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
      },
      newAuthor: async (root, args) => {
        let authorExists = await Author.findOne({ name: args.author })
        if (authorExists) {
          throw new Error("Author already exists")
        }
  
        const newAuthor = new Author({
          name: args.name
        })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
  
        return newAuthor
      },
      editAuthor: async (root, args, context) => {
        const author = await Author.findOne({ name: args.name })
  
        if (!author) {
          return null
        }
  
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        
        author.born = args.born
        author.save()
        return author
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre})
        console.log(user)
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, config.JWT_SECRET) }
      },
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
  
        const author = await Author.findOne({ name: authorName });
  
        const bookCount = await Book.countDocuments({ author: author._id })
        return bookCount
      },
      born: (root) => {
        return root.born !== undefined ? root.born : null
      }
    },
    Subscription:  {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
  }
  
module.exports = resolvers