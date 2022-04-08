const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.0'].messages.create({
  "channel_id": `909289312498090058`,
  "content": `Hey buddy!!! Welcome to the fam <@${context.params.event.user.id}>`,
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `Some rules to be followed`,
      "description": "",
      "color": 0x3c00ff,
      "fields": [
        {
          "name": `Rule 1`,
          "value": `Respect all members and bots in the family`
        },
        {
          "name": `Rule 2`,
          "value": `Do not use foul language in a manner of disrespecting others`
        },
        {
          "name": `Rule 3`,
          "value": `Have a lot of fun and sleep well`
        }
      ]
    }
  ]
});