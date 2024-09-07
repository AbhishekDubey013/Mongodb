const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bitcoinPriceSchema = new Schema({
    time: {
        updated: String,
        updatedISO: Date,
        updateduk: String
    },
    disclaimer: String,
    chartName: String,
    bpi: {
        USD: {
            code: String,
            symbol: String,
            rate: String,
            description: String,
            rate_float: Number
        },
        GBP: {
            code: String,
            symbol: String,
            rate: String,
            description: String,
            rate_float: Number
        },
        EUR: {
            code: String,
            symbol: String,
            rate: String,
            description: String,
            rate_float: Number
        }
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

const BitcoinPrice = mongoose.model('BitcoinPrice', bitcoinPriceSchema);

module.exports = BitcoinPrice;