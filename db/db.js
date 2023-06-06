const moongose = require('mongoose')

const db = async() => {
    try{
        moongose.set('strictQuery', false)
        await moongose.connect(process.env.MONGO_URL)
        console.log('Db connected')
    }catch(error){
        console.log(`'DB Connection Error`, error)
    }
}

module.exports = { db }