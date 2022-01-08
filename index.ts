import * as dotenv from "dotenv";
import { Client, Intents, TextChannel } from "discord.js";
import { ethers } from "ethers";
import { NudeNFT__factory } from "./typechain/factories/NudeNFT__factory.js";

dotenv.config();

const NUDENFT_ADDRESS = '0x85E9dd3521B9c2Fd7AE9B6C4C9b394f040Bea136';

const provider = new ethers.providers.JsonRpcProvider({
    url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_PROJECT_ID}}`,
    user: "",
    password: process.env.INFURA_SECRET,
});

const contract = NudeNFT__factory.connect(NUDENFT_ADDRESS, provider);

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});

const CHANNEL_IDS = {
    nudeBot: "926198540240289863"
}

client.once("ready", () => {
    client.on('guildMemberAdd', (member) => {
        try {
            member.send(`Hey qt, I am NudeBot! The custom bot for Own Me and our $NUDE token. Happy to have you here! Don't be shy!\n\nPlease take my welcome package to get you started in our kinky and wild NFT marketplace. I'm sure you'll find something to peak your interest! :stuck_out_tongue_winking_eye:\n\nhttps://ownme.io\n\nBye now! See you around in the xxx-metaverse! :candy:`);
        } catch (e) {
            console.log(e);
        }
    });

    client.on('messageCreate', (message) => {
    });

    client.on('interactionCreate', (interaction) => {

    });

    contract.on(contract.filters.newNFTMinted(), (recipient, tokenId, tokenURI, price, event) => {
        try {
            const parsedTokenURI = JSON.parse(tokenURI);
            (client?.channels?.cache?.get(CHANNEL_IDS.nudeBot) as TextChannel)?.send({
                content: `**${parsedTokenURI.title}**\n\n${parsedTokenURI.description.slice(0, 1999)}\n\n${ethers.utils.formatEther(price)} NUDE\n\nhttps://mumbai.polygonscan.com/tx/${event.transactionHash}\n\n${parsedTokenURI.image}`,
                embeds: [
                    {
                        thumbnail: {
                            url: parsedTokenURI.image,
                        }
                    }
                ]
            });
        } catch (e) {
            console.log(e);
        }
    });

    console.log("NudeBot Ready!");
});

client.login(process.env.DISCORD_TOKEN);