
/*********************************
 * Developer : Corner
 * Description : 에러 처리
 * ********************************/
function checkStatus(status) {
	switch (status) {
		case 200: return '200 OK';
		case 201: return '201 Created';
		case 204: return '204 No Content';
		case 400: return '400 Bad Request';
		case 401: return '401 Unauthorized';
		case 403: return '403 Forbidden';
		case 404: return '404 Not Found';
		case 500: return '500 Internal Server Error';
		default: return 'Unknown';
	}
}

const errorHandler = (error, req, res, next) => {
	let info = {
		type: false,
		message: '',
	}

    const statusCodeMsg = checkStatus(res.statusCode);
	info.message = statusCodeMsg
    return res.status(res.statusCode).json({
		status: res.statusCode,
		info,
		error: error.message,
        stack: ':('
    });
};

module.exports = errorHandler;
