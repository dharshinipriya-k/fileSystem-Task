import express from 'express'
import fs from 'fs'
import path from 'path'

const PORT = process.env.PORT || 8000
let app = express()
app.use(express.json())

//Creating text file with timestamp
app.get('/',(req,res)=>{
   
        let today = +new Date()
        let timestamp = new Date().toISOString()

        fs.writeFileSync(`dateTime/${today}.txt`,`${timestamp}`,'utf8')

    let data = fs.readFileSync(`dateTime/${today}.txt`,'utf8')
    try {
        res.status(200).send({
            message:"File created successful!",data
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal server error!"
        })
    }
    }
)

//Creating endpoint to retrieve all text files in a folder

    app.get('/getfiles',(req,res)=>{
        const folder = 'dateTime'
        
        fs.readdir(folder,(err,files)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error fetching files!")
            }
            else{
                const textFiles = files.filter((file)=> path.extname(file) === '.txt')
                res.status(200).json(textFiles)
            }
        })
    })

app.listen(PORT,()=>console.log(`App listening to ${PORT}`))