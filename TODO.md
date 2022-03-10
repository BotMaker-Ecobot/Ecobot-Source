## MVP
 1. be able to run `ecobot init`
 2. be able to run `ecobot add`

# TODO LIST
    * [x] Move Generator.js methods into a class
    * [x] Figure out how to run ecobot init
    * [ ] rewrite all templates

## Understanding commands

1. ecobot init
    - creates the initial files for just a simple discord bot
         - Command List
            - !echo
            - !ping
            - !server
            - !help
    - Also has the ability to welcome the user in a message embed

2. ecobot add
    - Add a package to the main template
        - Possible packages:
            - music 
                - !play 
                - !pause
                - !mute-music
                - !search 
                - !info
            - fun
                - Command List:
                    - !poll
                    - !meme
                    - !jump-game
            - moderation
                - Command List:
                    - !reaction-role
                    - !kick
                    - !mute
                    - !timeout
    - Updates the !help commands as it is needed
    - Updates package.json as it is needed aswell
    - Along with the .env template.
                    - !ban
                    - !slowmode
                    - !user

