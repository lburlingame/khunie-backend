function owner(parent, args, context) {
  return context.prisma.board({ id: parent.id }).owner();
}

function lists(parent, args, context) {
  return context.prisma.board({ id: parent.id }).lists();
}

module.exports = {
  owner,
  lists,
};
