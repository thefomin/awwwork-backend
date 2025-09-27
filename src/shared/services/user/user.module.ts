import { Global, Module } from '@nestjs/common'
import { UserService } from './user.services';


@Global()
@Module({
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
