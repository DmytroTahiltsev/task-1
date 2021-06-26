const express = require('express')
const path=require('path')

const PORT = process.env.PORT || 5000

const app= express()
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'client')))

const start= async()=>{
    try{
        app.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
        })
        app.listen(PORT, ()=> console.log(`server has been started on PORT ${PORT}`))
    }catch(e){
        console.log(e)
    }
}
start()