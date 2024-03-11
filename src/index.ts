import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import {gql} from 'graphql-tag'

const doctorsData = [
  {
    id: "1",
    name: 'Samia Mekame',
    speciality: 'OPHTALMOLOGIST',
  },
  {
    id: "2",
    name: 'Catherine Bedoy',
    speciality: 'PSYCHOLOGIST',
  },
];

const typeDefs = gql`
type Doctor {
  id: String
  name: String
  speciality: SPECIALITY
  addresses: Address
}

type Address {
  streetName: String
}

enum SPECIALITY {
  PSYCHOLOGIST
  OPHTALMOLOGIST
}

type Query {
  doctor(id: ID!): Doctor
  doctors(specialities: [SPECIALITY!]): [Doctor]
  add(number1: Float!, number2: Float!): Float!
  subtract(number1: Float!, number2: Float!): Float!
  multiply(number1: Float!, number2: Float!): Float!
  divide(number1: Float!, number2: Float!): Float!
  closestColor(color: String!): String!
}
`

const colors: string[] = ["#FF5733", "#33FF57", "#3357FF"];

const closestColor = (color: string) => {
  if(!color.startsWith("#")) color = "#" + color;

  const colorValues = color
      .slice(1)
      .match(/.{2}/g)
      ?.map((hex) => parseInt(hex, 16));

  if (!colorValues) {
    throw new Error("Invalid color");
  }

  const [r, g, b] = colorValues;

  const colorDistances = colors.map((c) => {
    const [cr, cg, cb] = c
        .slice(1)
        .match(/.{2}/g)
        ?.map((hex) => parseInt(hex, 16)) as number[];

    return Math.sqrt(
        Math.pow(r - cr, 2) + Math.pow(g - cg, 2) + Math.pow(b - cb, 2)
    );
  });

  const closestColorIndex = colorDistances.indexOf(
      Math.min(...colorDistances)
  );

  return colors[closestColorIndex];
}

const resolvers = {
  Query: {
    doctors: (parent, args, context, info) => {
      return doctorsData
    },
    doctor: (parent, args, context, info) => {
      const {id} = args
      return doctorsData.find(d => d.id === id)
    },
    add: (parent, args, context, info) => {
      const {number1, number2} = args
      return number1 + number2
    },
    subtract: (parent, args, context, info) => {
      const {number1, number2} = args
      return number1 - number2
    },
    multiply: (parent, args, context, info) => {
      const {number1, number2} = args
      return number1 * number2
    },
    divide: (parent, args, context, info) => {
      const {number1, number2} = args
      return number1 / number2
    },
    closestColor: (parent, args, context, info) => {
      const {color} = args
      return closestColor(color)
    }
  },
  Doctor: {
    addresses: (parent, args, context, info) => {
      console.log(parent)
      return {streetName: `${parent.id} street`}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000}
})

console.log(`🚀  Server ready at: ${url}`)