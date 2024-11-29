import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class IsAdminGuard implements CanActivate {


    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new ForbiddenException('User not authenticated');
        }

        if (user.role !== 'admin') {
            throw new ForbiddenException('You do not have admin privileges');
        }

        return true;
    }
}
