import jwt from 'jsonwebtoken';

// TODO: Store elsewhere
const secret = "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";

export function createAccessToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1800s' });
  }

// Authenticates token in HTTP request
export function authenticateToken(req, res, next) {
    console.log("authenticateToken: Entered");
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]
  
    if (token == null) {
      console.log("authenticateToken: No token");
      return res.sendStatus(401)
    }    
  
    jwt.verify(token, secret, (err, user) => {
      console.log(err)
  
      if (err) {
        console.log("authenticateToken: Error 401");
        return res.sendStatus(401)
      }
  
      req.user = user
  
      next()
    })
  }

  // Authorises user role in HTTP request
  export function authoriseRole(roles) {
    return (req, res, next) => {
      //console.log("authoriseRole: Entered");
      //console.log(roles);

      if (roles != null && roles.length > 0) {
        const header = req.headers['authorization']
        const token = header && header.split(' ')[1]
        const decoded = jwt.decode(token);

        if (!roles.includes(decoded.role)) {
          //console.log("authoriseRole: 401");
          res.sendStatus(401);
          //res.status(401);
          //return res.send("not allowed");
        }       
      }

      next();
    };
  }

  // Gets UserId from request header token
export function getUserId(header) {
  if (header == undefined) return "No header";    
  if (!header.toLowerCase().startsWith("bearer ")) return "No bearer header";

  // Decode token
  const token = header && header.split(' ')[1]
  const decoded = jwt.decode(token);

  /*
  {
  username: 'Chris Fellows',
  userid: 1,
  role: 'admin',
  iat: 1715339761,
  exp: 1715341561
  }
  */
  //console.log("getUserId: Decoded:");
  //console.log(decoded);
  return decoded.userid;
}