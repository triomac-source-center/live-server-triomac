import mongoose from "mongoose";

const AmpTriggerSchema = new mongoose.Schema({
    packetname: {
        type: String, 
        required: true
    },
	recordvalue: { 
        type: String, 
        required: true 
    },
    recordpercentage: {
        type: String, 
        required: true
    },
	differencevalue: {
        type: String, 
        required: true
    },
})

const AmpTriggerModel = mongoose.model('AmpTriggersModel', AmpTriggerSchema)

export default AmpTriggerModel