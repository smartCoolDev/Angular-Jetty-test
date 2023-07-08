const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();
const jwt = require('jsonwebtoken');

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_secret_key', // Replace with your own secret key
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
     // Here, you can validate the JWT payload and find the corresponding user if needed
     // For example, you can check if the user exists in your database
     // If the user is found, you can call `done(null, user)`; otherwise, `done(null, false)`
 if (payload.userId === 'user_id') {
    done(null, payload);
  } else {
    done(null, false, { message: 'Unauthorized', status: 401 });
  }
});
   
passport.use(jwtStrategy);
server.use(passport.initialize());

server.use(middleware);
server.use(jsonServer.bodyParser);

const fakeData = require('../server/data');

server.get('/api/list/employee/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
     // This route will only be accessible if a valid JWT is provided in the Authorization header
     res.status(200).send(fakeData.getEmployees.data.employees.filter(employee => employee.id === parseInt(req.params.id)));
   });

server.get('/api/list/employee', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.status(200).send(fakeData.getEmployees);
});

server.get('/api/list/employee/address/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.status(200).send(fakeData.getAddresses.data.addresses.filter(employee => employee.employeeID === parseInt( req.params.id)));
});

server.get('/api/generate/open/jwt', (req, res, next) => {
  const token = jwt.sign({ userId: 'user_id' }, 'your_secret_key', { expiresIn: '1h' });
  res.status(200).send({ token });
});

server.listen(3000, () => {
  console.log('JSON server listening on port 3000');
});
