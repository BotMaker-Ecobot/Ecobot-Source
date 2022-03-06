
import inquirer
from pyfiglet import Figlet
from simple_chalk import chalk
from Util import *
from distutils.dir_util import copy_tree

ClearConsole()
f = Figlet(font='slant')
print(chalk.green.bold(f.renderText('Ecobot')))

cwd = '' + os.getcwd()

questions = [
    inquirer.Text('name', message="What's your name?", default="Deondre"),  # 0
    inquirer.Text('surname', message="What's your surname?", default="English"),  # 1
    inquirer.List('size', choices=['small', 'medium', 'large'], default='small'),  # 2
    inquirer.Text('dir-file', message="Where is the path?", default='temp'),  # 3
    inquirer.List('template_type', choices=['Rust', 'Javascript', 'Go', 'Python', 'Java'], default='Javascript')  # 4
]

answers = inquirer.prompt(questions)

data = []

for answer in answers:
    if answer is None:
        pass

    # Add the answers to the data array
    data.append(answers[answer])


def CreatePath(parent_dir, folder_name, template_name):
    """
    param parent_dir:
        - The current working directory.
    param folder_name:
        - The name of the folder.
    param template_name:
        - The name of the language that the user wishes to choose.
    return:
        - Successful print statement that is green
    """

    # check for null reference errors
    if parent_dir or folder_name or template_name is None:
        print(chalk.yellow.bold("One of the given parameters is null"))
        pass

    path_created = os.path.join(parent_dir, folder_name)

    # If the directory does not exist create the directory
    if CheckForDirectory(path_created) is False:
        os.mkdir(path_created)

    path_template = os.path.join(parent_dir, 'discord-' + template_name)

    copy_tree(path_template, path_created)

    print(chalk.green.bold("Directory '%s' created" % folder_name))


print(type(data[3]))
CreatePath(cwd, data[3], data[4])
