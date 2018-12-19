module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const meetingRoutes = require("../routes/meetings");
      const postRoutes = require("../routes/posts");

      app.use(staticRoutes);
      app.use(meetingRoutes);
      app.use(postRoutes);

    }
  }