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
    // 200 success response
    success: (msg, data) => {
        const message = msg === "" ? "Request successfull" : msg;
        const res = new Response(200, "success", data, message);
        return res;
    },

    // 500 error response
    error: (msg, data) => {
        const message = msg === "" ? "Some error occured" : msg;
        const res = new Response(500, "error", data, message);
        return res;
    },

    // 400 bad request / Malformed request
    badrequest: (msg, data) => {
        const message = msg === "" ? "Bad request" : msg;
        const res = new Response(400, "error", data, message);
        return res;
    },

    // 401 Unauthorised access
    unauthorized: (msg, data) => {
        const message = msg === "" ? "Unauthorised access" : msg;
        const res = new Response(401, "error", data, message);
        return res;
    },
    // 403 forbidded request
    forbidden: (msg, data) => {
        const message = msg === "" ? "Access restricted" : msg;
        const res = new Response(403, "error", data, message);
        return res;
    },

    // 404 not found
    notfound: (msg, data) => {
        const message = msg === "" ? "404 Not Found" : msg;
        const res = new Response(404, "error", data, message);
        return res;
    },
};
