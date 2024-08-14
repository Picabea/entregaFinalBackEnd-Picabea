const DocumentModel = require('./models/document.model')

class DocumentDAO{
    constructor(){}

    async uploadDocument(document){
        //{name: x reference: x}
        return await DocumentModel.create(document)
    }
}

module.exports = DocumentDAO