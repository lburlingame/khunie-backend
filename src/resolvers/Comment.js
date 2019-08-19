function postedBy(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).postedBy();
}

function card(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).card();
}

function top(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).top();
}

function replies(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).replies();
}


module.exports = {
  postedBy,
  card,
  top,
  replies,
};
