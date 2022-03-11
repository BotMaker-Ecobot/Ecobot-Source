package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

var (
	Token string // To store value of Token from config.json
	BotPrefix string

	config *configStruct
)

type configStruct struct {
	Token string `json : "Token"`
	BotPrefix string `json : "BotPrefix"`
}

func ReadConfig() error {
	fmt.Println("Rading config file...")
	file, err := ioutil.ReadFile("./config.json")

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	fmt.Println(string(file))
	err = json.Unmarshal(file, &config)

	if err != nil {
		fmt.Println(err.Error())
		return err
	}

	Token = config.Token
	BotPrefix = config.BotPrefix

	return nil
}
