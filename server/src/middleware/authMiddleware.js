import jwt from 'jsonwebtoken'
export const authMid = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1]
        const decryptedToken = jwt.verify(token, process.env.jwt_secret)
        req.body.userID = decryptedToken.userID
        next()

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}