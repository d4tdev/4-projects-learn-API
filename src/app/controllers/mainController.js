import mainService from '../../services/mainService';

class MainController {
	login = async (req, res, next) => {
		try {
			const response = await mainService.login(req.body);
			return res.status(200).json(response);
		} catch (e) {
			// console.log(e);
			next(e);
		}
	};

	dashboard = async (req, res) => {
		const response = mainService.dashboard(req.user);
		return res.status(200).json(response);
	};
}

export default new MainController();
