const {CH4_gwp_Model, dataModel, infoModel, metadataModel, HundredYearGWPSModel, RegionClassificationModel, SectorClassificationModel} = require('../models/schema') 

const getCH4GWPData = async () => { 
    try {
        const response = await CH4_gwp_Model.find({}) 
        if(response) return response; 
    } catch (error) {
        throw Error(error.message)
    }
}  

const getData = async () => { 
    try {
        const response = await dataModel.find({}).limit(50)
        if(response) return response; 

    } catch (error) {
        throw Error(error.message)
    }
} 

const getInfo = async () => { 
    try {
        const response = await infoModel.find({})
         if(response) return response; 

    } catch (error) {
        throw Error(error.message)
    }
} 

const getMetadata = async () => { 
    try {
        const response = await metadataModel.find({})
         if(response) return response; 

    } catch (error) {
        throw Error(error.message)
    }
} 

const getHundredYearGWPS = async () => { 
    try {
        const response = await HundredYearGWPSModel.find({})
         if(response) return response; 

    } catch (error) {
        throw Error(error.message)
    }
} 

const getRegionClassification = async () => { 
    try {
        const response = await RegionClassificationModel.find({}).limit(100)
        if(response) return response 

    } catch (error) {
        throw Error(error.message)
    }
} 

const getSectorClassification = async () => { 
    try {
        const response = await SectorClassificationModel.find({})
        if(response) return response 

    } catch (error) {
        throw Error(error.message)
    }
}


module.exports = { 
    getCH4GWPData, 
    getData, 
    getInfo, 
    getMetadata, 
    getHundredYearGWPS, 
    getRegionClassification, 
    getSectorClassification
}