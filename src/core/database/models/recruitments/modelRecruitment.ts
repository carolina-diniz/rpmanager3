import { model, Schema } from "mongoose";

interface modelRecruitment {
  id: string;
  guildId: string;
  recruiterId: string;
  recruiterNickname: string
  recruiterGameId: string;
  recruitedId: string;
  createdAt: Date;
}

const schema: Schema<modelRecruitment> = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  recruiterId: {
    type: String,
    required: true,
  },
  recruiterNickname: {
    type: String,
    required: true,
  },
  recruiterGameId: {
    type: String,
    required: true,
  },
  recruitedId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export default model("recruitment", schema);
