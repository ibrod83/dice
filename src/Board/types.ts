import { Player } from "../Player/types"

  export interface Board{
    players:Player[]
    goalScore:number 
    dice1:number |null
    dice2:number |null 
  }