import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
  id: {
    type: "Number",
  },
  time: {
    type: "Date",
  },
  completed: {
    type: "Boolean",
  },
  fromFloor: {
    type: "Number",
  },
  toFloor: {
    type: "Number",
  },
  active: {
    type: "Boolean",
  },
  direction: {
    type: "String",
  },
});

const Position = mongoose.model("Position", positionSchema);
export { Position };
