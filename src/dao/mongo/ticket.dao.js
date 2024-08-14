const TicketModel = require('./models/ticket.model')

class TicketDAO{

    async createTicket(code, date, total, userEmail){
        return await TicketModel.create({code, purchase_datetime: date, amount: total, purchaser: userEmail})
    }
}

module.exports = TicketDAO