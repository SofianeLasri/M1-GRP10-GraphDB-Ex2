import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import {gql} from 'graphql-tag';
import { resolvers } from "./resolvers.js";

const typeDefs = gql`
type Doctor {
  id: String
  name: String
  speciality: Speciality
  addresses: Address
}

type Address {
  streetName: String
}

enum Speciality {
  PSYCHOLOGIST
  OPHTALMOLOGIST
}

type Query {
  doctor(id: ID!): Doctor
  doctors(specialities: [Speciality!]): [Doctor]
  add(number1: Float!, number2: Float!): Float!
  subtract(number1: Float!, number2: Float!): Float!
  multiply(number1: Float!, number2: Float!): Float!
  divide(number1: Float!, number2: Float!): Float!
  closestColor(hexa: String!): String!
}
`

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000}
})

console.log(`🚀  Server ready at: ${url}`)