function createdBy(parent, args, context) {
  return context.prisma.list({ id: parent.id }).createdBy();
}

function board(parent, args, context) {
  return context.prisma.list({ id: parent.id }).board();
}

function cards(parent, args, context) {
  return context.prisma.list({ id: parent.id }).cards();
}


module.exports = {
  createdBy,
  board,
  cards,
};
