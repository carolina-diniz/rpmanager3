import { action_commmand } from "../../modules/action/submit";
import { approvementSubmit } from "../../modules/approvement";
import { recruitmentSubmit } from "../../modules/recruitment";

export const submit = {
  ...approvementSubmit,
  ...recruitmentSubmit,
  action_commmand,
}