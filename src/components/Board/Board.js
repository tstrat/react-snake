export default function Board (height = 30, width = 30) {
        this.lost = false;
        this.snake = new Chain(0,0); // head of snake
        this.tail = this.snake; // tail = head
        this.score = 0;
        this.causeOfDeath = '';
        this.createBoard = (x, y) => {
            let b = []
            for (let i = 0; i < x; i++) {
                b[i] = []
                for (let k = 0; k < y; k++) {
                    b[i][k] = 0
                }
            }
            return b;
        }
        this.moveSnake = (x, y) => {
            // logic to see if hit snake
            if (y > this.board.length-1 || y < 0){
                this.lost = true;
                this.causeOfDeath='Hit a Wall'
                return
            }
            if (x > this.board[y].length-1 || x < 0){
                this.lost = true;
                this.causeOfDeath='Hit a Wall'
                return
            }


            if ( this.board[y][x] === 1) {
                this.lost= true;
                if (this.snake.prev.x === x && this.snake.prev.y===y) {
                    this.causeOfDeath='Folded in on yourself'
                }
                else {
                    this.causeOfDeath='Ate your own tail'
                }
                return
            }


            let newHead = new Chain(x, y, this.snake);

            this.snake = this.snake.addNext(newHead);

            // if not eating apple
            if (this.board[y][x] !== 2){
                this.board[this.tail.y][this.tail.x] = 0
                this.tail = this.tail.kill()
            }
            else {
                this.setNewApple();
                this.score+=1;
            }
            this.board[y][x] = 1;
        }

        this.getBoard = () => this
        this.board = this.createBoard(height, width);
        this.board[0][0] = 1;

        this.setNewApple = function () {
            let ay = Math.floor(Math.random() * height);
            let ax = Math.floor(Math.random() * width);
            if (this.board[ay][ax]) {
                return this.setNewApple();
            }
            else {
                this.board[ay][ax] = 2;
            }
        }

        this.setNewApple();
}
class Chain {
    constructor(x,y, prev=null) {
        this.x = x
        this.y = y
        this.next = null
        this.prev = prev
    }

    addNext(chain) {
        this.next = chain
        return chain;
    }

    kill() {
        this.next.prev = null;
        return this.next;
    }

}


// let b = new Board(100,100);
// console.log(b.board)
// console.log(b.snake)
// b.moveSnake(1,0);
// console.log(b.snake)
