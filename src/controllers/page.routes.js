import Character from "../models/Character";
import login from "../controllers/model.routes";

export const renderpage = async (req, res) => {
  try {
    const character = await Character.find().lean();
    res.render("index", { character: character });
  } catch (error) {
    console.log(error.message);
  }
};

export const renderabout = (req, res) => {
  res.render("about");
};

export const renderedit = async (req, res) => {
  const { id } = req.params;
  const character = await Character.findById(id).lean();

  res.render("edit", { character });
};

export const renderlogin = async (req, res) => {
  const { id } = req.params;
  const character = await Character.findById(id).lean();
  const compare = req.cookies.compare;
  res.render("login", { compare: compare, character: character });
};

export const renderdelete = async (req, res) => {
  const { id } = req.params;
  const character = await Character.findById(id).lean();

  res.render("delete", { character });
};
