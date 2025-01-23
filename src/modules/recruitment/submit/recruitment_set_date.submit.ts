import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";
import print from "../../../core/print/print";
import modelRecruitment from "../../../core/database/models/recruitments/modelRecruitment";

export async function execute(interaction: ModalSubmitInteraction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const { fields, message, guild } = interaction;

    const initialDateRaw = fields.getTextInputValue("recruitment_initial_date");
    const endDateRaw = fields.getTextInputValue("recruitment_end_date");

    if (!initialDateRaw || !endDateRaw) {
      return await interaction.editReply({ content: "Por favor, preencha todos os campos" });
    }

    if (!isValidDate(initialDateRaw) || !isValidDate(endDateRaw)) {
      return await interaction.editReply({ content: "Formato de data inválido." });
    }

    const initialDate = parseDate(initialDateRaw);
    const endDate = parseDate(endDateRaw, true);

    if (initialDate > endDate) {
      return await interaction.editReply({
        content: "A data inicial não pode ser posterior à data final.",
      });
    }

    const recruitmentList = await modelRecruitment
      .find({
        guildId: guild?.id,
        createdAt: {
          $gte: initialDate,
          $lte: endDate,
        },
      })
      .exec();

    if (!recruitmentList.length) {
      return await interaction.editReply({
        content: "Nenhum recrutador ativo encontrado nesse período.",
      });
    }

    const recruiterCounts: Record<
      string,
      { count: number; nickname: string; gameId: string | null | undefined }
    > = {};

    recruitmentList.forEach((rec) => {
      if (!recruiterCounts[rec.recruiterId]) {
        recruiterCounts[rec.recruiterId] = {
          count: 0,
          nickname: rec.recruiterNickname,
          gameId: rec.recruiterGameId,
        };
      }
      recruiterCounts[rec.recruiterId].count++;
    });

    const sortedRecruiters = Object.values(recruiterCounts).sort((a, b) => b.count - a.count);

    let description = "Lista dos 10 recrutadores mais ativos:\n";
    sortedRecruiters.slice(0, 10).forEach((recruiter, index) => {
      description += `${index + 1}. ${recruiter.nickname.split(' | ')[0]} (${recruiter.gameId}) - ${recruiter.count} recrutamento(s)\n`;
    });

    const embed = new EmbedBuilder(message?.embeds[0]?.data ?? {})
      .setDescription(description)
      .setFooter({ text: `${initialDateRaw} até ${endDateRaw}` });

    if (message?.editable) {
      await message.edit({ content: null, embeds: [embed] });
    }

    await interaction.deleteReply();
  } catch (error) {
    print.error(
      __filename,
      "Erro desconhecido durante o processamento do comando.",
      error,
      interaction.guild,
      interaction.user,
      interaction.channel
    );
  }
}

function isValidDate(dateString: string): boolean {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function parseDate(dateString: string, isEndOfDay = false): Date {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  if (isEndOfDay) {
    date.setHours(23, 59, 59, 999);
  } else {
    date.setHours(0, 0, 0, 0);
  }
  return date;
}
