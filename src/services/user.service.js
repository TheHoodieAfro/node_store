import User from '../model/user.model.js'

class UserService {

    async getUsers() {
        try {
            const users = await User.find({})
            return users
        }catch (error) {
            throw new Error(error)
        }
    }

    async findUserById(id) {
        try {
            const user = await User.findOne({_id: id})
            return user
        }catch (error) {
            throw new Error(error)
        }
    }

    async createUser(input) {
        try {
            const user = await User.create(input)
            return user.toJSON()
        } catch (error) {
            throw new Error(error)
        }
    }
    
    async updateUser(id, input) {
        try {
            const user = await User.findOneAndUpdate({_id: id}, input, {new: true})
            return user?.toJSON()
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteUser(id) {
        try {
            const user = await User.deleteOne({_id: id})
            return user
        }catch (error) {
            throw new Error(error)
        }
    }

    async findUserByIdentification(identificationn) {
        try {
            const user = await User.findOne({identification: identificationn})
            return user
        }catch (error) {
            throw new Error(error)
        }
    }
}

export default new UserService()