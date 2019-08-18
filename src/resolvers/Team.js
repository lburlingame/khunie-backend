function owner(parent, args, context) {
  return context.prisma.team({ id: parent.id }).owner();
}

function members(parent, args, context) {
  return context.prisma.team({ id: parent.id }).members();
}

function boards(parent, args, context) {
  return context.prisma.team({ id: parent.id }).boards();
}


module.exports = {
  owner,
  members,
  boards,
};
