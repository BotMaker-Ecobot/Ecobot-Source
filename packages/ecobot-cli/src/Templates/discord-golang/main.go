package maim

import ( 
	"fmt"
	"discord-golang/bot"
	"discord-golang/config"
)

func main() {
	err := config.ReadConfig()

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	bot.Start()
	<-make(chan struct{})
	return
}
