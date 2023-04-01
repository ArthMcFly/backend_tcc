class Posts {
	async store(req, res, next) {
		!req.body?.pos_curtidas && (req.body = {...req.body, pos_curtidas:"0"});
		req.body = {
			...req.body,
			pos_texto: "",
			pos_imagem: "",
			pos_curtidas: "",
			pos_respostas: "",
			pos_textoresposta: "",
			pos_curtidasrespotas: "",
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

module.exports = new Posts();
