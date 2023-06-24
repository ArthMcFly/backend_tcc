//Declaração de variáveis
const { object, string, mixed } = require("yup");
const { apiEndpoints } = require("../../api/index");
const { reset } = require("nodemon");

class Users {
	async store(req, res, next) {
		//Schema de validação da entidade
		let userSchema = object({
			usu_nome: 
			string()
			.required("Nome não inserido"),
			usu_email: 
			string()
			.email("Digite o seu email")
			.required("Email não inserido"),
			usu_senha: 
			string()
			.required("Senha não inserida")
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,"Sua senha deve conter 8 caracteres, 1 maiúsculo, 1 minísculo, 1 númerp e um caractere especial"),
			usu_nivel:
			mixed()
			.oneOf(["admin", "professor", "aluno"], "Nível do usuário inválido"),
			usu_corperfil:
			string()
			.required("Cor de perfil não inserida"),
			usu_fotoperfil:
			string()
			.required("Foto de perfil não inserida"),
			usu_arroba:
			string()
			.required("Arroba não inserido"),
		});

		//Preenchimento automático de atributos vazios
		!req.body?.usu_nivel && (req.body = {...req.body, usu_nivel:"aluno"});
		!req.body?.usu_bio && (req.body = {...req.body, usu_bio:""});
		req.body = {
			//Preenchimento do atributo de criação
			...req.body,
			created_at: new Date(),
			updated_at: ""
		};
		//Validação da entidade
		try{
			await userSchema.validate(req.body);
		} 
		catch (error){
			return res.status(400).json({ error: error.message });
		}

		let userFinded = apiEndpoints.db
			.get("usuarios")
			.find({ usu_arroba: req.body.usu_arroba })
			.value();
		if (userFinded) {
			return res.status(400).json({ error: "Usuário já cadastrado" });
		}
		next();
	}
	async update(req, res, next) {
		req.body = {
			//Preenchimento do atributo de atualização
			...req.body,
			updated_at: new Date()
		};
		next();
	}
	async auth(req, res, next) {
		const { usu_email, usu_senha } = req.body;

		let user = await apiEndpoints.db
			.get("usuarios")
			.find({ usu_email })
			.cloneDeep()
			.value();

		if (!user)
			return res 
				.status(400)
				.json({ error: "Incorrect email/password combination" });
		if (usu_senha !== user.usu_senha)
			return res 
				.status(400)	
				.json({ error: "Incorrect email/password combination" });
		delete user.usu_senha;

		return res.status(200).json({ user });


	}
}

//Exportação de módulos
module.exports = new Users();
