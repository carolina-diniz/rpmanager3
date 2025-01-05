import { Guild } from "discord.js";
import database from "../../../core/database/database";
import print from "../../../core/print/print";

type rolesCreatedResolvedType = {
  EntryManager: boolean;
  ApprovedMember: boolean;
};

export default async (guild: Guild): Promise<rolesCreatedResolvedType> => {
  print.init(__filename);

  const rolesCreatedResolved: rolesCreatedResolvedType = {
    EntryManager: false,
    ApprovedMember: false,
  };

  const guildDb = await database.get("guild", guild);

  guildDb?.roles.forEach((roles) => {
    if (roles.EntryManager) {
      rolesCreatedResolved.EntryManager = true;
    }
    if (roles.ApprovedMember) {
      rolesCreatedResolved.ApprovedMember = true;
    }
  });

  return rolesCreatedResolved;
};
