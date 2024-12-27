import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//db
import db from "./_db.js";
//type
import { typeDefs } from "./schema.js";

//resolver function
const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    review(_, args) {
      const id = args.id;
      return db.reviews.find((re) => re.id === id);
    },
    game(_, args) {
      return db.games.find((el) => el.id === args.id);
    },
    author(_, args) {
      return db.authors.find((el) => el.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((r) => r.id === parent.id);
    },
    game(parent) {
      return db.games.find((r) => r.id === parent.id);
    },
  },
};
//server setup
const server = new ApolloServer({
  //typeDefs -- definitions of types of data
  typeDefs,
  //resolvers
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server ready at port ", 4000);
