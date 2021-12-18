import discord
import os
from discord.ext import commands, tasks

client = discord.Client()

for file in os.listdir('./cogs'):
    if file.endswith('.py'):
        name = file[:-3]

        client.load_extension(f"cogs.{name}")

@cleint.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$hello'):
        await message.channel.send('Hello!')

client.run('your-token')
