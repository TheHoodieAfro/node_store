const validate = (Schema) => {
    return (req, res, next) => {
        try {
            Schema.parse(req.body)
            next();
        }catch(e) {
            return res.status(400).send(e.errors)
        }
    }
}

export default validate;