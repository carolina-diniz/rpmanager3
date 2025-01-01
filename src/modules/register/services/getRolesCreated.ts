import database from "../../../core/database/database";
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

  const guildDb = await database.get("guild", { id: guildId });

  guildDb?.roles.forEach((roles) => {
    if (roles.EntryManager) {
      rolesCreatedResolved.EntryManager = true;
    }
    if (roles.ApprovedMember) {
      rolesCreatedResolved.EntryManager = true;
    }
  });

  return rolesCreatedResolved;
};
