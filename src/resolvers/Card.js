function createdBy(parent, args, context) {
  return context.prisma.card({ id: parent.id }).createdBy();
}

function list(parent, args, context) {
  return context.prisma.card({ id: parent.id }).list();
}

function comments(parent, args, context) {
  return context.prisma.card({ id: parent.id }).comments();
}


module.exports = {
  createdBy,
  list,
  comments,
};
