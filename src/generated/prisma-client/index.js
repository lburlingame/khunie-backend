"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Team",
    embedded: false
  },
  {
    name: "TeamMembership",
    embedded: false
  },
  {
    name: "Board",
    embedded: false
  },
  {
    name: "List",
    embedded: false
  },
  {
    name: "Card",
    embedded: false
  },
  {
    name: "Comment",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "TeamRole",
    embedded: false
  },
  {
    name: "Visibility",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466/khunie`
});
exports.prisma = new exports.Prisma();
