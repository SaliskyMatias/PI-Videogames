const server = require('./app');
const { conn } = require('./DB_connection.js');

const PORT = 3001;

conn.sync({ force: true })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server raised in port ${PORT}`);
        });
    })
    .catch((error) => console.log(error.message))

