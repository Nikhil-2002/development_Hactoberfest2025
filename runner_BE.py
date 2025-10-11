from flask import Flask
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    call_python_script()
    return "Python (Flask) server is running!\n"

def call_python_script():
    process = subprocess.Popen(['python', 'test.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    if stdout:
        print(f"Python script output: {stdout.decode().strip()}")
    if stderr:
        print(f"Error from Python script: {stderr.decode().strip()}")
    print(f"Python script exited with code {process.returncode}")

if __name__ == '__main__':
    app.run(port=3000)
