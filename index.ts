import * as dotenv from "dotenv";
import { Client, Intents } from "discord.js";

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
	console.log("NudeBot Ready!");
});

client.login(process.env.DISCORD_TOKEN);