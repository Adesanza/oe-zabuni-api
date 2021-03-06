const passport = require("passport"),
LocalStrategy = require();

// INITIALIZE PASSPORT...READ THE DOCS: http://www.passportjs.org/packages/passport-local/
passport.use(new LocalStrategy((username,password,done)=>{
    return done(null, user);
}))



passport.serializeUser((user, done)=>done(null, user.id));
passport.deserializeUser(async (id, done)=>{
    //check if user exists in the databse
    return done(null,user)
})