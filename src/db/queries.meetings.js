const Meeting = require("./models").Meeting;

module.exports = {

//#1
  getAllMeetings(callback){
const Meeting = require("./models").Meeting;
    return Meeting.all()

//#2
    .then((meetings) => {
      callback(null, meetings);
    })
    .catch((err) => {
      callback(err);
    })
  }
}