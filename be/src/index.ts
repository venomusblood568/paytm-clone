
import express from "express";

const PORT = process.env.PORT || 3000
const app = express()

app.get('/', (Reqest,Response) => {
    Response.send("pay backend working fine")
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
