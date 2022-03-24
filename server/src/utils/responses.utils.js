/** This is a class defining the structure of any resposne */
class Response {
    constructor(code, status, data, msg) {
        this.code = code;
        this.status = status;
        this.data = data;
        this.msg = msg;
    }
}

/**
 * @Desc The function returns 200 OK (Success) to the client
 * @param {*} res Reponse object provided by Express
 * @param {*} msg Message for the response
 * @param {*} data Data to be sent along with the response
 */

exports.success = (res, msg, data) => {
    const response = new Response(200, "success", data, "Request Successful");
    if (msg) {
        response.msg = msg;
    }
    return res.status(200).json(response);
};

/**
 * @Desc The function returns Error 500(Internal server error) to the client
 * @param {*} res Reponse object provided by Express
 * @param {*} msg Message for the response
 * @param {*} data Data to be sent along with the response
 */
exports.error = (res, msg, data) => {
    const response = new Response(500, "error", data, "Some error occured");
    if (msg) {
        response.msg = msg;
    }
    return res.status(500).json(response);
};

/**
 * @Desc The function returns Error 400 (Bad request) to the client
 * @param {*} res Reponse object provided by Express
 * @param {*} msg Message for the response
 * @param {*} data Data to be sent along with the response
 */

exports.badrequest = (res, msg, data) => {
    const response = new Response(400, "badrequest", data, "Bad request or Malformed Request");
    if (msg) {
        response.msg = msg;
    }
    res.status(400).json(response);
};

/**
 * @Desc The function returns Error 403 (forbidded) to the client
 * @param {*} res Reponse object provided by Express
 * @param {*} msg Message for the response
 * @param {*} data Data to be sent along with the response
 */
exports.forbidden = (res, msg, data) => {
    const response = new Response(403, "forbidden", data, "Forbidden");
    if (msg) {
        response.msg = msg;
    }
    res.status(403).json(response);
};

/**
 * @Desc The function returns Error 401 (Unauthorised access) to the client
 * @param {*} res Reponse object provided by Express
 * @param {*} msg Message for the response
 * @param {*} data Data to be sent along with the response
 */
exports.unauthorize = (res, msg, data) => {
    const response = new Response(401, "unauthorized", data, "Unauthorized Request");
    if (msg) {
        response.msg = msg;
    }
    res.status(401).json(response);
};

/**
 * @Desc The function returns Error 404 (Not found) to the client
 * @param {*} res Reponse object provided by Express
 * @param {*} msg Message for the response
 * @param {*} data Data to be sent along with the response
 */
exports.notfound = (res, msg, data) => {
    const response = new Response(404, "error", data, "Not found");
    if (msg) {
        response.msg = msg;
    }
    res.status(404).json(response);
};

/**
 * @Desc The function returns Exist 409 (Already exist) to the client
 * @param {*} res Reponse object provided by Express
 * @param {*} msg Message for the response
 * @param {*} data Data to be sent along with the response
 */
exports.alreadyExist = (res, msg, data) => {
    const response = new Response(409, "exist", data, "Already Exist");
    if (msg) {
        response.msg = msg;
    }
    res.status(409).json(response);
};
