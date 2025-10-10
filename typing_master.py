import time 
print("Welcome to Typing Speed Tester")
print('''Rules:
      -Sentence will be provided to you 
      -Make sure to write each and everything correctly
      -To end the test you can type exit anytime
      -All the best----''')
name = input("Enter the name to proceed:")
actual = "Hello my name is Vishakha Kaithwas and i'm right now laughing and dancing at the same time"
print(actual) 
print("Press enter to start your time")
input()
for i in range(3,0,-1):
    print(i)
print("Here you go..")
start = time.time()
while (sentence :=input("Start typing...\n")) != "Exit":
    if sentence == actual:
        print("You got it..")
        break 
    else:
        print("Type againn")
end = time.time()
word = len(actual.split())
timetaken = end - start
speed = (word/timetaken)*60
print("Execution time:",timetaken)
print("Speed per minute:",speed)

with open("Performance.txt","a") as f:
    f.write(f"Name of the user: {name} | Execution time: {timetaken} | Speed: {speed}")