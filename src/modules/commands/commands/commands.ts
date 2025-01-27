import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import print from "../../../core/print/print";

export const data = new SlashCommandBuilder()
  .setName("commands")
  .setDescription("Lista todos os comandos");

export async function execute(interaction: CommandInteraction) {
  try {
    const embed = new EmbedBuilder()
    .setTitle("Lista de comandos")
    .setDescription("**1. `uptime`** - Exibe o tempo que o Bot está online.\n"+
      "**2. `register`** - Abre o menu para registrar um Set.\n"+
      "**3. `action`** - Cria uma ação com data e hora especificadas.\n"+
      "**4. `recruitment`** - Mostra a lista das 10 pessoas que mais recrutaram.\n"+
      "**5. `commands`** - Exibe todos os comandos disponíveis no Bot.")
      

      await interaction.reply({embeds:[embed], ephemeral:true})
    
  } catch (error) {
    print.error(
      __filename,
      "error ao executar o comando commands",
      error,
      interaction.guild,
      interaction.user,
      interaction.channel
    );
  }
}
