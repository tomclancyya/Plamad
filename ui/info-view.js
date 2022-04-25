/*[test]*///import pixi from "pixi-shim"; const { Container } = pixi;
/*[production]*/import { Container, FilterState } from "pixi.js";
import { Timer } from "../utils/timer";
import { BackgroundView } from "./background-view";
import { TextView } from "./text-view";

export class InfoView {

    /**
     * @type {Container}
     */
    container

    maxAmountOfMessages = 10

    messages = []

    /** 
     * @param {Container} parent
     */
    constructor(parent) {
        let container = new Container();
        this.container = container
        //position in scene
        container.x = 140
        container.y = 480
        parent.addChild(container);
        let back = new BackgroundView(container, 250, 250, 0.1)
    }

    tick(delta) {
        //debugger;
        this.messages.map(m => {
            m.lifetimeTimer.update(delta)
        })
        let fistMessage = this.messages[0]
        if (fistMessage) {
            if (fistMessage.lifetimeTimer.isFinished()) {
                this.messages.shift()
            }
        }
        this.render()
    }

    addMessage(message) {
        let messageWithTimer = {
            message: message,
            lifetimeTimer: new Timer(2000)
        }
        this.messages.push(messageWithTimer)
    }

    renderMessage(message, position) {
        let wrapper = new Container();
        this.container.addChild(wrapper)
        wrapper.x = 0
        wrapper.y = -30 * position
        new BackgroundView(wrapper, 250, 20, 0.4)
        new TextView(-120, 0, message, wrapper, 10, 'left')

    }

    render() {
        for (let i = this.container.children.length - 1; i >= 0; i--) {	
            this.container.removeChild(this.container.children[i]);
        }

        for (let i = 0; i < this.messages.length; i++) {
            this.renderMessage(this.messages[i].message, i)
        }
    }
}
/*
viewSettings = {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    sizeUnit: 'px', //%
    align: 'center',
    pivot: 'center',
    parent: new Object(),
    parentWidth: 100,
    parentHeight: 100

}*/