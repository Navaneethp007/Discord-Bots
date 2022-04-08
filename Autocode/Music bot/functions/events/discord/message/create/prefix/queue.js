// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

let message = context.params.event.content;
let searchString = message.split(' ').slice(1).join(' ');

try {
  let youtubeLink;
  if (!searchString) {
    return lib.discord.channels['@0.3.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `No search string provided!`,
    });
  }
  if (!searchString.includes('youtube.com')) {
    let results = await ytSearch(searchString);
    if (!results?.all?.length) {
      return lib.discord.channels['@0.3.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `No results found for your search string. Please try a different one.`,
      });
    }
    youtubeLink = results.all[0].url;
  } else {
    youtubeLink = searchString;
  }
  let queueKey = `${context.params.event.guild_id}:musicQueue`;
  let currentQueue = await lib.utils.kv['@0.1.16'].get({
    key: queueKey,
    defaultValue: []
  });
  currentQueue.push(youtubeLink);
  await lib.utils.kv['@0.1.16'].set({
    key: queueKey,
    value: currentQueue
  });
} catch (e) {
   return lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Failed to play track!`,
  });
}