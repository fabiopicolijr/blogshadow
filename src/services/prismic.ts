// import Prismic from '@prismicio/client';
// import { DefaultClient } from '@prismicio/client/types/client';

// export function getPrismicClient(req?: unknown): DefaultClient {
//   const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT, {
//     req,
//   });

//   return prismic;
// }

import * as Prismic from '@prismicio/client';

const endpoint = Prismic.getEndpoint(process.env.PRISMIC_API_ENDPOINT);

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.createClient(endpoint);

  return prismic;
}
