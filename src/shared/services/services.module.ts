import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { ProfileModule } from './profile/profile.module';


@Module({
    imports: [UserModule, SessionModule, ProfileModule],
    providers: []
})
export class ServicesModule {}
