

export class TickerTest {
    constructor(){}
    getTests() {
        return {
            "ticker should":
            {
                "xxxxxxxx": () => {
                    let timer = new Timer (5000)
                              
                    return console.log('hey');   
                }
                
            
            } 
        }
    }
}