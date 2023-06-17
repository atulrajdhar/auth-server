const { init_mongodb } = require('./helpers/init_mongodb');
const app = require('./app.js');

const port = process.env.PORT || 3000;

init_mongodb()
    .then(() => {
        app.listen(port, () => {
            console.log(`authorization server listening on port: ${port}`);
        });
    })
    .catch((err) => console.log(err.message));