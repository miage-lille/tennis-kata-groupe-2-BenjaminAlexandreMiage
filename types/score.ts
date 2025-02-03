import { Player } from './player';

// Surely not the best choice

export type Love = {
  kind: 'LOVE';
};

export type Fifteen = {
  kind: 'FIFTEEN';
};

export type Thirty = {
  kind: 'THIRTY';
};

export type Point = Love | Fifteen | Thirty;

export type PointsData = {
  PLAYER_ONE: Point;
  PLAYER_TWO: Point;
};

export type FortyData = {
  player: Player; // The player who have forty points
  otherPoint: Point; // Points of the other player
};

export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

export const points = (
  playerOnePoints: Point,
  playerTwoPoints: Point
): Points => ({
  kind: 'POINTS',
  pointsData: {
    PLAYER_ONE: playerOnePoints,
    PLAYER_TWO: playerTwoPoints,
  },
});

export type Deuce = {
  kind: 'DEUCE';
};

export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player;
};

// Exerice 0: Write all type constructors of Points, Deuce, Forty and Advantage types.

export type Game = {
  kind: 'GAME';
  player: Player; // Player has won
};

export const game = (winner: Player): Game => ({
  kind: 'GAME',
  player: winner,
});

export type Score = Points | Forty | Deuce | Advantage | Game;

export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});

export const thirty = (): Thirty => ({
  kind: 'THIRTY',
});

export const fifteen = (): Fifteen => ({
  kind: 'FIFTEEN',
});

export const forty = (player: Player, point: Point): Forty => ({
  kind: 'FORTY',
  fortyData: {
    player: player,
    otherPoint: point,
  }
});

export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player: player,
});