const express = require('express');
const router = new express.Router();

const converter = require("../service/converter");

//http://localhost:3000/rgbToHex?red=90&green=05
router.get("/rgbToHex", (req, res) => {
	const red   = parseInt(req.query.red, 10);
	const green = parseInt(req.query.green, 10);
	const blue  = parseInt(req.query.blue, 10);
	const hex = converter.rgbToHex(red, green, blue);
	res.send(hex);
  });
  
router.get("/hexToRgb", (req, res) => {
	const hex = req.query.hex;
	const rgb = converter.hexToRgb(hex);
	res.send(JSON.stringify(rgb));
  });

module.exports = router;