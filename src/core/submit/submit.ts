import { action_commmand } from "../../modules/action/submit";
import { approvementSubmit } from "../../modules/approvement";
import { modal_changelog } from "../../modules/changelog";
import { recruitmentSubmit } from "../../modules/recruitment";

export const submit = {
  ...approvementSubmit,
  ...recruitmentSubmit,
  action_commmand,
  modal_changelog,
}