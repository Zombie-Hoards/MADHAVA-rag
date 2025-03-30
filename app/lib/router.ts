import { useRouter as useNextRouter } from 'next/router';

export const routes = {
  home: '/',
  apiReference: '/api-reference',
  documentation: '/documentation',
  signin: '/auth/signin',
  signup: '/auth/signup',
  pricing: '/pricing',
  blog: '/blog',
  tutorials: '/tutorials',
  support: '/support'
};

export const useRouter = () => {
  const router = useNextRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return {
    ...router,
    navigate,
    routes
  };
}; 