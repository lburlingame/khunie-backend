function user(parent, args, context) {
  return context.prisma.teamMembership({ id: parent.id }).user();
}

function team(parent, args, context) {
  return context.prisma.teamMembership({ id: parent.id }).team();
}


module.exports = {
  user,
  team,
};
