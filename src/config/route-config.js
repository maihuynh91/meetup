module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const meetingRoutes = require("../routes/meetings");

      app.use(staticRoutes);
      app.use(meetingRoutes);
    }
  }