class Subjects {
	async store(req, res, next) {
		req.body = {
			...req.body,
			mat_materia: "";
			mat_cor: ""; 
			created_at: new Date(),
			updated_at: ""
		};
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
