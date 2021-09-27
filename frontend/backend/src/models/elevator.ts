import mongoose from "mongoose";

const elevatorSchema = new mongoose.Schema({
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

const Elevator = mongoose.model("Elevator", elevatorSchema);
export { Elevator };
