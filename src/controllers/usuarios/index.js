class Users {
	async store(req, res, next) {
		!req.body?.usu_nivel && (req.body = {...req.body, usu_nivel:"aluno"});
		!req.body?.usu_bio && (req.body = {...req.body, usu_bio:""});
		req.body = {
			...req.body,
			usu_fotoperfil: "",
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

module.exports = new Users();
