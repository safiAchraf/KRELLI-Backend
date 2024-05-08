export default function verifyRoles(...roles) {
	return (req, res, next) => {
		userRoles = req.user.role;
        if (roles.includes(userRoles)) {
            return next();
        }
        return res.sendStatus(403);
	};
}