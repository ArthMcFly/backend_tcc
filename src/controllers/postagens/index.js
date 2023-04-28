//Validação de variáveis
const { object, string, mixed } = require("yup");
class Posts { 
	async store(req, res, next) {
		//Schema de validação da entidade
		let postSchema = object({
			pos_texto:
				string()
				.required("Texto não inserido"),
		});
		//Preenchimento de atributos vazios
		!req.body?.pos_curtidas && (req.body = {...req.body, pos_curtidas:"0"});
		//Preenchimento do atributo de criação
		req.body = {
			...req.body,
			created_at: new Date(),
			updated_at: ""
		};
		//Validação da entidade
		try{
			await postSchema.validate(req.body);
		} 
		catch (error){
			return res.status(400).end(error.message);
		}
		next();
	}
	async update(req, res, next) {
		//Preenchimento do atributo de atualização
		req.body = {
			...req.body,
			updated_at: new Date()
		};
		next();
	}
}

module.exports = new Posts();
