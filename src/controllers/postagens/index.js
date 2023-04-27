const { object, string, mixed } = require("yup");
class Posts { 
	async store(req, res, next) {
		let postSchema = object({
			pos_texto:
				string()
				.required("Texto não inserido"),
		});
		!req.body?.pos_curtidas && (req.body = {...req.body, pos_curtidas:"0"});
		req.body = {
			...req.body,
			created_at: new Date(),
			updated_at: ""
		};
		try{
			await postSchema.validate(req.body);
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

module.exports = new Posts();
