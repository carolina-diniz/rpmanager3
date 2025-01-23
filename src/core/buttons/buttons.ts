import { actionButtons } from "../../modules/action/buttons";
import { approvementButtons } from "../../modules/approvement/buttons";
import { recruitmentButtons } from "../../modules/recruitment/buttons";
import { registerButtons } from "../../modules/register";
import { generalButtons } from "./general";

export const buttons = {
  ...generalButtons,
  ...registerButtons,
  ...approvementButtons,
  ...actionButtons,
  ...recruitmentButtons,
}