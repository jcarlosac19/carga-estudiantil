// Application configuration.
const config = module.exports;
config.keys = {
    secret: process.env.JWT_SECRET || 'MySecretHash',
    expiresIn: process.env.JWT_EXPIRES_IN ||'24h'
};