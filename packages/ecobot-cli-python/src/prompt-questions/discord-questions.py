from asyncio.windows_events import NULL
import re
import os
import inquirer
from pyfiglet import Figlet
from simple_chalk import chalk

def ClearConsole():
    command = 'clear'
    if os.name in ('nt', 'dos'):
        command = 'cls'

    os.system(command)


ClearConsole()
f = Figlet(font='slant')
print(chalk.green.bold(f.renderText('Ecobot')))

cwd = '' + os.getcwd()

questions = [
    inquirer.Text('name', message="What's your name?", default="Deondre"),
    inquirer.Text('surname', message="What's your surname?", default="English"),
    inquirer.List('size', choices=['small', 'medium', 'large'], default='small'),
    inquirer.Text('dir-file', message="Where is the path?", default=cwd)
]

answers = inquirer.prompt(questions)

data = []

for answer in answers:
    if answer == NULL:
        break

    data.append(answers[answer])
    print(data)
