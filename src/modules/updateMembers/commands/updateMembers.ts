import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { client } from "../../../connections";
import modelGuild from "../../../core/database/models/guilds/modelGuild";
import print from "../../../core/print/print";

export const data = new SlashCommandBuilder()
  .setName("update_members")
  .setDescription("Atualiza os membros do servidor.");

export async function execute(interaction: CommandInteraction) {
  try {
    const guilds = await client.guilds.fetch();

    guilds.each(async (OAuth2Guild) => {
      const guild = await client.guilds.fetch(OAuth2Guild.id);
      const guildDb = await modelGuild.findOne({ id: guild.id });
      const members = await guild?.members.fetch();

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

      const approveList = [
        "1263726693814763552",
        "1318401020036124692",
        "1278047611030605975",
        "1264276285375643669",
        "1169272011479072849",
        "1293880493020024862",
        "1286510197065646203",
        "1287310836351762467",
        "1290636386332049431",
        "1292738251257548821",
        "1293227381372227728",
        "1314086088406466581",
        "1295028409306714133",
        "1303044245136867390",
        "1303477590828515339",
        "1315162349925044225",
        "1318159411776323594",
        "1321665674694885529",
        "1321883528224440401",
        "1324869491628179456",
        "1321899613766025297",
        "1324871218184192072",
      ];

      const entryRoleList = [
        "1324961916501885048", // teste
        "1324980148172230707", // teste
        "1317625813738197072",
        "1254813815858794637",
        "1289416158973530240",
        "1275590103065952258",
        "1273225007371391000",
        "1032447210245345339",
        "1069458179685097516",
        "1290120018461458556",
        "1291225410293469274",
        "1292707523991834690",
        "1293592597083721750",
        "1295029430405562474",
        "1303038414270103578",
        "1303481317027086377",
        "1315110835701678080",
        "707758042623770640",
        "1316218576700444789",
        "1259956994526417008",
        "883099356960522281",
        "1290466591070355518",
      ];

      pedirsetList.forEach((channelId) => {
        console.log("pedirsetList ", channelId);

        if (guild.channels.cache.has(channelId)) {
          const channelDb = guildDb?.channels.get(channelId);

          if (!channelDb) return;

          channelDb.isEntryChannel = true;

          guildDb?.channels.set(channelId, channelDb);
          guildDb?.markModified("channels");
        }
      });

      approveList.forEach((channelId) => {
        console.log("approveList ", channelId);

        if (guild.channels.cache.has(channelId)) {
          const channelDb = guildDb?.channels.get(channelId);

          if (!channelDb) return;

          channelDb.isApprovalChannel = true;

          guildDb?.channels.set(channelId, channelDb);
          guildDb?.markModified("channels");
        }
      });

      entryRoleList.forEach((roleId) => {
        console.log("entryRoleList ", roleId);

        if (guild.roles.cache.has(roleId)) {
          const rolesDb = guildDb?.roles.get(roleId);

          if (!rolesDb) return;

          rolesDb.ApprovedMember = true;

          guildDb?.roles.set(roleId, rolesDb);
          guildDb?.markModified("roles");
        }
      });

      members.each(async (member) => {
        console.log("member ", member.id);

        const hasEntryRole = member.roles.cache.hasAny(
          "1324961916501885048", // teste
          "1324980148172230707", // teste
          "1317625813738197072",
          "1254813815858794637",
          "1289416158973530240",
          "1275590103065952258",
          "1273225007371391000",
          "1032447210245345339",
          "1069458179685097516",
          "1290120018461458556",
          "1291225410293469274",
          "1292707523991834690",
          "1293592597083721750",
          "1295029430405562474",
          "1303038414270103578",
          "1303481317027086377",
          "1315110835701678080",
          "707758042623770640",
          "1316218576700444789",
          "1259956994526417008",
          "883099356960522281",
          "1290466591070355518"
        );

        if (hasEntryRole) {
          const memberDb = guildDb?.members.get(member.id);

          if (memberDb) {
            if (member.nickname) {
              const gameId = member.nickname.split(" | ")[1];
              const regex = /^[0-9]+$/;

              if (regex.test(gameId)) {
                memberDb.gameId = gameId;
              }
            }

            memberDb.approvedMember = true;

            guildDb?.members.set(member.id, memberDb);
            guildDb?.markModified("members");
          }
        }
      });

      await guildDb?.save();
    });

    console.log("Membros atualizados com sucesso!");
  } catch (error) {
    print.error(__filename, error);
  }
}
