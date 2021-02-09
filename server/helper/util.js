module.exports = {
    isDebug: process.env.NODE_ENV === 'develop' || typeof process.env.NODE_ENV === 'undefined',
    URL: process.env.NODE_ENV === 'develop' || typeof process.env.NODE_ENV === 'undefined' ? "http://localhost:3000/" : "/"
}