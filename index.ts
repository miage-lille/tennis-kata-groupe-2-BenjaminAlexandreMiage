import { isSamePlayer, Player } from './types/player';
import { advantage, deuce, fifteen, forty, FortyData, game, Point, PointsData, Score, thirty, points } from './types/score';
import { none, Option, some, match as matchOpt } from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

// -------- Tooling functions --------- //

export const playerToString = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};
export const otherPlayer = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'PLAYER_TWO';
    case 'PLAYER_TWO':
      return 'PLAYER_ONE';
  }
};
// Exercice 1 :
export const pointToString = (point: Point): string => {
  switch(point.kind){
    case 'LOVE' :
      return 'Love'
    case 'FIFTEEN' :
      return 'Fifteen'
    case 'THIRTY' :
      return 'Thirty'
  }
}
  

export const scoreToString = (score: Score): string => {
  switch(score.kind){
    case 'DEUCE':
      return 'Deuce';
    case 'POINTS':
      return 'Player one : ' + pointToString(score.pointsData.PLAYER_ONE) + ', player two : ' + pointToString(score.pointsData.PLAYER_TWO);
    case 'FORTY' :
      return 'Forty : ' + playerToString(score.fortyData.player) + ', other : ' + pointToString(score.fortyData.otherPoint);
    case 'ADVANTAGE' :
      return 'Advantage : ' + playerToString(score.player);
    case 'GAME' :
      return "Game won by : " + playerToString(score.player);
  }
}

export const scoreWhenDeuce = (winner: Player): Score => advantage(winner);

export const scoreWhenAdvantage = (
  advantagedPlayed: Player,
  winner: Player
): Score => {
  if (isSamePlayer(advantagedPlayed, winner)) return game(winner);
  return deuce();
};


export const scoreWhenForty = (
  currentForty: FortyData,
  winner: Player
): Score => {
  if (isSamePlayer(currentForty.player, winner)) return game(winner);
  return pipe(
    incrementPoint(currentForty.otherPoint),
    matchOpt(
      () => deuce(),
      p => forty(currentForty.player, p) as Score
    )
  );
};

export const incrementPoint = (point: Point): Option<Point> => {
  switch (point.kind) {
    case 'LOVE':
      return some(fifteen());
    case 'FIFTEEN':
      return some(thirty());
    case 'THIRTY':
      return none;
  }
};


// Exercice 2
// Tip: You can use pipe function from fp-ts to improve readability.
// See scoreWhenForty function above.

export const scoreWhenGame = (winner: Player): Score => game(winner);

export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  
  const playerOnePoint = current.PLAYER_ONE;
  const playerTwoPoint = current.PLAYER_TWO;

  if(winner === "PLAYER_ONE"){

    const fortyData: FortyData = { player: "PLAYER_ONE", otherPoint: playerTwoPoint };
  
    return pipe(
      incrementPoint(playerOnePoint),
      matchOpt(
        () => forty(fortyData.player, fortyData.otherPoint) as Score,
        p => points(p,playerTwoPoint)
      )
    )
  }

  else{

    const fortyData: FortyData = { player: "PLAYER_TWO", otherPoint: playerOnePoint };

    return pipe(
      incrementPoint(playerTwoPoint),
      matchOpt(
        () => forty(fortyData.player, fortyData.otherPoint) as Score,
        p => points(playerTwoPoint,p)
      )
    )
  }

};


const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint(currentScore.pointsData, winner);
    case 'FORTY':
      return scoreWhenForty(currentScore.fortyData, winner);
    case 'ADVANTAGE':
      return scoreWhenAdvantage(currentScore.player, winner);
    case 'DEUCE':
      return scoreWhenDeuce(winner);
    case 'GAME':
      return scoreWhenGame(winner);
  }
};