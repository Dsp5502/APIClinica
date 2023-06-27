import { NextFunction, Request, Response } from 'express';

import { JwtPayload } from 'jsonwebtoken';

interface RequestExtended extends Request {
  user?: string | JwtPayload;
}
const checkPermissions = (requiredRoles: string[]) => {
  return (req: RequestExtended, res: Response, next: NextFunction) => {
    const userRoles: string[] = [(req.user as JwtPayload)?.role];

    const hasPermission =
      userRoles?.includes('ADMIN_ROLE') ||
      userRoles?.some((role: string) => requiredRoles.includes(role));

    if (hasPermission) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: 'You do not have permission to access this route' });
    }
  };
};

export { checkPermissions };
