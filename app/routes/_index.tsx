import { json, type MetaFunction } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import sortBy from 'sort-by';
import { Icon } from '~/components/Icon/Icon';
import { GamerRecord, getGamer, getGamers } from '~/data';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export async function loader() {
  let gamers = (await getGamers()).slice(0, 5);
  gamers = gamers.sort(sortBy('-points'));

  const currentUser = await getGamer('christopher-chedeau');

  return json({ gamers, currentUser });
}

export default function Index() {
  const { gamers, currentUser } = useLoaderData<typeof loader>();
  console.log('gamers', gamers);

  const isCurrentGamer = (gamer: GamerRecord) => gamer.username === currentUser?.username;

  return (
    <main className="sm:hidden h-full w-full">
      <div className="fixed w-full h-full overflow-hidden">
        <img className="object-none h-full" src="assets/images/bg-pattern.svg" alt="bg-pattern" />
      </div>

      <div className="px-6 pt-6 w-full relative flex flex-col">
        <button
          className="rounded-full w-10 h-10 bg-[#02A8F0] flex items-center 
            justify-center self-end shrink-0 sticky top-0 shadow-[inset_0_-4px_4px_0_#00000040]"
          onClick={() => console.log('I am here')}
        >
          <Icon id="icon-close" className="!w-6 h-6" />
        </button>

        <div className="place-content-center mt-5 space-y-4">
          <button
            className="rounded-full w-full bg-gradient-to-b from-[#01AAF2] to-[#005D9C] uppercase text-white 
            pt-4 pb-3 inline-flex items-center justify-center font-bold tracking-wide text-lg drop-shadow-[0px_-1px_0px_#64FFE3]"
            onClick={() => console.log('I am here')}
          >
            See Global leaderboard
          </button>

          <div
            className="bg-gradient-to-b from-[#01AAF2] to-[#005D9C] w-full rounded-[32px] 
              p-4 drop-shadow-[0px_4px_#64FFE3]"
          >
            <div className="bg-[#70D1FF] h-full rounded-[24px] p-4 shadow-[inset_0_4px_3px_0_rgba(0,0,0,0.13)]">
              <div
                className="text-[#008CC9] text-sm font-bold uppercase tracking-wide flex flex-row 
                space-x-4 w-full justify-around mb-1"
              >
                <h3>#</h3>
                <h3>Tag</h3>
                <h3>Points</h3>
              </div>

              <ul className="place-items-center space-y-3">
                {gamers.map((gamer, index) => (
                  <li
                    className={`${isCurrentGamer(gamer) ? 'bg-[#F0E602]' : 'bg-[#02A8F0]'} rounded-2xl 
                    overflow-hidden shadow-[inset_0_-2px_5px_0_#00000040]`}
                    key={gamer.id}
                  >
                    <NavLink
                      className="flex flex-row justify-between items-center p-3 space-x-3"
                      to={`buy-coins/${gamer.username}`}
                    >
                      <div
                        className={`${isCurrentGamer(gamer) ? 'bg-[#FFF85F]' : 'bg-white'} w-[50px] h-[50px] rounded-lg 
                        flex justify-center items-start shrink-0 shadow-[inset_0_4px_3px_0_rgba(0,0,0,0.13)]`}
                      >
                        <img
                          className={`w-10 h-10 ${index !== 0 && !isCurrentGamer(gamer) ? 'grayscale' : ''}`}
                          src={
                            index < 3
                              ? `./assets/icons/icon_medal_${index + 1}.svg`
                              : './assets/icons/icon_medal.svg'
                          }
                          alt="game medal"
                        />
                      </div>

                      <div className="flex flex-row flex-1 justify-between items-center space-x-2">
                        <div className="inline-flex space-x-[6px] items-center flex-1">
                          <span className="bg-[#1B6C9833] rounded-full w-6 h-6 shrink-0">
                            <img
                              src={gamer.avatar}
                              alt="gamer avatar"
                              className="rounded-full object-cover"
                            />
                          </span>
                          <p
                            className={`${isCurrentGamer(gamer) ? 'text-black' : 'text-white'} uppercase 
                            font-bold tracking-wide text-sm overflow-hidden text-ellipsis mt-[4px]`}
                          >
                            {isCurrentGamer(gamer) ? 'You' : gamer.username}
                          </p>
                        </div>
                        <div className="inline-flex items-center w-fit">
                          <img
                            className="w-5 h-5 -mr-2 z-10"
                            src="./assets/icons/icon_point_coin.svg"
                            alt="point coin"
                          />
                          <span
                            className={`${isCurrentGamer(gamer) ? 'bg-[#BCB403]' : 'bg-[#0099DB]'} inline-flex rounded-full h-[19px] w-[76px] items-center 
                            justify-center font-bold tracking-wide text-sm pt-[6px] pb-1 text-white`}
                          >
                            {gamer.points || 0}
                          </span>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full flex flex-row">
        <img
          src="/assets/images/image_dinotip1.svg"
          className="w-[200px] h-[200px]"
          alt="dinotip hint"
        />
        <div
          className="absolute -top-[40%] left-[40%] uppercase bg-[url('/assets/images/image_tooltip_bubble.svg')] 
            bg-contain bg-no-repeat w-[230px] h-[230px]"
        >
          <div className="absolute w-[150px] left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2">
            <h3 className="font-bold text-[#115377] tracking-wide">Quick tip</h3>
            <p className="font-bold text-sm text-[#5A8DA9] leading-[18px] tracking-wide">
              play the game with more friends to get more points, chief. You are slacking.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
