import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

export class UserRepository {
    private static userRepository = AppDataSource.getRepository(User)

    static async create(userData: User): Promise<User> {
        return await this.userRepository.save(userData)
    }

    static async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }

    static async findOne(id?: string, email?: string): Promise<User> {
        return !!id
            ? this.userRepository.findOne({ where: { id: id } })
            : !!email
                ? this.userRepository.findOne({ where: { email: email } })
                : null
    }

    static async saveOne(userData: User): Promise<User> {
        return await this.userRepository.save(userData)
    }

    static async exists(id?: string, email?: string): Promise<boolean> {
        return await this.userRepository.existsBy([
            { id: id },
            { email: email },
        ])
    }
}