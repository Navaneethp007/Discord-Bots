import os
import discord
import requests
import json
import random 
from replit import db
from keep_alive import keep_alive

client= discord.Client()

good_words=["Healthy","healthy","exercise","proteins","egg","pushups","pullups","running","salad", "oatmeal","boxing","sports","work out"]
bad_words=["unhealthy","junk food", "burger","pizza","fried","too much","did not eat","dehydrated","fat","bloated","too much fats","no proteins","oily"]

healer_a=["Great work! keep it up buddy", "Keep going buddy","Stay healthy buddy","Have some fun too buddy"]
healer_b=["Don't worry buddy","Just work hard buddy","Don't get stressed...type ""/heal"" to get some motivation",]

encourage=["Way to go!","You are amazing","Sky is not your limit"]
 
start=["Hi","Hello","Hey","Hola"]
 
if "responding" not in db.keys():
  db["responding"]=True
def get_quote():
  response=requests.get("https://zenquotes.io/api/random")
  json_data= json.loads(response.text)
  quote=json_data[0]['q'] + '-' + json_data[0]['a']
  return(quote)

def update_encouragements(encouraging_message):
   if "encouragements" in db.keys():
     encouragements= db["encouragements"]
     encouragements.append(encouraging_message)
     db["encouragements"]=encouragements
   else:
    db["encouragements"]= [encouraging_message]

 def delete_encouragements(index):
   encouragements=db["encouragements"]
   if len(encouragements)>index:
     del encouragements[index]
     db["encouragements"]=encouragements

@client.event
async def on_ready():
  print('We have logged in {0.user}'.format(client))
	 

msg=message.content 
	 
if any(word in msg for word in start):
    await message.channel.send("Hi. Hope you are fine")
    await message.channel.send(random.choice(play))
   
   options=encourage
   if "encouragements" in db.keys():
   options.extend(db["encouragements"])
     
if message.content.startswith("/heal"):
    quote=get_quote()
    await message.channel.send(quote)
	 
if msg.startswith("/appreciate"):
     await message.channel.send(random.choice(options))
	 
if msg.startswith("/add"):
     encouraging_message=msg.split("/add ",1)[1]
     update_encouragements(encouraging_message)
     await message.channel.send("Appreciation added")
 
if msg.startswith("/remove"):
     encouragements=[]
     if "encouragements" in db.keys():
       index=int(msg.split("/remove",1)[1])
       delete_encouragements(index)
       encouragements=db["ëncouragements"]
     await message.channel.send(encouragements)
	 
if msg.startswith("/list"):
    encouragements=[]
    if "encouragements" in db.keys():
      encouragements=db["encouragements"]
    await message.channel.send(encouragements)
 
if any(word in msg for word in bad_words):
   await message.channel.send(random.choice(healer_b))
      
if any(word in msg for word in good_words):
    await message.channel.send(random.choice(healer_a))

client.run(os.getenv('TOKEN'))      
keep_alive()
