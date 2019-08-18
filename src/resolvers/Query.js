const { getUserId } = require('../utils');

const info = () => 'Khunie GraphQL API';

function getBoards(parent, args, context) {
  const uid = getUserId(context);

  const boards = context.prisma.user({ id: uid }).boards();
  const invited = context.prisma.user({ id: uid }).invited();

  return { boards, invited };
}


module.exports = {
  info,
  getBoards,
};
