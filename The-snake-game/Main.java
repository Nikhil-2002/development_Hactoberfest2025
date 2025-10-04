package snakegame;
import java.awt.Color;

import javax.swing.ImageIcon;
import javax.swing.JFrame;

public class Main{
    public static void main(String[] args){
        // Frame setting amd naming : 
        JFrame frame = new JFrame("Snake game");  //Title set
        frame.setBounds(10,19,905,700); //Set the boundary (Left margin , top margin , width , height)
        frame.setResizable(false);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        Panel panel = new Panel();
        panel.setBackground(Color.DARK_GRAY);
        frame.add(panel);
        frame.setVisible(true);
    }
}
