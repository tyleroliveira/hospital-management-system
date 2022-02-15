const dayjs = require("dayjs");
module.exports = {
  // add helper functions for handlebars here
  // Example:
  // json: object => JSON.stringify(object, null, 4),
  formatVisitDate: date => {
    if (date) {
    return dayjs(date).format('dddd, D : MMMM | YYYY');
  }
  return "no date";
}
};