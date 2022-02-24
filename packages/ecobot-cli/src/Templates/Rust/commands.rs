
#[command]
fn cat(ctx: &mut Context, msg: Message) -> CommandResult {
    if let Err(why) = msg.channel_id.send_message(&ctx.http, |m | {
        m.embed(|e | {
            e.title("This is a cat!");
            e.description("This is a description of the cat!");

            return e;
        });

        return m;
    }) {
        println!("Error sending embed: {}", why);
    }

    return Ok(());
}
