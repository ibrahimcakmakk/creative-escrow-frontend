const webpack = require('webpack');

module.exports = {
    // ... your existing config
    resolve: {
        fallback: {
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            zlib: require.resolve("browserify-zlib"),
            url: require.resolve("url/")
        }
    }
}
