import React, { Component } from 'react';
import Board from './components/Board/Board';
import './app.scss';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      board: new Board(),
      direction: 'R',
      start: false
    }
    this.interval = null;
  }

  componentDidMount() {
    const { direction } = this.state;
    window.addEventListener('keypress', (e) => {
      // console.log(e.code);
      let dir = ''
      switch (e.code) {
        case 'KeyA':
          dir = 'L'
          break
        case 'KeyD':
          dir = 'R'
          break
        case 'KeyW':
          dir = 'U'
          break
        case 'KeyS':
          dir = 'D';
          break
        default:
          dir = direction
          break
      }

      this.setState({
        direction: dir
      })
    })


  }

  start() {
    const { board } = this.state;
    this.interval = setInterval(() => {
      let dir = this.state.direction;
      let x = board.snake.x;
      let y = board.snake.y;
      switch(dir) {
        case 'L':
          x-=1
          break;
        case 'R':
          x+=1
          break;
        case 'U':
          y-=1
          break;
        case 'D':
          y+=1
          break;
        default:
          break;
      }
      board.moveSnake(x, y)
      this.setState({
        board: board.getBoard(),
        start: true
      })

    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  lost(){
    clearInterval(this.interval)

  }

  restart() {
    clearInterval(this.interval)
    this.setState({
      direction: 'R',
      board: new Board(),
      start: false
    })
  }
  render() {
    const { board, start } = this.state;
    // console.log(board);
    if (!board){
      return <></>
    }
    if (board.lost) {
      this.lost();
    }
    const mappedBoard = board.board.map(row =>
      <div className='row'>
        {row.map(
          tile => <div
            className={
              `col tile
              ${tile===1 ? 'snake':
                tile===2 ? 'apple':''}`
            }>
              {/* {tile} */}
            </div>
        )}
      </div>
    )

    return (
      <div className='app'>
        <div className='score'>Score: {board.score}</div>
        <div className='snake-status'>Status: {
          board.causeOfDeath ? board.causeOfDeath : 'Alive'
        }</div>
        {mappedBoard}
        <button disabled={start} onClick={() => this.start()}>Start</button>
        <button onClick={() => this.restart()}>Restart</button>
      </div>
    );
  }
}

export default App;
