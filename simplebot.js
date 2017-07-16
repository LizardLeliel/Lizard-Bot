const Discord = require('discord.js');
const fs      = require('fs');

const client = new Discord.Client();

const yesNoQuestion = /^l(izard)?[ -_]?bot,.+\?$/i;
const whoQuestion   = /^l(izard)?[ -_]?bot, who[^?]+\?$/i; 
const whySubExp     = /^l(izard)?[ -_]?bot, who/i;
const ingRegExp     = /^[a-z]ing\.?$/i;

const eightBallReplies = ["I don't know.", "I don't care.", "Yes.", "Very yes!", "No.", "Very no!",
                          "Ask Leliel.", "I think so.", "I don't think so.", "Sure.",
                          "It will be soon.", "definitely!", "Oh my god, yes!", "🤔",
                          "If you believe in yourself it will be!", "You don't want to know the answer.",
                          "You're right!", "I think so.", "Maybe -_-", "I can't tell.", "Nah.",
                          "Ew no/", "My connections say no.", "lol no!", "definitely not.",
                          "Literally yes!", "Literally no.", "Uhhhh...", "Pffft hahaha!",
                          "Let me google the answer for you...", "The answer is in your heart.",
                          "...", "Yes, only because I love you <3", "*nods*.", "100% sure!", "For sure!",
                          "I'm sorry, but no...", "I'm sorry, but the answer is yes...",
                          "Over my dead body!", "Defiantly", "I'm not telling~ <3", "404 answer not found."]


const clientToken = fs.readFileSync("client token.txt").toString();

// Pick a random element from an array
function pick(array)
{
    return array[Math.floor(Math.random()*array.length)]
}

client.on("ready", () => 
{
    console.log("I'm ready!");
});

client.on("message", message => 
{
    // replacing _ing with _ong
    if (ingRegExp.test(message.content))
    {
        message.channel.send(message.content[0] + "ong");
    }

    // Answering "Lizard bot, who ___?"
    if (whoQuestion.test(message.content))
    {
        var target = pick(Array.from(message.channel.guild.members.values()));
        var targetName = target.nickname !== null ? target.nickname : target.user.username;

        message.channel.send(message.content.replace(whySubExp, targetName).replace("?", "."));

    }

    // Answering "Lizard bot, ___?"
    else if (yesNoQuestion.test(message.content))
    {
        message.channel.send(pick(eightBallReplies));
    } 

});

client.login(clientToken);
