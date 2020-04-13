import { Component, OnInit, QueryList,ViewChildren,ElementRef } from '@angular/core';

import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  origBoard=[];
  endGame:boolean = false;
  winner:'';
  huPlayer = 'O';
  aiPlayer = 'X';
  WinCombos=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
  ];
  whatGame ='Game with Computer';
  isComputerGame:boolean = true;
  bgColor = '';
  @ViewChildren(CellComponent, { read: ElementRef }) cells: QueryList<any>;


  xIsNext: boolean;
  gameover = false;

  constructor() {}

  ngOnInit() {
    this.startGame();

  }

  isComputer(){
    this.isComputerGame = !this.isComputerGame;
    this.isComputerGame === false ?  this.whatGame = "Game with Human" :  this.whatGame = "Game with Computer";
    this.startGame();
  }

  startGame(){
    this.endGame = false;
    this.origBoard = Array.from(Array(9).keys());
    this.xIsNext = true;
  }

  turnClick(square:number){
    if(this.isComputerGame){
      let clickIndex = square;
      if(this.origBoard[clickIndex] == clickIndex){
          if(this.turn(clickIndex, this.huPlayer)){
              console.log("won");
          }
          else{
              if (this.checkTie()) {
                  console.log("tie");
              }
              else {
                  this.turn(this.bestSpot(), this.aiPlayer);
              }
          }
      }
    }else{
      this.humanMove(square);
    }
  }

  turn(squareId:number, player){
    console.log(player + ":" + squareId);
    this.origBoard[squareId] = player;
    let gameWon = this.checkWin(this.origBoard, player);
    if(gameWon){
        console.log(player + ":wins");
        this.gameOver(gameWon);
    }
    else{
        console.log("game on");    
    }
    return gameWon;
 }

 checkWin(board, player){
  let plays = board.reduce((a,e,i) =>
      (e===player) ? a.concat(i):a, []);
  let gameWon = null;

  for(let [index, winningCombination] of this.WinCombos.entries()){
      if(winningCombination.every(elem=>plays.indexOf(elem)>-1)){
          gameWon = {index: index, player:player};
          break;
      }
  }
  return gameWon;
}

gameOver(winInfo){
    for(let index of this.WinCombos[winInfo.index]){
      this.cells['_results'][index].nativeElement.parentElement.style.backgroundColor=
           winInfo.player==this.huPlayer?"blue":"red";
    }
    if(this.isComputerGame){
      this.declareWinner(winInfo.player==this.huPlayer?"You won": "Computer won");
    }else{
      this.declareWinner("Won Player " + winInfo.player);
    }
}

declareWinner(winner){
  this.endGame = true;
  this.winner = winner;
}

emptyCells(){
  return this.origBoard.filter(s=>typeof s == "number");
}

bestSpot(){
  return this.miniMax(this.origBoard, this.aiPlayer).index;
}

checkTie(){
  if(this.emptyCells().length == 0){
      for(var i=0; i< this.cells.length; i++){
        this.cells['_results'][i].nativeElement.parentElement.style.backgroundColor="green"
      }
      this.declareWinner("Tie Game!");
      return true;
  }
  return false;
}

miniMax(board, player){
  var availableSpots = this.emptyCells();

  if(this.checkWin(board, this.huPlayer)){
      return{score: -10};
  }else if(this.checkWin(board, this.aiPlayer)){
      return {score: 10};
  }else if(availableSpots.length === 0){
      return {score: 0};
  }

  var moves = [];
  for(var i =0; i < availableSpots.length; i++){
      var move = {};
      move['index'] = board[availableSpots[i]];
      board[availableSpots[i]] = player;

      if(player == this.aiPlayer){
          var result = this.miniMax(board, this.huPlayer);
          move['score'] = result.score;
      }else{
          var result = this.miniMax(board, this.aiPlayer);
          move['score'] = result.score;
      }
      board[availableSpots[i]]=move['index'];
      moves.push(move);
}
      
      var bestMove;
      if(player === this.aiPlayer){
          var bestScore = -10000;
          for(var i = 0; i < moves.length; i++) {
              if(moves[i].score > bestScore){
                  bestScore = moves[i].score;
                  bestMove = i;
              }
          }
      }else{
          var bestScore = 10000;
          for(var i = 0; i < moves.length; i++) {
              if(moves[i].score < bestScore){
                  bestScore = moves[i].score;
                  bestMove = i;
              }
          }
      }
      return moves[bestMove];
}


/////////////2 HUMANS VERSION
  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  humanMove(idx: number) {
    if (!this.endGame) {
      if (this.origBoard[idx] == idx) {
        this.origBoard.splice(idx, 1, this.player);
      }
      this.turn(idx, this.player);
      this.checkTie();
      this.xIsNext = !this.xIsNext;
    }
  }

}
