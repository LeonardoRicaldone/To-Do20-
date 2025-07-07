import dotenv from "dotenv";


//Ejecuto "Dotenv"
//me ayudara a acceder al .env
dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI,
    },
    server: {
        port: process.env.PORT,
    },
};