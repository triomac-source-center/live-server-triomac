import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { makeVirtualSimulation } from './utils/utils.js'
import AmpTriggerModel from './models/model_trigger.js'
import mongoose from 'mongoose'
import { fundamentalBuild } from './utils/built.js'

mongoose.connect('mongodb://localhost/ampdatabase')

let app = express()
dotenv.config()
app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.use(express.urlencoded({ extended: false }))

const points = {
    apple: { id: null, name: 'apple', p_point: 17, perc: '0.023%', diff: '2.204' },
    groove: { id: null, name: 'groove', p_point: 34, perc: '0.892%', diff: '1.789' },
    crimble: { id: null, name: 'crimble', p_point: 91, perc: '0.892%', diff: '1.789' },
    stock: { id: null, name: 'stock', p_point: 10, perc: '0.123%', diff: '3.145' },
    belldum: { id: null, name: 'belldum', p_point: 55, perc: '0.567%', diff: '1.234' },
    cloack: { id: null, name: 'cloack', p_point: 23, perc: '0.345%', diff: '2.567' },
    quevers: { id: null, name: 'quevers', p_point: 89, perc: '0.987%', diff: '0.876' },
    dominan: { id: null, name: 'dominan', p_point: 42, perc: '0.456%', diff: '1.987' },
    paravim: { id: null, name: 'paravim', p_point: 15, perc: '0.234%', diff: '2.789' },
    selenium: { id: null, name: 'selenium', p_point: 67, perc: '0.789%', diff: '1.567' },
    triomac: { id: null, name: 'triomac', p_point: 38, perc: '0.432%', diff: '2.123' },
    demunic: { id: null, name: 'demunic', p_point: 72, perc: '0.810%', diff: '1.345' }
};

// for (const key in points) {
//     if (points.hasOwnProperty(key)) {
//         const value = points[key];
//         fundamentalBuild(value)
//     }
// }


const obj = [
    { p_point: points.groove.p_point, id: '67802831687fbf36b478da36' },
    { p_point: points.apple.p_point, id: '67802831687fbf36b478da35' },
    { p_point: points.belldum.p_point, id: '67802831687fbf36b478da39' },
    { p_point: points.cloack.p_point, id: '67802831687fbf36b478da3a' },
    { p_point: points.quevers.p_point, id: '67802831687fbf36b478da3b' },
    { p_point: points.dominan.p_point, id: '67802831687fbf36b478da3c' },
    { p_point: points.paravim.p_point, id: '67802831687fbf36b478da3d' },
    { p_point: points.selenium.p_point, id: '67802831687fbf36b478da3e' },
    { p_point: points.triomac.p_point, id: '67802831687fbf36b478da3f' },
    { p_point: points.demunic.p_point, id: '67802831687fbf36b478da40' },
    { p_point: points.crimble.p_point, id: '67802831687fbf36b478da37' },
    { p_point: points.stock.p_point, id: '67802831687fbf36b478da38' }
]


app.get('/api/get', async (req, res) => { 
	const data_document = await AmpTriggerModel.find({})
	res.json(data_document)
})

const PORT = process.env.PORT || 3000;

// makeVirtualSimulation(obj1)
// makeVirtualSimulation(obj2)
// makeVirtualSimulation(obj3)
 
obj.forEach((element) => {
    makeVirtualSimulation(element)
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running ...on port ${PORT} Done!`)
})

