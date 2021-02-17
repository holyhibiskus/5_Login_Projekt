const expressJwt = require("express-jwt");

const userService = require('../repository/user');
const config = require("../config/config");

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            "/api/users/authenticate",
            "/api/users/register",
            "/api/story",
            // Diese Zeile bewirkt das alle Ruten keinen Rtoken brauchen
            {url: /\/*/, methods: ['GET', 'OPTIONS']},
            // Alle GET und OPTIONS HTTP Request mit dem muster /api/texts/* brauchen keine Authorisierung
            "/"
        ],
        ext: [
            "png","jpg","css", "js", "woff2", "woff", "ico", "ttf", "html", "map"
        ]
    });

}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}