const mongoose = require("mongoose")

const Schema = mongoose.Schema

const geoLocationSchema = new Schema(
	{
		city: {
            type: String
        },
        ipAddress: {
            type: String
        }, 
        country: {
            type: String
        }, 
        region: {
            type: String
        }, 
        regionIsoCode: {
            type: String
        }, 
        isVPN: {
            type: Boolean
        }, 
        timezone: {
            type: Object
        }, 
        connection: {
            type: Object
        }, 
	},
	{ timestamps: true }
)

module.exports = mongoose.model("GeoLocation", geoLocationSchema)
