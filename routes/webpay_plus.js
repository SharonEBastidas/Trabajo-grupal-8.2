var express = require("express");
var router = express.Router();
var controller = require("../controllers/webpay_plus");
const WebpayPlus = require("transbank-sdk").WebpayPlus;

// Configuración de Webpay (producción o pruebas)
router.use(function (req, res, next) {
  if (process.env.WPP_CC && process.env.WPP_KEY) {
    WebpayPlus.configureForProduction(process.env.WPP_CC, process.env.WPP_KEY);
  } else {
    WebpayPlus.configureForTesting();
  }
  next();
});

// Rutas para crear y confirmar la transacción
router.get("/create", controller.create);
router.get("/commit", controller.commit);
router.post("/commit", controller.commit);

module.exports = router;