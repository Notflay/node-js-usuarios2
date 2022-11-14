import Character from "../models/Character";
import { unlink } from "fs-extra"; // Para eliminar ficheros
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import cookieParser from "cookie-parser";

const signToken = (_id) => jwt.sign({ _id }, process.env.SECRET);

const compare = false;

export const findAndAssingUser = async (req, res, next) => {
  try {
    var token = req.cookies.jwtToken;
    if (!token) {
      res.status(401).send("Unathorized token");
    }

    var userId = jwt.verify(token, process.env.SECRET)._id;

    const user = await Character.findById(userId);
    if (!user) {
      res.status(401).send("Usuario no existe").end();
    }

    req.auth = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const isAuthenticated = express.Router().use(findAndAssingUser);

export const createCharc = async (req, res) => {
  try {
    const { body } = req;
    body.file = req.file.filename;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(body.password, salt);

    const character = Character({
      name: body.name,
      lastname: body.lastname,
      age: body.age,
      description: body.description,
      pass: hashed,
      salt,
      picture: body.file,
      rol: body.rol,
    });

    if (character) {
      const signed = signToken(character._id);
      await character.save();
      res.redirect("/");
    } else {
      console.log("No se pudo crear al usuario");
    }
  } catch (error) {
    const { body } = req;
    body.file = req.file.filename;
    unlink(path.resolve(`./src/public/images/${body.file}`));
    const message = error.message;
    console.log(message);
    res.render("error", { message });
  }
};

export const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findById(id);
    unlink(path.resolve(`./src/public/images/${character.picture}`));
    await character.remove();
    res.status(201).send("Character fue borrado exitosamente");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const charcter = await Character.findOne({ name: body.name });
    if (!charcter) {
      return res.status(401).send("Usuario y/o contraseña no existe");
    } else {
      const compare = await bcrypt.compare(body.pass, charcter.pass);
      console.log(compare);
      if (!compare) {
        return res.status(403).send("Usuario y/o contraseña no existe");
      } else {
        console.log(charcter);
        const sign = signToken(charcter._id);
        res.cookie("jwtToken", sign);
        res.cookie("compare", true);
        res.status(200).send(sign);
      }
    }
  } catch (error) {
    res.status(403).send(error.message);
  }
};

export const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const characterOrgn = await Character.findById(id);

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(body.pass, salt);

    (body.pass = hashed), salt;

    body.picture = req.file.filename;
    console.log(body.picture);
    await Character.findByIdAndUpdate(id, body);
    unlink(path.resolve(`./src/public/images/${characterOrgn.picture}`));
    res.clearCookie("compare");
    res.status(201).redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/*
export const searchCharacter = async (req, res) => {
  try {
    const { body } = req;
    body.file = req.file.filename;

    const { character } = await Character.findByIdAndUpdate(
      body.articuloId,
      body
    );
    await character.save();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
*/
