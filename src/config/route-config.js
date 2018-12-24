module.exports = {
    init(app){
      
      const staticRoutes = require("../routes/static");
      const meetingRoutes = require("../routes/meetings");
     
      const userRoutes = require("../routes/users");
      const commentRoutes = require("../routes/comments");
      const meetingUserRoutes = require("../routes/meetingUser");
      const profileRoutes = require("../routes/profiles");

      app.use(staticRoutes);
      app.use(meetingRoutes);
      app.use(commentRoutes);
      app.use(userRoutes);
      app.use(meetingUserRoutes);
      app.use(profileRoutes);
      
    }
  }