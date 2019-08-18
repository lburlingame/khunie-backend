function postedBy(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).postedBy();
}

function card(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).card();
}

function replies(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).replies();
}


module.exports = {
  postedBy,
  card,
  replies,
};
