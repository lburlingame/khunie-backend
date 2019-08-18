const { getUserId } = require('../utils');

function boards(parent, args, context) {
  return context.prisma.user({ id: parent.id }).boards();
}

function invited(parent, args, context) {
  return context.prisma.user({ id: parent.id }).invited();
}

module.exports = {
  boards,
  invited,
};
