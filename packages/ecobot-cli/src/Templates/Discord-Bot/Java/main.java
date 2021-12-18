public class Bot extends ListenerAdapter
{
  public static void main(String[] args) throws LoginException
  {
    if (args.length < 1) {
      System.out.println("You have to provide a token as first argument");
      System.exit(1);
    }

    JDABuilder.createLight(args[0], GatewayIntent.GUILD_MESSAGES, GatewayIntent.DIRECT_MESSAGES)
              .addEventListeners(new Bot())
              .setActivity(Activity.playing("Type !ping"))
              .build();
  }

  @Override
  public void onMessageReceived(MessageReceivedEvent event)
  {
    Message msg = event.getMessage();
    if (msg.getContentRaw().equals("!ping"))
    {
      MessageChannel channel = event.getChannel();
      long time = System.currentTimeMillis();
      channel.sendMessage("Pong!")
             .queue(response -> {
               response.editMessageFormat("Pong: %d ms", System.currentTimeMillis() - time).queue();``
             })
    }
  }
}
