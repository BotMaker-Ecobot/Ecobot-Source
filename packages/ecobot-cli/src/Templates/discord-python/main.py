import os
import discord
from dotenv import load_dotenv
from util import random_quote

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD = os.getenv('DISCORD_GUILD')

client = discord.Client()
# On ready
@client.event
async def on_ready():
    guild = discord.utils.find(lambda g: g.name == GUILD, client.guilds)
    print(
        f'{client.user} is connected to the following guild: \n'
        f'{guild.name}(id: {guild.id})'
    )

    # Print all members inside of guild
    members = '\n - '.join([member.name for member in guild.members])
    print(f'Guild Members:\n - {members}')

# On message
@client.event
async def on_message(message):
    if message.author == client.user:
        return
    
    if message.content == '!99':
        response = random_quote()
        await message.channel.send(response)
    elif message.content == 'raise-exception':
        raise discord.DiscordException


# Welcoming new members
@client.event
async def on_member_join(member):
    await member.create_dm()
    await member.dm_channel.send(
        f'Hi {member.name}, welcome to my Discord server!'
    )

@client.event
async def on_error(event, *args, **kwargs):
    with open('err.log', 'a') as f:
        if event == 'on_message':
            f.write(f'Unhandled message: {args[0]}\n')
        else:
            raise 
client.run(TOKEN)
