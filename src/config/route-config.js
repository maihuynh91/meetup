module.exports = {
    init(app){
      
      const staticRoutes = require("../routes/static");
      const meetingRoutes = require("../routes/meetings");
     
      const userRoutes = require("../routes/users");
      const commentRoutes = require("../routes/comments");

      app.use(staticRoutes);
      app.use(meetingRoutes);
      app.use(commentRoutes);
      app.use(userRoutes);
   
      
    }
  }