const { GameContext } = require('./models/game-context');
const { MenuService } = require('./stage/menu-service');

module.exports = function (input) {
    
    let PIXI = require('pixi.js');

    let App = PIXI.Application;

    let app = new App({
        width: 500,
        height: 500,
        backgroundColor: '0x001122'
    });

    //app.renderer.resize(window.innerWidth, window.innerHeight);
    app.renderer.view.style.position = 'absolute';
    // focus on canvas
    app.renderer.view.setAttribute('tabindex', 0);

    

    new MenuService(new GameContext(app, input));
    

    return app.view;

}