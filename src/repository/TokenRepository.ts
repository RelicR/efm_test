import { AppDataSource } from "../data-source"
import { Token } from "../entity/Token"
import { IToken } from "../model/Token"

export class TokenRepository {
    private static tokenRepository = AppDataSource.getRepository(Token)

    static async update(tokenData: IToken): Promise<Token> {
        const token = Object.assign(new Token(), tokenData)
        console.log(token)
        return await this.tokenRepository.save(token)
    }

    static async findOne(userId: string): Promise<Token> {
        return await this.tokenRepository.findOne({ where: { user_id: userId } })
    }

    static async saveOne(tokenData: Token): Promise<Token> {
        return await this.tokenRepository.save(tokenData)
    }
}