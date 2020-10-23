console.log('import routes.config');
module.exports = (app) => {
    // Define the api to where go
    app.use('/jwt', require('../routes/jwt.routes'));
}