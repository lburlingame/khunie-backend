const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { getUserId } = require('../utils');


async function signup(parent, args, context) {
  try {
    const password = await argon2.hash(args.password);
    const user = await context.prisma.createUser({ ...args, password });
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    return {
      token,
      user,
    };
  } catch (err) {
    throw new Error(err);
  }
}

async function login(parent, args, context) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('Incorrect email or password');
  }

  const valid = await argon2.verify(user.password, args.password);
  if (!valid) {
    throw new Error('Incorrect email or password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
  };
}

function createBoard(parent, args, context) {
  const uid = getUserId(context);

  return context.prisma.createBoard({
    name: args.name,
    description: args.description,
    owner: { connect: { id: uid } },
  });
}

async function createList(parent, args, context) {
  const uid = getUserId(context);

  return context.prisma.createList({
    name: args.name,
    board: { connect: { id: args.boardId } },
    createdBy: { connect: { id: uid } },
  });
}

async function createCard(parent, args, context) {
  const uid = getUserId(context);

  return context.prisma.createList({
    title: args.title,
    list: { connect: { id: args.listId } },
    createdBy: { connect: { id: uid } },
  });
}


module.exports = {
  signup,
  login,
  createBoard,
  createList,
  createCard,
};
