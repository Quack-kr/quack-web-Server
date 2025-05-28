// src/types/express.d.ts
import 'express';

declare module 'express' {
  interface Request {
    user: {
      email?: string;
      provider_id?: string;
      provider_name?: string;
    };
  }
}

// declare global {
//   namespace Express {
//     interface Request {
//       user: {
//         email?: string;
//         provider_id?: string;
//         provider_name?: string;
//       };
//     }
//   }
// }
