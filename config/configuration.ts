export default () => (
    {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database: {
        host: 'estrada.postgres.database.azure.com',
        port: parseInt(process.env.DATABASE, 10) || 5432,
        username: 'estrada',
        password: 'Camilo442037*',
        dbname: 'calidad-datos-psql'
    }
});

