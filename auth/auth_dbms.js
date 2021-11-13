const { verify } = require("jsonwebtoken");
module.exports = {
    RoleConnection: (token) => {
        var email = "";
        var password = "";
        if (token) {
            verify(token, "vophucson", (decoded) => {
                console.log(decoded.result.email);
                email = decoded.result.email;
                password = decoded.result.password;
            });
        }
        return {
            user: email,
            password: password,
            server: "DESKTOP-MMFP9TU",
            database: "shopdb",
            options: {
                trustedconnection: true,
                enableArithAbort: true,
                instancename: "",
            },
            port: 54526
        };
    },
    noLoginConnection: () => {
        return {
            user: "nologinconnection",
            password: "nologin",
            server: "DESKTOP-MMFP9TU",
            database: "shopdb",
            options: {
                trustedconnection: true,
                enableArithAbort: true,
                instancename: "",
            },
            port: 54526
        };
    },
    AdminConnection: () => {
        return {
            user: "devbackend",
            password: "nhom11sql",
            server: "DESKTOP-MMFP9TU",
            database: "shopdb",
            options: {
                trustedconnection: true,
                enableArithAbort: true,
                instancename: "",
            },
            port: 54526
        };
    },
    LoginConnection: (email, password) => {
        return {
            user: email,
            password: password,
            server: "DESKTOP-MMFP9TU",
            database: "shopdb",
            options: {
                trustedconnection: true,
                enableArithAbort: true,
                instancename: "",
            },
            port: 54526
        };
    }
}