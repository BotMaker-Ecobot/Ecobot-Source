package bot 

import (
    "discord-bot/config"
    "log"

    "github.com/bwmarrin/discordgo"
)

varBotIDString
vargoBot *discordgo.Session

func Run() {
    goBot, err := discordgo.New("Bot " + config.token)
}
