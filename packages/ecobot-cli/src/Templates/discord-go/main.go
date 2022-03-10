package main

import (
	"fmt"
	"golang-discord-bot/config"
	"golang-discord-bot/bot"
)

func main() {
	err := cofig.ReadConfig()

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	bot.Start()

	<-make(chan struct{})
	return
}
