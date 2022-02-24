package config 
import (
    "encoding/config",
    "io/ioutil",
    "log"
)

var (
    Token string
    Prefix string
    config *configStruct
)

type _configStruct struct {
    Token string
    Prefix string
}

func ReadConfig() error {
    file, err := ioutil.ReadConfig("./config.json")
    if err != nil {
        log.Fatal(err)
        return err
    }
    err = json.Unmarshel(file, &config)
    if err != nil {
        log.Fatal(err)
        return err
    }
    Token = config.Token
    Prefix = config.Prefix

    return nil
}
