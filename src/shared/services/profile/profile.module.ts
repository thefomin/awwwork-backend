import { Global, Module } from '@nestjs/common'
import { ProfileService } from './profile.service';


@Global()
@Module({
    providers: [ProfileService],
    exports: [ProfileService]
})
export class ProfileModule {}
