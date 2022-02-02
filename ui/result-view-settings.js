
export class ResultViewSettings {
    playerScore = 0
    bestPlayerScore = 0
    bestPlayerName = ""
    resultViewType = ResultViewType.LevelMenu

    constructor(){}
}

export const ResultViewType = {
    LevelMenu: "LevelMenu",
    ResultMenu: "ResultMenu"
}
