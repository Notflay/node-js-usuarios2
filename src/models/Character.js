import { Schema, model } from "mongoose";

const characSchema = new Schema({
  name: {
    type: String,
    required: [true, "You did not fill the name"],
    trim: true,
    unique: true,
    minlegnth: [3, "The name must have more than 3 digits, got {VALUE}."],
    maxlegnth: [15, "The name must be less than 15 digits, got {VALUE}."],
  },
  lastname: {
    type: String,
    required: [true, "You did not fill the lastname"],
    trim: true,
    minlegnth: [3, "The lastname must have more than 3 digits, got {VALUE}."],
    maxlegnth: [15, "The lastname must be less than 15 digits, got {VALUE}."],
  },
  age: {
    type: Number,
    required: [true, "The age is required"],
    trim: true,
    min: [16, "You have to be at least 16 years old to battle, got {VALUE}."],
    max: [60, "You have to be less 60 years old to battle, got {VALUE}."],
  },
  description: {
    type: String,
    required: [true, "You did not fill the description."],
  },
  pass: {
    type: String,
    required: [true, "You did not fill in the password."],
    minLength: [3, "The password must have more than 3 digits, got {VALUE}."],
  },
  picture: {
    type: String,
    required: [true, "You did not enter an image."],
  },
  rol: {
    type: String,
    required: [true, "you did not select a role."],
  },
});

export default model("Character", characSchema);

/*
  const charac = new character({
    name: "Jon",
    lastname: "Snow",
    age: 21,
    description: "fsffs",
    rol: "Warrior",
    pass: "123",
    picture: "319089af-eac9-4896-8534-303bfce7076a.png",
  });

  charac.save();
} catch (error) {
  console.log(error);
}*/
