const ExpenseSchema = require('../models/ExpenseModel')

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body
    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })
    console.log(income)
    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json( { message: 'All fileds are required'})
        }
        if(amount <= 0 || typeof amount !== 'number'){
            return res.status(400).json( { message: 'Amount must be a positive number'})
        }
        await income.save()
        res.status(200).json({ message: 'Income added'})

    }catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error'})
    }
}

exports.getExpenses = async(req, res) => {
    try {
        const incomes = await ExpenseSchema.find().sort({ createdAt: -1 })
        res.status(200).json(incomes)
    }catch(error) {
        res.status(500).json({ message: 'Server Error'})
    }
}

exports.deleteExpense = async(req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        ExpenseSchema.findByIdAndDelete(id)
            .then(income => {
                if(income == null) {
                    res.status(200).json({ message: 'Income not found'})
                }else{
                    res.status(200).json( { message: 'Income deleted'})
                }
            })
            .catch(err => {
                res.status(500).json({message: 'Server Error'})
            })

    }catch(error) {
        res.status(500).json({ message: 'Server Error'})
    }
}