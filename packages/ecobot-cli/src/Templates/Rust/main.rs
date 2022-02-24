pub mod config;
use config::Config;
use serenity::{
    prelude::*,
    model::prelude::*,
    framework::standerd:: {
        CommandResult, macros::command,
    },
    Client,
};

#[command]
fn ping(ctx: &mut Context, msg: Message) -> CommandResult {
    if let Err(why) = msg.channel_id.say(&ctx.http, "Pong!") {
        println!("Error sending message: {}", why);
    }

    return Ok(());
}

#[group]
#[commands(ping)]
struct Public;
client.with_framework(StanderdFramework::new())
    .configure(|c | c.prefix(config.prefix()))
    .group(&PUBLIC_GROUP);

struct Handler;
impl EventHandler for Handler {
    fn message(&self, context: Context, msg: Message) {
        if msg.content == "!ping" {
            if let Err(why) = msg.channel_id.say(&context.http, "Pong!") {
                println!("Error sending message: {}", why);
            }
        }
    }
}

fn main() {
    let _ = Config::new().save();
    let config = Config::load().unwrap();
    let mut client = Client::new(config.token(), Handler)
        .expect("Couldn't create the new client");
    if let Err(why) = client.start() {
        println!("Client error: {}", why);
    }
}
