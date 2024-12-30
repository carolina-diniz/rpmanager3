import guildService from "../../../core/events/services/guild.service";
import print from "../../../core/print/print";

type rolesCreatedResolvedType = {
  isApprover: boolean;
  isEntryRole: boolean;
};

export default async (guildId: string): Promise<rolesCreatedResolvedType> => {
  print.init(__filename)

  const rolesCreatedResolved: rolesCreatedResolvedType = {
    isApprover: false,
    isEntryRole: false,
  };

  const guildDb = await guildService.getAtDatabase(guildId);
  if (!guildDb) return rolesCreatedResolved;

  guildDb.roles.forEach((roles) => {
    if (roles.isApprover) {
      rolesCreatedResolved.isApprover = true;
    }
    if (roles.isApprover) {
      rolesCreatedResolved.isApprover = true;
    }
  });

  return rolesCreatedResolved;
};
