import Themes from "../models/Theme";

// https://github.com/beescuit/BeeShort-JS/blob/144ad0629e1e627ba634dd65c7280492013f21f4/index.js#L43
export default function generateId() {
  return new Promise(async (resolve) => {
    let id = Math.random().toString(36).substring(7);
    let existing = await Themes.findById(id);
    resolve(existing ? await generateId() : id);
  });
}
