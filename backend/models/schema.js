const { mongoose, connectDB } = require('../database/db');
const { Schema } = mongoose;

//ch4_gwps
const CH4_gwp_Schema = new Schema({
    sector_code: String,
    fossil_bio: String,
    gas: String,
    gwp100_ar5: Number,
    gwp100_ar6: Number,
    description: String,
    chapter: Number,
    chapter_title: String,
    subsector: Number,
    subsector_title: String
});
const CH4_gwp_Model = mongoose.model('CH4_gwp', CH4_gwp_Schema, 'CH4_gwps');

//data
const dataSchema = new Schema({
    ISO: String,
    country: String,
    region_ar_6_6: String,
    region_ar_6_6_short: String,
    region_ar6_10: String,
    region_ar6_10_short: String,
    region_ar6_22: String,
    region_ar6_dev: String,
    year: Number,
    sector_title: String,
    subsector_title: String,
    CO2: Number,
    CH4: Number,
    H2O: Number,
    Fgas: Number,
    GHG: Number

})
const dataModel = mongoose.model('data', dataSchema, 'data')

//info 
const infoSchema = new Schema({
    "Data description": String,
    "This data file provides global, regional, national, and sectoral estimates of greenhouse gas (GHG) emissions from 1970-2019": String
})
const infoModel = mongoose.model('info', infoSchema, 'info');

//Metadata 
const metadataSchema = new Schema({
    Variable: String,
    Description: String,
    Units: String,
    Source: String,
    Citation: String
})
const metadataModel = mongoose.model('metadata', metadataSchema, 'metadata');

//Hundred_Year_gwps
const HundredYearGWPSSchema = new Schema({
    gas: String,
    gwp100_ar5: Number,
    gwp100_ar6: Number,
})
const HundredYearGWPSModel = mongoose.model('hundred_year_gwps', HundredYearGWPSSchema, 'hundred_year_gwps')

//region_classification 
const RegionClassificationSchema = new Schema({
    ISO: String,
    name: String,
    region_ar_6_6: String,
    region_ar6_10: String,
    region_ar6_22: String,
    region_ar6_dev: String,
    region_ar6_short: String,
    region_ar6_10_short: String
})
const RegionClassificationModel = mongoose.model('region_classification', RegionClassificationSchema, 'region_classification')

//sector_classification
const SectorClassificationSchema = new Schema({
    EDGAR_code: String,
    fossil_bio: String,
    sector_title: String,
    description: String,
    subsector_title: String,
    IPCC_2006: String,
})

const SectorClassificationModel = mongoose.model('sector_classification', SectorClassificationSchema, 'sector_classification')

const factorSchema = new mongoose.Schema({
    mode: { type: String, required: true },
    icon: { type: String },
    factor: { type: Number, required: true },
    unit_input: { type: String, required: true },
    unit_output: { type: String, required: true },
    description: { type: String },
    default_input: { type: Number, default: 1 }
});

const categorySchema = new mongoose.Schema({
    category: { type: String, required: true },
    factors: [factorSchema]
});

const EmissionFactors = mongoose.model('emission_factor', categorySchema);



module.exports = {
    CH4_gwp_Model,
    dataModel,
    infoModel,
    metadataModel,
    HundredYearGWPSModel,
    RegionClassificationModel,
    SectorClassificationModel, 
    EmissionFactors
}