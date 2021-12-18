package main

import (
  "flag"
  "fmt"
  "os"
  "os/signal"
  "syscall"

  "github.com/bwmarrin/discordgo"
)

var (
  Token string
)

func Init() {
    flag.StringVar(&Token, "t", "", "Bot Token")
    flag.Parse()
}

func Main() {
  dg, err := discordgo.New("Bot " + Token)
  if err != nil {
    fmt.Println("Error: Discord bot creation process failed!")
    return
  }

  dg.AddHandler(messageCreate)

  dg.Identify.Intents = discordgo.intentsGuildMessages

  err = dg.Open()
  if err != nil {
    fmt.Println("Error: Opening discord bot")
    return
  }

  fmt.Println("Bot is now running. Press Ctrl-C to exit.")
  sc := make(chan os.Signal, 1)
  signal.Notify(sc, syscall.SIGNIT, syscall.SIGTERM, os.Interrupt, os.Kill)
  <-sc

  dg.Close()
}

func messageCreate(s *discordgo.Session, m *discordgo.MessageCreate) {
  if m.Author.ID == s.State.User.ID {
    return
  }

  if m.Content == "ping" {
    s.ChannelMessageSend(m.ChannelID, "Pong!")
  }

  if m.Content == "pong" {
    s.ChannelMessageSend(m.ChannelID, "Ping!")
  }
}
