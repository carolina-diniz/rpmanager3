import { Guild, GuildMember } from "discord.js";
import modelGuild from "../../../core/database/models/guilds/modelGuild";
import modelRecruitment from "../../../core/database/models/recruitments/modelRecruitment";
import print from "../../../core/print/print";

export const RecruitmentService = {
  createRecruitment: async (guild: Guild, target: GuildMember, staff: GuildMember) => {
    try {
      const guildDb = await modelGuild.findOne({ id: guild.id });

      const staffGame = guildDb?.members.get(staff.id)?.gameId;

      if (!staff.nickname || !staffGame) {
        throw new Error('Nickname ou gameId do staff não encontrado')
      }

      const recruitmentDb = await modelRecruitment.create({
        id: `${Date.now()}`,
        guildId: guild.id,
        recruiterId: staff.id,
        recruiterNickname: staff.nickname,
        recruiterGameId: staffGame,
        recruitedId: target.id,
        createdAt: Date.now(),
      });

      recruitmentDb.save();

      return recruitmentDb;
    } catch (error) {
      print.error(__filename, "error creating recruitment", error, guild);
    }
  },
};
