const moongose = require('mongoose')

const db = async() => {
    try{
        console.log(moongose, 'mongoose')
        moongose.set('strictQuery', false)
        await moongose.connect(process.env.MONGO_URL)
        console.log('Db connected')
    }catch(error){
        console.log(`'DB Connection Error ${process.env.MONGO_URL}`, error)
    }
}

module.exports = { db }