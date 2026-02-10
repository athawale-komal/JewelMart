

const Connect_Database = require ("./Config/db.js");
const app  = require('./app.js');
const dotenv  = require ('dotenv');
dotenv.config({ path: ".env" ,quiet:true});

Connect_Database();

app.listen(process.env.PORT, () =>{
    console.log(`Server : Woriking On http://localhost:${process.env.PORT}`)
})