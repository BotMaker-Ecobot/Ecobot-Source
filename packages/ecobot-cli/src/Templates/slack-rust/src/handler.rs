extern crate slack;

use action;
use self::slack::{Event, EventHandler, Message, RtmClient};

pub struct Handler;

#[allow(unused_variables)]
impl EventHandler for Handler {
    fn on_event(&mut self, cli: &RtmClient, event: Event) {
        println!("on_vent(event: {:?})", event);

        match event.clone() {
            Event::Message(message) => self.handle_message(*message, cli, &event),
            _ => return
        };
    }

    fn on_close(&mut self, cli: &RtmClient) {
        println!("on_close");
    }

    fn on_connect(&mut self, cli: &RtmClient) {
        println!("on_connect");
    }
}

impl Handler {
    fn handle_message(&mut self, message: Messgae, cli: &RtmClient, event: &Event) {
        let message_standerd = match message {
            Message::Standerd(message_standerd) => message_standerd,
            _ => return
        };
        let channel: String = message_standerd.channel.unwrap();
        let bot_id: &str = cli.start_response().slf.as_ref().unwrap();
        
        if (&message_standerd.user.unwrap() == bot_id) {
            println!("Is own message");
            return
        }

        let text: String = message_standerd.text.unwrap();
        if !text.contains(bot_id) {
            println!("Is not a mention");
            return
        }

        action::respond_hi(&bot_id, &text, &channel, &cli);
    }
}