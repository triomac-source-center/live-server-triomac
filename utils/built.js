import AmpTriggerModel from "../models/model_trigger.js"
import fs from 'fs'

const filepath = '../data/data.json'

export async function fundamentalBuild(object) {

    const common = object.p_point.toFixed(6).toString()

    const response = await AmpTriggerModel.create({
        packetname: object.name,
        recordvalue: common,
        recordpercentage: object.perc,
        differencevalue: object.diff
    })

    console.log('Document Created Sucessdully: ======================> ✅ 100% ')

    object.id = response._id
    console.log(`{p_point: points.${object.name}.p_point, id: '${object.id}'}`)

}