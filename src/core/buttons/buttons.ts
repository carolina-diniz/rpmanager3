import { approvementButtons } from "../../modules/approvement/buttons";
import { registerButtons } from "../../modules/register/buttons";
import { generalButtons } from "./general";

export const buttons = {
  ...generalButtons,
  ...registerButtons,
  ...approvementButtons,
}