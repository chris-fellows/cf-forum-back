import jwt from 'jsonwebtoken';

// TODO: Store elsewhere
const secret = "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";

export function createAccessToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1800s' });
  }

export function authenticateToken(req, res, next) {
    console.log("authenticateToken: Entered");
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) {
      console.log("authenticateToken: No token");
      return res.sendStatus(401)
    }    
  
    jwt.verify(token, secret, (err, user) => {
      console.log(err)
  
      if (err) {
        console.log("authenticateToken: Error 403");
        return res.sendStatus(403)
      }
  
      req.user = user
  
      next()
    })
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