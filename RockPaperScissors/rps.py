#ROCK PAPER SCISSORS GAME
import os
import random
os.system("title ROCK PAPER SCISSORS GAME - Harrison")
# os.system("cls")

os.system("color cb")
User_name = input("Hi, my name is H-Bot. What's yours? ")
def cool_name():
    print("Cool name. Can't wait to see how well you play :)")
if User_name != "":
    cool_name()
if User_name == "":
    User_name = "Bob"
    print("\nYou didn't input any name so I'll call you Bob.")
print(User_name)
os.system("title H-Bot vs " + User_name)
start = input("\n           H-Bot vs " + User_name + ". \n\nReady to play? (Y/N): ")
def game_begin(start):
    if start.lower() == "y" or start.lower() == "yes":
        def rounds_func():
            global rounds
            rounds = input("How many rounds to win? ")
        rounds_func()
        def round_correct_func(rounds_p):
            global rounds
            if rounds_p == "" or rounds_p == "0":
                global rounds
                rounds = "10"
                print("You are playing 10 rounds.")
            elif rounds.isdigit() == False:
                    rounds_2 = input("Please enter a valid number of rounds: ")
                    rounds = rounds_2
                    round_correct_func(rounds_2)
            elif rounds.isdigit() == True:
                if type(rounds) == float:
                    rounds_2 = input("Please enter a valid number of rounds: ")
                    rounds = rounds_2
                    round_correct_func(rounds_2)

            # else:
        round_correct_func(rounds)
        print("\n                GAME ON!\n")
        choices = {1: 'rock', 2: 'paper', 3: 'scissors'}
        print("This is the rule of the game: \nYou are only allowed to pick rock, paper or scissors. \n")
        print("1. Rock \n2. Paper \n3. Scissors \nGuarantee: H-Bot doesn't make choices based on your input.")
        def collect_user_choice():
            global user_choice
            user_choice = input(" \nSelect a choice: ")
        collect_user_choice()
        def score_create():
            global H_Bot_score
            global User_score
            H_Bot_score = 0
            User_score = 0
            global H_Bot_score_main
            global User_score_main
            H_Bot_score_main = 0
            User_score_main = 0
        score_create()
        # 
        def game_round_replay():
            collect_user_choice()
            collect_proper_user_choice(user_choice)
        def score_update(H_Bot_score_main, User_score_main):
            # print(User_score_main)
            global User_score
            User_score = User_score_main
            global H_Bot_score
            H_Bot_score = H_Bot_score_main
        
        

        def correct_user_choice_input(H_Bot_score, User_score, user_choice):
            if type(user_choice) == int:
                choice_conv = choices[user_choice]
            if type(user_choice) == str:
                choice_conv = user_choice.lower().strip()
            choice_box = [1, 2, 3]

            H_Bot_choice = random.choice(choice_box)
            print("\n" + User_name + " chose " + choice_conv)
            print("H-Bot chose " + choices[H_Bot_choice])
            
            def big_score(who, H_Bot_score, User_score):
                winner = who
                def H_Bot_score_increment(H_Bot_score):
                    def H_Bot_adder():
                        global H_Bot_score_main
                        H_Bot_score_main = H_Bot_score + 1
                        print("H-Bot has " + str(H_Bot_score_main) + " point(s)")
                        
                    if winner == "H-Bot":
                        H_Bot_adder()
                    else:
                        global H_Bot_score_main
                        H_Bot_score_main = H_Bot_score
                        print("H-Bot has " + str(H_Bot_score) + " point(s)")
                H_Bot_score_increment(H_Bot_score)
                def User_score_increment(User_score):
                    def User_adder():
                        global User_score_main
                        User_score_main = User_score + 1
                        print(User_name + " has " + str(User_score_main) + " point(s)")
                    if winner == "User":
                        User_adder()
                    else:
                        global User_score_main
                        User_score_main = User_score
                        print(User_name + " has " + str(User_score) + " point(s)")
                User_score_increment(User_score)
                score_update(H_Bot_score_main, User_score_main)

            def main_game():
                if choice_conv == "rock" and choices[H_Bot_choice] == "paper":
                    big_score("H-Bot", H_Bot_score, User_score)
                if choice_conv == "rock" and choices[H_Bot_choice] == "scissors":
                    big_score("User", H_Bot_score, User_score)
                if choice_conv == "rock" and choices[H_Bot_choice] == "rock":
                    print("Wow. We both chose 'rock'")
                if choice_conv == "paper" and choices[H_Bot_choice] == "scissors":
                    big_score("H-Bot", H_Bot_score, User_score)
                if choice_conv == "paper" and choices[H_Bot_choice] == "paper":
                    print("Wow. We both chose 'paper'")
                if choice_conv == "scissors" and choices[H_Bot_choice] == "scissors":
                    print("Wow. We both chose 'scissors'")
                if choice_conv == "paper" and choices[H_Bot_choice] == "rock":
                    big_score("User", H_Bot_score, User_score)
                if choice_conv == "scissors" and choices[H_Bot_choice] == "rock":
                    big_score("H-Bot", H_Bot_score, User_score)
                if choice_conv == "scissors" and choices[H_Bot_choice] == "paper":
                    big_score("User", H_Bot_score, User_score)
                if H_Bot_score_main < int(rounds) and User_score_main < int(rounds):
                    game_round_replay()
                else:
                    if H_Bot_score_main == int(rounds):
                        print("             H-Bot wins!!")
                    if User_score_main == int(rounds):
                        print("             " + User_name + " wins!!")
                    new_game = input("New game? (Y/N): ")
                    def new_game_f(new_game):
                        
                        if new_game.lower() == "y" or new_game.lower() == "yes":
                            os.system("cls")
                            rounds_func()
                            round_correct_func(rounds)
                            score_create()
                            game_round_replay()
                        else:
                            if new_game.lower() == "n" or new_game.lower() == "no":
                                print("Nice playing with ya!")
                            else:
                                new_game_2 = input("Please enter 'YES' to start a new game or 'NO' to quit: ")
                                new_game_f(new_game_2)
                    new_game_f(new_game)

               
            main_game()
            
            
        def collect_proper_user_choice(user_choice):
            if str(user_choice).isdigit() == True:
                user_choice = int(user_choice)
            if type(user_choice) == int:
                if user_choice == 1 or user_choice == 2 or user_choice == 3:
                    correct_user_choice_input(H_Bot_score, User_score, user_choice)
                else:
                    user_choice_2 = input("\nInvalid choice: ")
                    if str(user_choice_2).isdigit() == True:
                        user_choice_2 = int(user_choice_2)
                    collect_proper_user_choice(user_choice_2)
                
            else:
                if  user_choice.lower().strip() == "rock" or user_choice.lower().strip() == "paper" or user_choice.lower().strip() == "scissors":
                    correct_user_choice_input(H_Bot_score, User_score, user_choice)
                else:
                    user_choice_2 = input("\nInvalid choice: ")
                    collect_proper_user_choice(user_choice_2)
        collect_proper_user_choice(user_choice)
        

    else:
        start_2 = input("Enter 'Yes' when ready: ")
        game_begin(start_2)
game_begin(start)
# RP RS RR PS PP SS