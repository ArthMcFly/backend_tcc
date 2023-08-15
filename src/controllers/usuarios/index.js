const { object, string, mixed } = require("yup");
const { apiEndpoints } = require("../../api/index");
const MailService = require("../../services/mail");
const fs = require("fs");
const { uploadFolder } = require("../../config/upload");
const { sign, verify } = require("jsonwebtoken");
const authConfig = require("../../config/auth");

const criarChave = (n, r = "") => {
  while (n--) {
    r += String.fromCharCode(
      ((r = (Math.random() * 62) | 0), (r += r > 9 ? (r < 36 ? 55 : 61) : 48))
    );
  }
  return r;
};

class Usuarios {
  async signup(req, res, next) {
    console.log(`   ${Date.now()}`);
    next();
  }

  async store(req, res, next) {
    let usuarioSchema = object({
      usu_nome: string().required("Entre com o nome do usuário"),
      usu_email: string()
        .email("Entre com um e-mail válido")
        .required("Entre com o e-mail"),
      usu_senha: string()
        .required("Entre com a senha")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
          "A senha precisa ter no mínimo 6 caracteres, sendo: uma maiúscula, uma minúscula, um número e um caracter especial"
        ),
      usu_nivel: mixed(["admin", "professor", "aluno"], "Tipo de usuário iválido")
    });

    !req.body?.usu_nivel && (req.body = { ...req.body, usu_nivel: "aluno" });
    !req.body?.usu_celular && (req.body = { ...req.body, usu_celular: "" });

    const usu_chave = criarChave(10);
    const { usu_nome, usu_email } = req.body;
    await MailService.sendActivation({
      usu_nome,
      usu_email,
      usu_chave
    });

    req.body = {
      ...req.body,
      usu_foto: "",
      usu_chave: usu_chave,
      usu_emailconfirmado: false,
      usu_cadastroativo: false,
      created_at: new Date(),
      updated_at: ""
    };

    try {
      await usuarioSchema.validate(req.body);
    } catch (error) {
      //return res.status(400).json({ error: error.message });
      return res.status(400).send({error: error.message}).end();
      //return res.status(400).end({ error: error.message });
    }

    const usuario = apiEndpoints.db
      .get("usuarios")
      .find({ usu_email: req.body.usu_email })
      .cloneDeep()
      .value();

    if (usuario) {
      return res.status(400).send({ error: "usuário já cadastrado " }).end();
    }
    next();
  }

  async update(req, res, next) {
    let usuarioSchema = object({
      usu_email: string()
        .email("Entre com um e-mail válido"),
      usu_senha: string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
          "A senha precisa ter no mínimo 6 caracteres, sendo: uma maiúscula, uma minúscula, um número e um caracter especial"
        ),
    });
        try {
          await usuarioSchema.validate(req.body);
        } catch (error) {
          //return res.status(400).json({ error: error.message });
          return res.status(400).send({error: error.message}).end();
          //return res.status(400).end({ error: error.message });
        }
    next();
      }

  async activate(req, res, next) {
    const { chave } = req.params;

    let usuario = apiEndpoints.db
      .get("usuarios")
      .find({ usu_chave: chave })
      .value();

    if (!usuario) {
      return res.status(400).send({ error: "key not finded" }).end();
    }

    usuario.usu_chave = "";
    usuario.usu_cadastroativo = true;
    usuario.usu_emailconfirmado = true;
    apiEndpoints.db.write();

    return res.status(200).send({ response: "User activated" }).end();
  }

  async uploadPhoto(req, res, next) {
    const { id } = req.params;
    const avatar = req.file;

    let usuario = await apiEndpoints.db
      .get("usuarios")
      .find({ id: parseInt(id, 10) })
      .value();

    if (!usuario) return res.st(400).send({ error: "id not found" }).end();

    if (usuario.usu_foto !== "") {
      try {
        fs.unlinkSync(`${uploadFolder}/${usuario.usu_foto}`);
      } catch (error) {
        console.log(
          `Erro ao excluir o arquivo ${uploadFolder}/${usuario.usu_foto}`
        );
      }
    }

    usuario.usu_foto = avatar.filename;
    usuario.usu_updated_at = new Date();
    apiEndpoints.db.write();

    let output = Object.assign({}, usuario);
    delete output.usu_senha;

    return res
      .status(200)
      .send({ ...output })
      .end();
  }

  async auth(req, res, next) {
    const { usu_email, usu_senha } = req.body;

    // console.log(req.body);
    let usuario = apiEndpoints.db
      .get("usuarios")
      .find({ usu_email })
      .cloneDeep()
      .value();

    if (!usuario)
      return res
        .status(400)
        .json({ error: "Incorrect user/password combination" });

    if (usuario.usu_senha !== usu_senha)
      return res
        .status(400)
        .json({ error: "Incorrect user/password combination" });

    delete usuario.usu_senha;

    const token = sign({}, authConfig.jwt.secret, {
      subject: usuario.id.toString(),
      expiresIn: authConfig.jwt.expiresIn
    });

    return res.status(200).send({ usuario, token }).end();
  }

  async ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(400).json({ error: "JWT token is missing" });

    const [, token] = authHeader.split(" ");
    console.log("Token Ensure: " + token);
    try {
      console.log("token : " + token);
      const decoded = await verify(token, authConfig.jwt.secret);
      const { sub } = decoded;
      req.user = { id: sub };
      next();
    } catch (error) {
      return res
        .status(400)
        .json({ error: "jwt malformed or invalid signature" });
    }
  }
}

module.exports = new Usuarios();
