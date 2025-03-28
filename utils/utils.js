import mongoose from "mongoose"
import AmpTriggerModel from "../models/model_trigger.js"
import chalk from "chalk"

console.log('Connecting to database ...')

mongoose.connect('mongodb+srv://triomac60:F3v1K5wI0SK7c6nK@triomacdatas.hjmribt.mongodb.net/amptriggersmodels?retryWrites=true&w=majority&appName=Triomacdatas')


console.log('Database Connected succesfully ✅')



export const makeVirtualSimulation = (object) => {

    console.log(`SIMULATION START AT ${Date.now()} ...`)

    const common = object.p_point.toFixed(6).toString()
    const dynamic_common = common.split('')

    let screen = ''
    let screen_perc = ''
    let screen_all_perc = ''
    let screen_th = ''

    function createSegment(suite) {
        const before_dot = []
        const after_dot = []
        let dot_reached = false
        for (let i = 0; i < suite.length; i++) {
            if (suite[i] == '.') {
                dot_reached = true
                continue
            }
            if (!dot_reached) {
                before_dot.push(suite[i])
            } else {
                after_dot.push(suite[i])
            }
        }
        return {
            bf_packet: before_dot,
            af_packet: after_dot,
            dot: dot_reached,
        }
    }

    const packet = createSegment(dynamic_common)
    const packrun = packet.af_packet
    const ctrlrun = packet.bf_packet
    let call_time = 0
    let update_ctrl = parseInt(ctrlrun.join(''))
    let flow_ctrl = 0

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function packetSimulation() {

        const rdmrun = randomPosition()
        call_time++
        if (call_time % 10 == 0) {
            update_ctrl += getRandomInRange(-4, 4);
        } else {
            update_ctrl = update_ctrl
        }

        for (let i = 0; i < packrun.length; i++) {
            if (!(packrun[i] == rdmrun.value[i])) {
                if (rdmrun.value[i] == 0) {
                    packrun[i] = packrun[i]
                } else {
                    packrun[i] = rdmrun.value[i].toString()
                }
            }
        }

        for (let i = 0; i < ctrlrun.length; i++) {
            if (!(packrun[i] == update_ctrl.toString().split('')[i])) {
                ctrlrun[i] = update_ctrl.toString().split('')[i]
            }
        }

        return {
            packrun: packrun,
            ctrlrun: ctrlrun
        }
    }

    function randomPosition() {
        const pos = Math.floor(Math.random() * 6);
        const pack_model = [0, 0, 0, 0, 0, 0]

        for (let i = pos; i < pack_model.length; i++) {
            pack_model[i] = Math.floor(Math.random() * 10);
        }

        return {
            index: pos,
            value: pack_model
        }
    }

    function calculOfDifference(packet1, packet2) {
        const sub = parseFloat(packet2) - parseFloat(packet1)
        const perc = (sub * 100) / parseFloat(packet1)
        return {
            sub: sub,
            perc: perc
        }
    }


    const tab = [common, common]

    async function currentUpdate(param1, param2, param3, param4){

        const response = await AmpTriggerModel.updateOne(
            {
                _id: param1 
            },
            {
                $set: {
                    recordvalue: param2,
                    recordpercentage: param3,
                    differencevalue: param4
                }
            }
        )
        // console.log(`✅ Updated :  ============> ${param2}`)
      }

    function displaySimulation() {
        const packet_after_side = packetSimulation().packrun
        const packet_befre_side = packetSimulation().ctrlrun

        // console.log(tab)
        const validSymbol = chalk.green('✓')
        console.log('      ')
        console.log(validSymbol + ` Compiled ${chalk.dim('/triomac-system/data-achictecture/center')} in 3ms suscess`)
        console.log(validSymbol + ` Compiled /${chalk.cyan('triomac-system')}/${chalk.cyan('data-achictecture')} (129/129 modules)`)
        console.log(validSymbol + ` Compiled ${chalk.magenta('/triomac')} [[(1554 modules) -> ${chalk.bgBlack('substances')} ] ${chalk.green(tab[0])}]`)
        console.log(validSymbol + ` Compiled ${chalk.magenta('/triomac')} [[(1554 modules) -> ${chalk.dim('substances')} ] ${chalk.yellow(tab[1])}]`)
        console.log('      ')
        console.log(`[Components: @triomac/system-center: Missing publishableKey. CEF:0|Trend Micro|Deep Security Manager||600|User Signed In|3|src=10.52.116.160 suser=admin  ${tab.join(' | ')}]`)

        const value_seen = createSegment(dynamic_common)
        tab.shift()
        tab.push([value_seen.bf_packet.join(''), '.', packet_after_side.join('')].join(''))
        const calcul = calculOfDifference(tab[0], tab[1])
        screen = [packet_befre_side.join(''), '.', packet_after_side.join('')].join('')
        screen_perc = tab[0] + ' ' + tab[1]
        const percentage = calcul.perc
        const dif = calcul.sub
        parseFloat(percentage) > 0 ? screen_th =  '+' + percentage.toFixed(3) + '%' : screen_th =  percentage.toFixed(3) + '%'
        parseFloat(dif) > 0 ? screen_all_perc = '+' + dif.toFixed(3) : screen_all_perc = dif.toFixed(3)
        
        currentUpdate(object.id, tab[0], screen_th, screen_all_perc)
        
        

        const currentTab = screen + " | " + screen_perc + " | " + screen_all_perc + " | " + screen_th
        console.log(`⭐ All Sets: ----> ${currentTab}`)
        console.log(`${chalk.dim('target=admin msg=User signed in from 2001:db8::5')}`)

    }

    setInterval(displaySimulation, 1000)

}