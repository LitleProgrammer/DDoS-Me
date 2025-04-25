const generateIp = () => {
    return "192.168.3." + Math.floor(Math.random() * 255);
}

const getRandomEndpoint = () => {
    const endpoints = [
        "ddosME",
        /*"attack",
        "secret",
        "login",
        "shop"*/
    ];

    return endpoints[Math.floor(Math.random() * endpoints.length)];
}

export { generateIp, getRandomEndpoint }