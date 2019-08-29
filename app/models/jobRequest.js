const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const JobRequestSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        dustbinNumber: {
            type: String,
            required: true
        },
        wasteType: {
            type: String,
            required: true
        },
        phase: {
            type: String
        },
        numbers : {
            type: String,
            required : true
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)
JobRequestSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('JobRequest', JobRequestSchema)