// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const ytdl = require('ytdl-core');

let queueKey = `${context.params.event.guild_id}:musicQueue`;
let currentQueue = await lib.utils.kv['@0.1.16'].get({
  key: queueKey,
  defaultValue: []
});

let nextTrack;

if (currentQueue.length) {
  nextTrack = currentQueue[0];

  await lib.utils.kv['@0.1.16'].set({
    key: queueKey,
    value: currentQueue.slice(1)
  });
}

if (nextTrack) {
  try {
    let downloadInfo = await ytdl.getInfo(nextTrack);
    await lib.discord.voice['@0.0.1'].tracks.play({
      channel_id: `${process.env.VOC}`,
      guild_id: `${context.params.event.guild_id}`,
      download_info: downloadInfo
    });
  } catch(e) {
    console.log(e);
  }
}