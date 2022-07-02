import { Bot } from "../input/bot"
import { InputInternal } from "../input/input-internal"
import { KeyboardEventsManager } from "../input/keyboard-events-manager"
import { Scene } from "./scene"

export class Player {

    playerName = 'no name'
    /**
     * @type {Bot}
     */
    bot = null

    /**
     * @type {KeyboardEventsManager}
     */
    inputKeyboard = null
 
    /**
     * @type {Scene}
     */
    scene = null

    constructor(inputKeyboard, scene, context) {  
        this.inputKeyboard = inputKeyboard
        this.scene = scene
        this.context = context
    }

    setPlayerMode() {
        this.playerName = "player_" + Math.floor(Math.random() * 1000)
        this.isBot = false
    }

    setBotMode() {
        this.playerName = "bot_" + Math.floor(Math.random() * 1000 + 100)
        this.bot = new Bot(this.context, this.scene, null, this.playerName, false)
    }

    start() {
        if (this.bot) {
            this.bot.start()
        }
    }

    networkTick(delta) {
        if (!this.isEnabled())
            return 

        if (this.bot) {
            this.bot.tick(delta)
        }
    }

    isEnabled() {
        // check, does the planet exists
        return (this.scene.getPlanetsByName(this.playerName).length > 0)
    }

    getInput() {
        if (!this.isEnabled())
            throw new Error ('cannot get input for player. it is not active!') 

        if (this.bot) {
            return this.bot.getDirection()
        } else {
            let inputKeyboard = this.inputKeyboard.getInput()
            let inputInternal = new InputInternal()
            inputInternal.inputId = this.playerName
            inputInternal.isLeft = inputKeyboard.arrowLeft
            inputInternal.isRight = inputKeyboard.arrowRight
            inputInternal.isUp = inputKeyboard.arrowUp
            inputInternal.isDown = inputKeyboard.arrowDown
    
            return inputInternal
        }  
    }
}