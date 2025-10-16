package snakegame;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.util.Random;
import javax.swing.Timer;
import javax.swing.ImageIcon;
import javax.swing.JPanel;
public class Panel extends JPanel implements ActionListener, KeyListener{

    //length of snake
    private int[] snakexlength=new int[750];
    private int[] snakeylength=new int[750];
    private int lengthofsnake=3;  //length of body including head

    //set of coordinates predefined for the enemy
    private int[] xPos={25,50,75,100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475,500,525,550,575,600,625,650,675,700,725,750,775,800,825,850};
    private int[] yPos={75,100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475,500,525,550,575,600,625};

    private Random random=new Random(); //to selecting random value for enemy coordinate
    private int enemyX,enemyY;

    //variables for movement directions :
    private boolean left=false;
    private boolean right=true;
    private boolean up=false;
    private boolean down=false;
    private int moves=0;
    
    private int score=0; //score board and game over
    private boolean gameOver=false;
    private boolean pause=false;

    //Image variable declare and provided link of image
    private ImageIcon title = new ImageIcon( getClass().getResource("title.png")); 
    private ImageIcon snakehead = new ImageIcon( getClass().getResource("snake_green_head.png")); 
    private ImageIcon enemy = new ImageIcon( getClass().getResource("apple_red.png")); 
    private ImageIcon snakeimage = new ImageIcon( getClass().getResource("snake_green_blob.png")); 

    //speed of snake
    private Timer timer;
    private int delay=100;

    Panel() {
        addKeyListener(this);
        setFocusable(true);
        setFocusTraversalKeysEnabled(true);
        timer=new Timer(delay,this);
        timer.start();
        newEnemy();
    }



    @Override
    public void paint(Graphics g) {
        super.paint(g);
        //for title :
        g.setColor(Color.white);
        g.drawRect(24, 10, 851, 53);
        g.drawRect(24, 74, 851, 576);
        
        //for playground :
        title.paintIcon(this,g,25 ,11);
        g.setColor(Color.BLACK);
        g.fillRect(25, 75, 850, 575);

        //intial position of snake
        if(moves==0){
            snakexlength[0]=100;
            snakexlength[1]=75;
            snakexlength[2]=50;

            snakeylength[0]=100;
            snakeylength[1]=100;
            snakeylength[2]=100;
        }

        //pasting the snake-body image 
        if(left || right || up || down){
            snakehead.paintIcon(this,g,snakexlength[0],snakeylength[0]);
        }
        for(int i=1;i<lengthofsnake;i++){
            snakeimage.paintIcon(this,g,snakexlength[i],snakeylength[i]);
        }

        //painting enemy ball : 
        enemy.paintIcon(this,g,enemyX,enemyY);
        g.drawString("Score : "+score, 750, 30);
        g.drawString("Length : "+lengthofsnake, 750, 50);


        if(gameOver){    //game over 
            g.setColor(Color.white);
            g.setFont(new Font("Arial",Font.BOLD,50));
            g.drawString("Game Over!", 300, 300);

            g.setFont(new Font("Arial",Font.PLAIN,20));
            g.drawString("Press SPACE to Restart", 320, 350);

            g.setColor(Color.white);
            g.setFont(new Font("Arial",Font.PLAIN,14));
        }

        if(pause){   //Pause contain
        g.setColor(Color.white);
        g.setFont(new Font("Arial", Font.BOLD, 50));
        g.drawString("Game Paused", 300, 300);

        g.setFont(new Font("Arial", Font.PLAIN, 20));
        g.drawString("Press ENTER to Continue", 320, 350);

        g.setColor(Color.white);
        g.setFont(new Font("Arial", Font.PLAIN, 14));
        }
        

        
    }

    @Override
    public void actionPerformed(ActionEvent e){

        if(!pause){
        //logic for running of snake
        for(int i=lengthofsnake-1;i>0;i--){
            snakexlength[i]=snakexlength[i-1];
            snakeylength[i]=snakeylength[i-1];
        }
        if(left){
            snakexlength[0]=snakexlength[0]-25;
        }
        if(right){
            snakexlength[0]=snakexlength[0]+25;
        }
        if(up){
            snakeylength[0]=snakeylength[0]-25;
        }
        if(down){
            snakeylength[0]=snakeylength[0]+25;
        }

        if(snakexlength[0]>850)snakexlength[0]=25;
        if(snakexlength[0]<25)snakexlength[0]=850;

        if(snakeylength[0]>625)snakeylength[0]=75;
        if(snakeylength[0]<75)snakeylength[0]=625;

        collideswithenemy();
        collideswithbody();

        repaint();
    }
    }

    @Override  //not of use but have to Override in order to implement KeyListener
    public void keyTyped(KeyEvent e) {
        
    }

    @Override
    public void keyPressed(KeyEvent e) {
        // getting values for the arrow - keys : 
        if (e.getKeyCode() == KeyEvent.VK_SPACE) {
            for(int i = lengthofsnake-1;i>0;i--){
                if(snakexlength[i]==snakexlength[0] && snakeylength[i]==snakeylength[0]){
                    restart();
                }
            }
        } else if (e.getKeyCode() == KeyEvent.VK_ENTER) {
            if (pause) { // Unpause the game
                pause = false;
                repaint(); // Remove the pause message
            } else { // Pause the game
                pause=true;
                repaint();  //print the pause message
            }
        }
        if(!pause){
        if(e.getKeyCode()==KeyEvent.VK_LEFT && (!right)){
            left=true;
            right=false;
            up=false;
            down=false;
            moves++;
        }
        if(e.getKeyCode()==KeyEvent.VK_RIGHT && (!left)){
            left=false;
            right=true;
            up=false;
            down=false;
            moves++;
        }
        if(e.getKeyCode()==KeyEvent.VK_UP && (!down)){
            left=false;
            right=false;
            up=true;
            down=false;
            moves++;
        }
        if(e.getKeyCode()==KeyEvent.VK_DOWN && (!up)){
            left=false;
            right=false;
            up=false;
            down=true;
            moves++;
        }
    }

    }

    @Override //not in use but have to be override 
    public void keyReleased(KeyEvent e){}

    private void newEnemy() {  //to create new enemy 
        enemyX=xPos[random.nextInt(34)];
        enemyY=yPos[random.nextInt(23)];

        for(int i=lengthofsnake-1;i>=0;i--){
            if(snakexlength[i]==enemyX && snakeylength[i]==enemyY){
                newEnemy();
            }
        }
    }

    private void collideswithenemy() {   //after the head touches the enemy
        if(snakexlength[0]==enemyX && snakeylength[0]==enemyY){
            newEnemy();
            lengthofsnake++;
            score++;
        }
    }

    private void collideswithbody() {
        for(int i=lengthofsnake-1;i>0;i--){
            if(snakexlength[i]==snakexlength[0] && snakeylength[i]==snakeylength[0]){
                timer.stop();
                gameOver=true;
            }
        }
    }

    private void restart(){
        gameOver=false;
        moves=0;
        score=0;
        lengthofsnake=3;
        left=false;
        right=true;
        up=false;
        down=false;
        timer.start();
        newEnemy();
    }
    
}
