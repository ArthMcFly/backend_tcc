//Declaração de variáveis
const { object, string, mixed } = require("yup");

class Subjects {
	async store(req, res, next) {
		//Schema de validação da entidade 
		let subjectSchema = object({
			mat_nome: 
				string()
				.required("Materia não inserida"),
			mat_cor:
				string()
				.required("Cor não inserida"),
		});
		//Preenchimento automático do atributo de criação 
		req.body = {
			...req.body,
			created_at: new Date(),
			updated_at: ""
		};
		//Validação da entidade 
		try{
			await subjectSchema.validate(req.body);
		} 
		catch (error){
			return res.status(400).end(error.message);
		}
		next();
	}
		//Preenchimento automático do atributo de criação
		async update(req, res, next) {
		req.body = {
			...req.body,
			updated_at: new Date()
		};
		next();
	}
}
//Exportação de módulos
module.exports = new Subjects();
