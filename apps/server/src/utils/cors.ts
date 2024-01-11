const whitelist = ['http://localhost:3000'];

export function corsOrigin(
  origin: string,
  callback: (err: Error, origin?: boolean) => void,
) {
  if (!origin || whitelist.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
}
