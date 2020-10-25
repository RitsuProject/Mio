import mongoose, { Document } from "mongoose";

interface ServersInterface extends Document {
  _id: String;
  animethemes: String;
  openingsmoe: String;
}

const ServersSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  animethemes: { type: String, required: false, default: "online" },
  openingsmoe: { type: String, required: false, default: "online" },
});

const Servers = mongoose.model<ServersInterface>("Servers", ServersSchema);
export default Servers;
