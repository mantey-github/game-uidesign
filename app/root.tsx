import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
} from '@remix-run/react';
import styles from './tailwind.css';

export const links: LinksFunction = () => [
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Grandstander:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=PT+Sans:wght@400;700&display=swap',
  },
  {
    rel: 'preload',
    href: '/assets/icons/sprite.svg',
    as: 'image/svg+xml',
  },

  {
    rel: 'prefetch',
    href: '/assets/icons/icon_coin_cactus.svg',
    as: 'image/svg+xml',
  },
  {
    rel: 'prefetch',
    href: '/assets/icons/icon_coin_car.svg',
    as: 'image/svg+xml',
  },
  {
    rel: 'prefetch',
    href: '/assets/icons/icon_coin_diamond.svg',
    as: 'image/svg+xml',
  },
  {
    rel: 'prefetch',
    href: '/assets/icons/icon_coin_dice.svg',
    as: 'image/svg+xml',
  },
  {
    rel: 'prefetch',
    href: '/assets/icons/icon_coin_power.svg',
    as: 'image/svg+xml',
  },
  {
    rel: 'prefetch',
    href: '/assets/icons/icon_coin_switch.svg',
    as: 'image/svg+xml',
  },
  {
    rel: 'prefetch',
    href: '/assets/icons/icon_coin_trophy.svg',
    as: 'image/svg+xml',
  },

  { rel: 'stylesheet', href: styles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export async function loader({ request }: LoaderFunctionArgs) {
  const PUBLIC_URL = new URL(request.url);

  return json({
    ENV: {
      PUBLIC_URL: PUBLIC_URL,
    },
  });
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div
          className="hidden sm:block flex-col w-full h-full text-3xl font-bold bg-black text-white 
          leading-[1.9] text-center relative"
        >
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%]">
            Kindly check on your mobile device, or right-click and select{' '}
            <span className="inline-flex bg-white text-black px-4 rounded-md">{`'Inspect'`}</span>{' '}
            from the dropdown menu to view the app.
          </h1>
        </div>
        <Outlet />
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
