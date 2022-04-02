package bot

import (
	"fmt"
	"discord-golang/config"
	"github.com/ethanent/discordgo-scm"
	"github.com/bwmarrin/discordgo"
	log "github.com/sirupsen/logrus"
)

var BotId string
var goBot *discordgo.Session

func Start() {
	goBot, err := discordgo.New("Bot " + config.Token)

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	u, err := goBot.User("@me")
	
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	BotId = u.ID

	// Slash Command handler 
	m := scm.NewSCM()
	
	goBot.AddHandler(m.HandleInteractionCreate)
	goBot.AddHandler(messageHandler)

	err = goBot.Open()
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	err := m.CreateCommands(goBot, "")
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	fmt.Println("Bot is running !")
}

func messageHandler(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Author.ID == BotId {
		return
	}

	if m.Content == "ping" {
		_, _ = s.ChannelMessageSend(m.ChannelID, "Pong!")
	}
}

// When Someone joins the guild
func onGuildMemberAdd(s *discordgo.Session, event *discordgo.GuildMemberAdd) {
	log.WithFeilds(log.Fields{
		"guildId": event.GuildID,
		"joinedAt": event.JoinedAt,
		"userId": event.User.ID,
		"username": event.User.Username,
	}).Debug("Recieved guild member add event from Discord Websocket API.")

	guild, err := s.Guild(event.GuildID)
	if err != nil {
		log.WithFeilds(log.Feilds{
			"guildId": event.GuildID,
			"captureError": err,
		}).Error("Could not retrieve guild object from identifier")
		return
	}

	primaryChan, err := findPrimaryChannelInGuild(s, &event.GuildID)
	if err != nil {
		logrus.WithFields(logrus.Fields{
			"userId":        event.User.ID,
			"guildId":       event.GuildID,
			"capturedError": err,
		}).Error("Could not determine primary channel for guild.")
		return
	}}
// create a private messaging channel between the bot and the new guild member
	privChan, err := s.UserChannelCreate(event.User.ID)
	if err != nil {
		logrus.WithFields(logrus.Fields{
			"userId":        event.User.ID,
			"capturedError": err,
		}).Error("Could not create channel between bot and user.")
		return
	}

	// send greet message to new guild member
	s.ChannelMessageSend(privChan.ID, "Welcome to "+guild.Name+"! We recommend setting your Pokemon GO team to grant access to team-only channels. To do so, type `!setTeam [name]` into the #"+primaryChan.Name+" text channel to set your Pokemon GO team. Available team names are: 'valor' (red), 'mystic' (blue) and 'instinct' (yellow).")
}
