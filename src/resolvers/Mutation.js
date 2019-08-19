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
    throw new Error('There was a problem making an account');
  }
}

async function login(parent, args, context) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('Incorrect email or password');
  }

  const currentTime = new Date();
  const timeDifference = currentTime - new Date(user.lastLogin);

  if (user.attempts > 9 && timeDifference < Math.min((user.attempts - 9) * 5000, 60000)) {
    throw new Error('Too many login attempts to this account, please try again later');
  }

  const valid = await argon2.verify(user.password, args.password);

  await context.prisma.updateUser({
    data: {
      attempts: valid ? 0 : user.attempts + 1,
      lastLogin: currentTime,
    },
    where: {
      id: user.id,
    },
  });

  if (!valid) {
    throw new Error('Incorrect email or password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
  };
}

async function createBoard(parent, args, context) {
  const uid = getUserId(context);

  return context.prisma.createBoard({
    name: args.name,
    description: args.description,
    owner: { connect: { id: uid } },
  });
}

async function createList(parent, args, context) {
  const uid = getUserId(context);

  const lists = await context.prisma.board({ id: args.boardId }).lists();

  return context.prisma.createList({
    name: args.name,
    board: { connect: { id: args.boardId } },
    createdBy: { connect: { id: uid } },
    index: lists.length,
  });
}

async function createCard(parent, args, context) {
  const uid = getUserId(context);

  const cards = await context.prisma.list({ id: args.listId }).cards();

  return context.prisma.createCard({
    title: args.title,
    list: { connect: { id: args.listId } },
    createdBy: { connect: { id: uid } },
    index: cards.length,
  });
}

async function postComment(parent, args, context) {
  const uid = getUserId(context);

  return context.prisma.createComment({
    content: args.content,
    card: { connect: { id: args.cardId } },
    postedBy: { connect: { id: uid } },
  });
}


module.exports = {
  signup,
  login,
  createBoard,
  createList,
  createCard,
  postComment,
};
