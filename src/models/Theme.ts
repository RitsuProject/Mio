import mongoose, { Document } from "mongoose";

interface ThemeInterface extends Document {
  _id: String;
  name: String;
  songName: String;
  type: String;
  artist: String;
  year: number;
  url: String;
  mal: String;
}

const ThemeSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  songName: { type: String, required: true },
  type: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: Number, required: true },
  url: { type: String, required: true },
  mal: { type: String, required: true },
});

const Themes = mongoose.model<ThemeInterface>("Themes", ThemeSchema);
export default Themes;
