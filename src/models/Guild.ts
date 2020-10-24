import mongoose, { Document } from "mongoose";

interface GuildInterface extends Document {
  _id: String;
  name: String;
  prefix: String;
  rolling: Boolean;
  currentChannel: String;
  premium: Boolean;
  provider: String;
}

const GuildSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  prefix: { type: String, required: false, default: process.env.BOT_PREFIX },
  rolling: { type: Boolean, required: false, default: false },
  currentChannel: { type: String, required: false, default: null },
  premium: { type: Boolean, required: true },
  provider: { type: String, required: false, default: "animethemes" },
});

const Guilds = mongoose.model<GuildInterface>("Guilds", GuildSchema);
export default Guilds;
