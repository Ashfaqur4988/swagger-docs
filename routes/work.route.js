import express from "express";
import Work from "../models/work.model.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Work:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the work
 *         title:
 *           type: string
 *           description: Title of the work
 *         description:
 *           type: string
 *           description: Description of the work
 *       example:
 *         id: 17657sdjhsdau677FR
 *         title: Work 1
 *         description: Work Description
 */

/**
 * @swagger
 * tags:
 *   name: Works
 *   description: The works managing API
 */

/**
 * @swagger
 * /api/works:
 *   get:
 *     summary: Get all works
 *     tags: [Works]
 *     description: Get all works
 *     responses:
 *       200:
 *         description: The list of the works
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Work'
 */

router.get("/works", async (req, res) => {
  const works = await Work.find({});
  res.status(200).json(works);
});

/**
 * @swagger
 * /api/works/{id}:
 *   get:
 *     summary: Get the work by id
 *     tags: [Works]
 *     description: Get the work by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The work id
 *     responses:
 *       200:
 *         description: The work description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Work'
 *       404:
 *          description: The work was not found
 */

router.get("/works/:id", async (req, res) => {
  const work = await Work.findById(req.params.id);
  res.status(200).json(work);
});

/**
 * @swagger
 * /api/works:
 *   post:
 *     summary: Create a new work
 *     tags: [Works]
 *     description: Create a new work
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Work'
 *     responses:
 *       200:
 *         description: The work was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Work'
 *       500:
 *          description: Some server error
 */

router.post("/works", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newWork = new Work({
      title,
      description,
    });

    await newWork.save();
    res.status(200).json({ message: "new work created", newWork });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "unable to create new work" });
  }
});

/**
 * @swagger
 * /api/works/{id}:
 *   delete:
 *     summary: Remove the work by id
 *     tags: [Works]
 *     description: Remove the work by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The work id
 *     responses:
 *       200:
 *         description: the work id is deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Work'
 *       404:
 *          description: the work was not found
 *       500:
 *          description: Some server error
 */

router.delete("/works/:id", async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) {
      res.status(404).json({ message: "work not found" });
    }
    await Work.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "work deleted", work });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "unable to delete work" });
  }
});

/**
 * @swagger
 * /api/works/{id}:
 *   put:
 *     summary: update the work by id
 *     tags: [Works]
 *     description: update the work by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The work id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Work'
 *     responses:
 *       200:
 *         description: The work was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Work'
 *       404:
 *          description: The work was not found
 *       500:
 *          description: Some server error
 */

router.put("/works/:id", async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ message: "no book found" });
    }
    const { title, description } = req.body;
    const updateWork = await Work.findByIdAndUpdate(req.params.id, {
      title,
      description,
    });

    await updateWork.save();
    res.status(200).json(updateWork);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "unable to update work" });
  }
});

export default router;
