import random
rock = '''
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
'''

paper = '''
    _______
---'   ____)____
          ______)
          _______)
         _______)
---.__________)
'''

scissors = '''
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
'''

# user input
user = input("Enter rock, paper or scissors: ").lower()
print("User chose:")

# Display user's choice
if user == 'rock':
    print(rock)
elif user == 'paper':
    print(paper)
elif user == 'scissors':
    print(scissors)
else:
    print("Invalid choice!")

# Generate computer choice
comp = random.randint(1, 3)
print("Computer chose:")

# print comp choice
if comp == 1:
    print(rock)
    comp_choice = 'rock'
elif comp == 2:
    print(paper)
    comp_choice = 'paper'
else:
    print(scissors)
    comp_choice = 'scissors'

if user not in ['rock', 'paper', 'scissors']:
    print("Please choose a valid option.")
else:
    if user == comp_choice:
        print("It's a draw!")
    elif (user == 'rock' and comp_choice == 'scissors') or \
         (user == 'paper' and comp_choice == 'rock') or \
         (user == 'scissors' and comp_choice == 'paper'):
        print("You win!")
    else:
        print("You lose!")
