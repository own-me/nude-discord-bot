import * as dotenv from "dotenv";
import { Client, Intents } from "discord.js";

dotenv.config();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.once("ready", () => {
    client.on('guildMemberAdd', (member) => {
        member.send(`Hey qt, I am NudeBot! The custom bot for Own Me and our $NUDE token. Happy to have you here! Don't be shy!\n\nPlease take my welcome package to get you started in our kinky and wild NFT marketplace. I'm sure you'll find something to peak your interest! :stuck_out_tongue_winking_eye:\n\nhttps://ownme.io\n\nBye now! See you around in the xxx-metaverse! :candy:`);
    });

    client.on('messageCreate', (message) => {
    });

    client.on('interactionCreate', (interaction) => {
    });

    console.log("NudeBot Ready!");
});

client.login(process.env.DISCORD_TOKEN);