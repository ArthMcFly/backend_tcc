const { object, string, mixed } = require("yup");
class Users {
	async store(req, res, next) {
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

		!req.body?.usu_nivel && (req.body = {...req.body, usu_nivel:"aluno"});
		!req.body?.usu_bio && (req.body = {...req.body, usu_bio:""});
		req.body = {
			...req.body,
			created_at: new Date(),
			updated_at: ""
		};
		try{
			await userSchema.validate(req.body);
		} 
		catch (error){
			return res.status(400).end(error.message);
		}

		next();
	}
	async update(req, res, next) {
		req.body = {
			...req.body,
			updated_at: new Date()
		};
		next();
	}
}

module.exports = new Users();
