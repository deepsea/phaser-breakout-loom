import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {

    openingText = Phaser.GameObjects.Text;
    gameOverText = Phaser.GameObjects.Text;
    playerWonText = Phaser.GameObjects.Text;

    constructor(){
        super('game-scene')
        this.gameStarted = false
    }

    preload() {

        this.load.image('paddle', 'assets/paddle.png')
        this.load.image('ball', 'assets/ball.png');
        this.load.image('brick1', 'assets/brick1.png');
        this.load.image('brick2', 'assets/brick2.png');
        this.load.image('brick3', 'assets/brick3.png');

    }

    create(){

        this.player = this.createPlayer()
        this.ball = this.createBall()

        this.blueBricks = this.createBlueBricks()
        this.yellowBricks = this.createYellowBricks()
        this.redBricks = this.createRedBricks()

        this.cursors = this.input.keyboard.createCursorKeys()

        this.player.setCollideWorldBounds(true)
        this.player.setImmovable(true)

        this.ball.setCollideWorldBounds(true)
        this.ball.setBounce(1, 1);

        this.physics.world.checkCollision.down = false

        this.physics.add.collider(this.ball, this.blueBricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball, this.yellowBricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball, this.redBricks, this.hitBrick, null, this);

        this.physics.add.collider(this.ball, this.player, this.hitPlayer, null, this)

        this.createOpeningText()
        this.createGameOverText()
        this.createPlayerWonText()

    }

    hitBrick(ball, brick){
        brick.disableBody(true, true);

        if(ball.body.velocity.x === 0){
            let rand = Math.random();
            if(rand >= 0.5) {
                ball.body.setVelocityX(150);
            } else {
                ball.body.setVelocityX(-150)
            } 
        }
    }

    createPlayerWonText() {

        this.playerWonText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'You won!',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '50px',
                fill: '#fff'
            }
        );
        
        this.playerWonText.setOrigin(0.5);
        this.playerWonText.setVisible(false);
    }

    createOpeningText(){

        this.openingText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,

            'Press SPACE to Start',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '50px',
                fill: '#fff'
            }
        )

        this.openingText.setOrigin(0.5)

    }

    createGameOverText() {

        this.gameOverText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,

            'Game Over',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '50px',
                fill: '#fff'
            }
        );

        this.gameOverText.setOrigin(0.5)
        this.gameOverText.setVisible(false)
    }

    update(){

        if(this.isGameOver(this.physics.world)){

            this.gameOverText.setVisible(true)
            this.ball.disableBody(true, true)

        } else if (this.isWon()){

            this.playerWonText.setVisible(true)
            this.ball.disableBody(true, true)

        } else {

            this.player.body.setVelocityX(0)

            if(this.cursors.left.isDown){
                this.player.body.setVelocityX(-350)

            } else if (this.cursors.right.isDown){
                this.player.body.setVelocityX(350)
            }
            
            if(!this.gameStarted){
                this.ball.setX(this.player.x)

                if(this.cursors.space.isDown){
                    this.gameStarted = true
                    this.ball.setVelocityY(-200)
                    this.openingText.setVisible(false)
                }
            }
        }

    }

    isWon(){
        return this.redBricks.countActive() + this.yellowBricks.countActive() + this.blueBricks.countActive() === 0
    }

    isGameOver(world){
        return this.ball.body.y > world.bounds.height
    }

    createPlayer(){
        let player = this.physics.add.sprite(400, 600, 'paddle')
        return player
    }

    createBall(){
        let ball = this.physics.add.sprite(400, 565, 'ball')
        return ball
    }

    createBlueBricks(){

        const blueBricks = this.physics.add.group({
            key: 'brick1',
            repeat: 9,
            immovable: true,
            setXY: { x: 80, y: 140, stepX: 70 }
        })

        return blueBricks
    }

    createYellowBricks(){

        const yellowBricks = this.physics.add.group({
            key: 'brick2',
            repeat: 9,
            immovable: true,
            setXY: { x: 80, y: 90, stepX: 70 }
        })

        return yellowBricks;
    }

    createRedBricks(){

        const redBricks = this.physics.add.group({
            key: 'brick3',
            repeat: 9,
            immovable: true,
            setXY: { x: 80, y: 40, stepX: 70 }
        })

        return redBricks;
    }


}

// https://drive.google.com/drive/folders/1pn3sW2XrvynN-zbVdQwSy3g2wn3xj8rW?usp=sharing
