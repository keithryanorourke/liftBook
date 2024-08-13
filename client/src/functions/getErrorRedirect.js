const getErrorRedirect = (err) => {
    switch (err.response.status) {
        case 401:
            return "/login";
        case 403:
        case 404:
            return "/error?code=" + err.response.status;
        default:
            return "/error?code=" + 500;
    }
}

export default getErrorRedirect;