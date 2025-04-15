function getUrlParam(param_name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(param_name);
}
