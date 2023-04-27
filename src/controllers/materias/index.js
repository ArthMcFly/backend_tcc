const { object, string, mixed } = require("yup");
class Subjects {
	async store(req, res, next) {
		let subjectSchema = object({
			mat_nome: 
				string()
				.required("Materia não inserida"),
			mat_cor:
				string()
				.required("Cor não inserida"),
		});
		req.body = {
			...req.body,
			created_at: new Date(),
			updated_at: ""
		};
		try{
			await subjectSchema.validate(req.body);
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

module.exports = new Subjects();
