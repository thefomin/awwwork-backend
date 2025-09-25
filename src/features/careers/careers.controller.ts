import { Controller } from '@nestjs/common'

import { CareersService } from './careers.service'

@Controller('careers')
export class CareersController {
	public constructor(private readonly careersService: CareersService) {}
}
