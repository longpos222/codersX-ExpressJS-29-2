// var pageNumber = parseInt(req.query.page) || 1;
var pageStep = 3;
// var startPage = (pageNumber - 1) * pageStep;
// var prevPage = (pageNumber-1) < 0 ? 0 : (pageNumber-1);


module.exports.page = (array, pageNumber) => {
  var prevPage = (pageNumber-1) < 0 ? 0 : (pageNumber-1);
  var maxPage = array.length % pageStep == 0 ? array.length / pageStep : Math.floor(array.length / pageStep) + 1;
  var nextPage = (pageNumber+1) > maxPage ? maxPage : (pageNumber+1);
  var pageFoot = {prevPage, pageNumber, nextPage, maxPage};
  return pageFoot;
};

module.exports.array = (array, pageNumber) => {
  var startPage = (pageNumber - 1) * pageStep;
  var maxPage = array.length % pageStep == 0 ? array.length / pageStep : Math.floor(array.length / pageStep) + 1;
  var result = array.slice(startPage, startPage + pageStep);
  return result;
};

