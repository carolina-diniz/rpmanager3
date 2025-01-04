import { CommandInteraction, SlashCommandBuilder, TextChannel } from "discord.js";
import { client } from "../../connections";
import print from "../../core/print/print";
import { createRegisterMessage } from "../register/buttons/createEntryChannel";

export const data = new SlashCommandBuilder()
  .setName("update_pedirset")
  .setDescription("Atualiza os membros do servidor.");

export async function execute(interaction: CommandInteraction) {
  try {
    const guilds = await client.guilds.fetch();

    guilds.each(async (OAuth2Guild) => {
      const guild = await client.guilds.fetch(OAuth2Guild.id);

      const pedirsetList = [
        "1324961875758153778", // teste
        "1263726692761997333",
        "1318400871822004234",
        "1266621436940910733",
        "1264277233799925830",
        "1190939967585796166",
        "1286510194570039369",
        "1287310834271260734",
        "1290636383421071412",
        "1292738249155936369",
        "1293227378847256726",
        "1314085976284332103",
        "1295028345318146079",
        "1303043453470507079",
        "1303477564861321266",
        "1315158964165410918",
        "1313608984011477044",
        "1318659286770909284",
        "1321665648442609716",
        "1324869477287854154",
        "1323369369799098400",
        "1324329317756440649",
        "1226608600257134774",
        "1324871196180877485",
      ];

      for (const channelId of pedirsetList) {
        console.log("pedirsetList ", channelId);

        if (guild.channels.cache.has(channelId)) {
          const channel = await guild.channels.fetch(channelId);

          if (channel && channel.isTextBased()) {
            const messages = await channel.messages.fetch();

            for (const message of messages.values()) {
              await message
                .delete()
                .then(() => console.log("messagem deletada"))
                .then(() => console.error("erro ao deletar mensagem"));
            }

            await createRegisterMessage(channel as TextChannel, guild.name);
          }
        }
      }
    });

    console.log("Membros atualizados com sucesso!");
  } catch (error) {
    print.error(__filename, error);
  }
}
