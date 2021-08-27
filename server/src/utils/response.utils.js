
/** This is a class defining the structure of any resposne */ 
class Response {
  constructor(code, status, data, msg) {
      this.code = code; 
      this.status = status;
      this.data = data;
      this.msg = msg;
    }
}

module.exports = {
  
  // success response
  success: (msg, data) => {
    const message = (msg === "") ? "Request successfull": msg; 
      const res = new Response(200, "success", data, message);
      return res;
  },

  // error response
  error: (msg, data) => {
    const message = (msg === "") ? "Some error occured": msg; 
      const res = new Response(500, "error", data, message);
      return res;
  },

  // bad request / Malformed request
  badrequest: (msg, data) => {
    const message = (msg === "") ? "Bad request": msg; 
      const res = new Response(400, "error", data, message);
      return res;
  },
  
  // Unauthorised access 
  unauthorized: (msg, data) => {
    const message = (msg === "") ? "Unauthorised access": msg;  
    const res = new Response(401, "error", data, message);
    return res;
  }
  ,

  // forbidded request
  forbidden: (msg, data) => {
    const message = (msg === "") ? "Access restricted": msg;  
    const res = new Response(403, "error", data, message);
    return res;
  },

  // 404 not found
  notfound: (msg, data) =>{
    const message = (msg === "") ? "404 Not Found": msg;  
    const res = new Response(404, "error", data, message);
    return res;
  },

  

}