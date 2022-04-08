// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const ytdl = require('ytdl-core');//download videos from youtube
const ytSearch = require('yt-search');//search videos 

let message = context.params.event.content;
let searchString = message.split(' ').slice(1).join(' ');

try {//since ytdl is a third party package it might have erros errorsso a try-catch
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
  let downloadInfo = await ytdl.getInfo(youtubeLink);//downloads and plays the song
  await lib.discord.voice['@0.0.1'].tracks.play({
    channel_id: `${process.env.VOC}`,
    guild_id: `${context.params.event.guild_id}`,
    download_info: downloadInfo
  });
  return lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Now playing **${downloadInfo.videoDetails.title}**`,
  });
} catch (e) {
  return lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Failed to play track!`,
  });
 }