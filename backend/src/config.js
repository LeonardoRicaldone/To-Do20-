import dotenv from "dotenv";


//Ejecuto "Dotenv"
//me ayudara a acceder al .env
dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI || "mongodb://localhost:27017/To-DoDB20230070",
    },
    server: {
        port: process.env.PORT || 4000,
    },
};