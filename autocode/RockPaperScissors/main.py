import os
import discord
import random 
from keep_alive import keep_alive


client= discord.Client()

start=["Rock","Paper","Scissors","rock","paper","scissors "]
play=["Rock","Paper","Scissors"]


@client.event
async def on_ready():
  print('We have logged in {0.user}'.format(client))

@client.event
async def on_message(message):  
  if message.author==client.user:
    return

  msg=message.content 

  if any(word in msg for word in start):
    await message.channel.send(random.choice(play))

keep_alive()
client.run(os.getenv('Token'))     
