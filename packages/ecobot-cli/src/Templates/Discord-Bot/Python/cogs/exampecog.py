class ExampleCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

@commands.command()
async def test(self, ctx):
    await ctx.send('**test**')

@commands.Cog.listener()
async def on_ready(self):
    print("Test")

def setup(client):
    client.add_cog(ExampleCog(client))
