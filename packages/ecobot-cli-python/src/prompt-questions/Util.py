import os
import inquirer


def ClearConsole():
    command = 'clear'
    if os.name in ('nt', 'dos'):
        command = 'cls'

    os.system(command)


def CheckForDirectory(path):
    isDir = os.path.isdir(path)

    questions = [inquirer.Confirm(name='existing-directory',
                                  message='The directory path_name already exists, would you like to replace it?',
                                  default='Y')]

    if isDir:
        answer = inquirer.prompt(questions)
        print(answer)

        for ans in answer:
            return answer[ans]

    return False
