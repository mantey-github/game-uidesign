import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import sortBy from 'sort-by';
import { Icon } from '~/components/Icon/Icon';
import { getGamer, getGamers } from '~/data';

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
  return (
    <>
      <div className="hidden sm:flex">
        Please view on mobile. Or right click and click on inspect in the menu dropdown
      </div>
      <div className="sm:hidden h-full w-full">
        <div className="fixed w-full h-full overflow-hidden">
          <img className="object-none h-full" src="assets/images/bg-pattern.svg" alt="bg-pattern" />
        </div>

        <div className="px-6 pt-6 w-full relative flex flex-col">
          <button
            className="rounded-full w-10 h-10 bg-[#02A8F0] flex items-center justify-center self-end shrink-0 sticky top-0"
            onClick={() => console.log('I am here')}
          >
            <Icon id="icon-close" className="!w-6 h-6" />
          </button>

          <div className="place-content-center mt-5 space-y-4">
            <button
              className="rounded-full w-full bg-[#02A8F0] uppercase text-white py-4 inline-flex items-center justify-center"
              onClick={() => console.log('I am here')}
            >
              See Global leaderboard
            </button>

            <div className="bg-gradient-to-b from-[#01AAF2] to-[#005D9C] w-full rounded-[32px] p-4 drop-shadow-[0px_4px_#64FFE3]">
              <div className="bg-[#70D1FF] h-full rounded-[24px] p-4">
                <div
                  className="text-[#008CC9] text-sm font-bold uppercase tracking-wide flex flex-row 
                      space-x-4 w-full justify-around"
                >
                  <h3>#</h3>
                  <h3>Tag</h3>
                  <h3>Points</h3>
                </div>

                <div className="place-items-center space-y-3">
                  {gamers.map((gamer, index) => (
                    <div
                      className="flex flex-row justify-between items-center bg-[#02A8F0] 
                            p-3 rounded-2xl space-x-4 overflow-hidden"
                      key={index}
                    >
                      <div className="bg-white w-[50px] h-[50px] rounded-lg flex justify-center items-start shrink-0">
                        <img
                          className={`w-10 h-10 ${index !== 0 ? 'grayscale' : ''}`}
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
                          <p className="uppercase  overflow-hidden text-ellipsis">
                            {gamer.username === currentUser?.username ? 'You' : gamer.username}
                          </p>
                        </div>
                        <div className="inline-flex items-center w-fit">
                          <img
                            className="w-5 h-5 -mr-2 z-10"
                            src="./assets/icons/icon_point_coin.svg"
                            alt="point coin"
                          />
                          <span className="bg-[#0099DB] inline-flex rounded-full h-[19px] w-[76px] items-center justify-center">
                            {gamer.points || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
