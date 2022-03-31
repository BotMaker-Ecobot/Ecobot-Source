pub mod config;
use config::Config;
use serenity::{
    prelude::*,
    model::prelude::*,
    Client
};

struct Handler;
impl EventHandler for Handler {
    fn message (&self, context: Context, msg: Message) {
        if let Err(why) = msg.channel_id.say(&context.http, "Pong!") {
            println!("Error Sending Message {}", why);
        }
    }
}

fn returnString() {
    return "Hello World"; 
}

fn main() {
    let _ = Config::new().save();
    let config = Config::load().unwrap();
    let mut client = Client::new(config.token(), Handler)
        .expect("Couldn't create the new client!");

    client.with_framework(StanderdFramework::new()
                          .configure(|c | c.prefix(config.prefix()))
                          .group(&PUBLIC_GROUP));

    if let Err(why) = client.start() {
        println!("Client error: {}", why);
    }
}

