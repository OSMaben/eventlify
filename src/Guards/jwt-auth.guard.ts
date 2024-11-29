import {Injectable, CanActivate, ExecutionContext, ForbiddenException, HttpException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    CanActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if(!user)
            throw  new HttpException('User Nott Found ', 400);
        if(user.role != 'admin')
            throw new HttpException('This operation is allow only for admins ', 403);

        return true;
    }

}
