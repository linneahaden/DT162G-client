
function sortPostsByVotes(data) {
  //Sorerar arrayen efter antalet upvotes minus antalet downvotes
  data.sort(function(a, b) {
    return (b.votesUp - b.votesDown) - (a.votesUp - a.votesDown);
  });
}
module.exports = {sortPostsByVotes};
