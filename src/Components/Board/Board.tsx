import React, { useState } from "react";
import "./Board.scss";
import { selectors } from "../../Redux/reducers/board/board";
import { selectors as gameSelectors } from "../../Redux/reducers/game/game";
import { SquareMatrix } from "../../Redux/reducers/board/board-interfaces";
import { connect } from "react-redux";
import SquareRow from "../SquareRow/SquareRow";
import { AppState } from "../../Redux/AppState";
import { GameStatus } from "../../Redux/reducers/game/game-interfaces";

interface Props {
  boardSquares: SquareMatrix;
  gameStatus: GameStatus;
}

const mapStateToProps = (state: AppState) => ({
  boardSquares: selectors.board(state),
  gameStatus: gameSelectors.gameStatus(state),
});

const getStatusIndicator = (
  gameStatus: GameStatus,
  mouseIsBeingPressed: boolean
) => {
  if (gameStatus === GameStatus.Lost) return "😵";
  if (gameStatus === GameStatus.Won) return "😎";
  if (mouseIsBeingPressed) return "😮";
  return "🙂";
};

const Board = ({ boardSquares, gameStatus }: Props) => {
  const [mouseIsBeingPressed, setMouseIsBeingPressed] = useState(false);
  const statusIndicator = getStatusIndicator(gameStatus, mouseIsBeingPressed);
  return (
    <div
      className="Board"
      onMouseDown={() => setMouseIsBeingPressed(true)}
      onMouseUp={() => setMouseIsBeingPressed(false)}
    >
      <header className="BoardHeader">
        <h5 className="GameTitle">MINESWEEPER</h5>
        {statusIndicator}
      </header>
      {boardSquares?.map((row, index) => (
        <SquareRow key={index} row={row} rowIndex={index} />
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(Board);
