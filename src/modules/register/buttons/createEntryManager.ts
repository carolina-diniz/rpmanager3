import { ButtonInteraction, Role } from "discord.js";
import { eventEmitter, onBuffered } from "../../../core";
import database from "../../../core/database/database";
import print from "../../../core/print/print";
import { genericPage } from "../../genericPage";

export async function execute(interaction: ButtonInteraction) {
  try {
    const { guild, channel: interactionChannel } = interaction;
    const roleName = "Gestor de Entrada";

    if (!guild) {
      print.error(__filename, "Guild not found in interaction");
      return interaction.reply({ content: "Erro: Servidor não encontrado.", ephemeral: true });
    }

    const role = await guild.roles.create({
      name: roleName,
    });

    if (!role) {
      throw new Error("Role not created");
    }

    await waitForRoleSave(role.id);
    await saveIsApprovalChannel(role);

    interaction.customId = "register_createroles";
    await genericPage.execute(interaction);

    if (interactionChannel?.isSendable()) {
      await interactionChannel.send(`Cargo \`${roleName}\` criado com sucesso!`);
    }
  } catch (error) {
    print.error(__filename, error);
  }
}

async function waitForRoleSave(roleId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Timeout ao salvar canal no banco de dados."));
    }, 10000);

    const listener = (savedRoleId: string) => {
      if (savedRoleId === roleId) {
        clearTimeout(timeout);
        eventEmitter.off("roleSaved", listener);
        resolve();
      }
    };

    onBuffered("roleSaved", listener);
  });
}

async function saveIsApprovalChannel(role: Role): Promise<void> {
  const guildDb = await database.get("guild", role.guild);
  const roleData = guildDb?.roles.get(role.id);

  if (!roleData) throw new Error("Role not found");

  roleData.EntryManager = true;

  guildDb?.roles.set(role.id, roleData);
  guildDb?.markModified("role");

  await guildDb?.save();
}
