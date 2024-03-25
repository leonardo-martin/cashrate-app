import { Request, Response, NextFunction, response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `\n Request --> ${new Date()} \n Method: ${req.method} \n URL: ${req.hostname + req.originalUrl} \n Client IP: ${req.ip} \n`,
    `--------------------------------------------------------------------------------`,
  );

  res.on('finish', () => {
    console.error(
      `${res.statusCode >= 400 ? 'Error occurred:' : 'Success:'} \n Status ${res.statusCode}`,
    );
    console.error(` Message: ${res.statusMessage}`);
  });
  next();
}
