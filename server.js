// Get dependencies
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

//Routes
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require('./routes/user.routes');
const cargaRoutes = require("./routes/carga.academica.routes");
const horariosRoutes = require("./routes/horarios.route");
const trimestresRoutes = require("./routes/trimestre.routes");
const ofertaRoutes = require('./routes/oferta.academica.routes');
const materiasAprobadasRoutes = require('./routes/materias.aprobadas.routes');
const inscripcionesRoutes = require('./routes/inscripcion.clases.alumno.route');
const reportesRoutes = require('./routes/reportes.routes');
const diasRoutes = require('./routes/dias.routes');
const solicitudesRoutes = require('./routes/solucitud.clases.alumno.routes');
//Middlewares
const verifyAccessLevel = require("./middleware/access.level");
const verifyToken = require("./middleware/jwt.auth");

const app = express();
const authURLPrefix = "/api/v1/auth";
const usersURLPrefix = '/api/v1/users';
const cargaURLPrefix = '/api/v1/carga';
const horarioURLPrefix = '/api/v1/horarios';
const trimestreURLPrefix = '/api/v1/trimestres';
const ofertaURLPrefix = '/api/v1/oferta';
const masteriasAprobadasURLPrefix = '/api/v1/materias'; 
const incripcionesURLPrefix = '/api/v1/inscripciones';
const reportesURLPrefix = '/api/v1/reportes';
const diasURLPrefix = '/api/v1/dias';
const solicitudesURLPrefix = '/api/v1/solicitudes';

require("./config/db.config").connect();

// General
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "La API esta corriendo..." });
});

app.use(authURLPrefix, authRoutes);
app.use(usersURLPrefix, [verifyToken.verifyToken, verifyAccessLevel.isActive], usersRoutes);
app.use(cargaURLPrefix, [verifyToken.verifyToken, verifyAccessLevel.isActive], cargaRoutes);
app.use(horarioURLPrefix, [verifyToken.verifyToken, verifyAccessLevel.isActive], horariosRoutes);
app.use(trimestreURLPrefix, [verifyToken.verifyToken, verifyAccessLevel.isActive], trimestresRoutes);
app.use(ofertaURLPrefix, [verifyToken.verifyToken, verifyAccessLevel.isActive], ofertaRoutes);
app.use(masteriasAprobadasURLPrefix, [verifyToken.verifyToken, verifyAccessLevel.isActive], materiasAprobadasRoutes);
app.use(incripcionesURLPrefix, [verifyToken.verifyToken, verifyAccessLevel.isActive], inscripcionesRoutes);
app.use(reportesURLPrefix, [verifyToken.verifyToken, verifyAccessLevel.isActive], reportesRoutes);
app.use(diasURLPrefix, [verifyToken.verifyToken, verifyAccessLevel.isActive], diasRoutes);
app.use(solicitudesURLPrefix, [verifyToken.verifyToken, verifyAccessLevel.isActive], solicitudesRoutes);
// Port
const port = process.env.PORT || "3030";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
