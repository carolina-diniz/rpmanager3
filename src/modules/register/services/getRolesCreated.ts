import modelGuild from "../../../core/database/models/guilds/modelGuild";
import print from "../../../core/print/print";

type rolesCreatedResolvedType = {
  EntryManager: boolean;
  ApprovedMember: boolean;
};

export default async (guildId: string): Promise<rolesCreatedResolvedType> => {
  print.init(__filename);

  const rolesCreatedResolved: rolesCreatedResolvedType = {
    EntryManager: false,
    ApprovedMember: false,
  };

  const guildDb = await modelGuild.findOne({ id: guildId });

  if (!guildDb) {
    print.log(__filename, "Guild not found");
    return rolesCreatedResolved;
  }

  guildDb.roles.forEach((roles) => {
    if (roles.EntryManager) {
      rolesCreatedResolved.EntryManager = true;
    }
    if (roles.ApprovedMember) {
      rolesCreatedResolved.EntryManager = true;
    }
  });

  return rolesCreatedResolved;
};
