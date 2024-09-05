import { cn } from '@/lib/utils';
import { Playball } from 'next/font/google'
import Image from 'next/image';
import Link from 'next/link';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Mail } from 'lucide-react';
import { WechatIcon } from '@/components/wechat';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

export const metadata = {
  title: "Vino | About me",
  description: "Welcome to vino's blog",
};

const inter = Playball({
  weight: '400',
  subsets: ['latin']
})

export default function AboutMe() {
  return (
    <article className='leading-7'>
      <Image src={"/avatar.jpg"} width={125} height={125} alt='avatar' className='float-left m-4 ml-0 mt-0 rounded-md opacity-100 hidden md:inline-block' />
      <Image src={"/avatar.jpg"} width={80} height={80} alt='avatar' className='float-left m-4 ml-0 mt-0 rounded-md opacity-100 md:hidden' />
      <section className='opacity-60'>
        <h6 className={cn(inter.className, "md:text-3xl text-2xl font-semibold")}>{`Hey there,I'am Vino 👋`}</h6>
        <p className='md:mt-2'>
          我是一名软件工程师，目前专注于 <b>Web</b> 开发领域。
        </p>
        <p className='leading-7 mt-2 md:mt-0' >
          <b>JavaScript</b> 是我的主要开发语言， 但是更喜欢 <b>Golang</b> 🤣，目前正在使用这两种语言开发全栈项目。平时会用 Lua 写一点脚本。
        </p>
        <p className='mt-6 '>我日常的开发工具是：</p>
        <ol className='ml-4 '>
          <li>1. 一台<b> Mac Mini 「M2 16 + 256GB」</b></li>
          <li>2. <b>Surface Pro </b> 「但是 <i className='text-blue-400'>Arch Linux</i> 版本🙃」</li>
        </ol>
        <p>
          我还是重度的 <b className='text-[#1b943e]'>Vim</b> 和 <b>双拼</b> 使用者。这两者除了工作高效以外，并且让绝大多数 人「或者猫咪」不能正常敲击键盘。✌
        </p>
      </section>
      <section className='opacity-60 mt-6'>
        <p>我的技术栈：</p>
        <ul className='ml-4 '>
          <li> - 语言：
            <i className=' text-[#fcdc44] font-semibold'> JavaScript </i>,
            <i className='text-[#1fadd5] font-semibold'>  Golang </i>,
            <i className='text-[#c93933] font-semibold'>  Ruby </i>
          </li>
          <li> - 前端：
            <i className=' text-[#5ec3da] font-semibold'> React.js </i>,
            <i className=' text-[#4bb787] font-semibold'> Vue.js </i>,
            <i className=' text-[#171717] dark:text-white font-semibold'> Next.js </i>,
          </li>
          <li> - 后端：Fiber「Golang」, Rails「Ruby」</li>
        </ul>
      </section>
      <section className='opacity-60 mt-6'>
        <div className='md:flex'>
          <p className='flex items-center flex-wrap'>你可以在
            <Link className='underline mx-1 inline-flex items-center gap-1' href="https://github.com/vinoMamba">
              <GitHubLogoIcon className='inline-block w-[1rem] h-[1rem]' />
              Github
            </Link> 找到我。
          </p>
          <span>同时也欢迎通过以下联系方式与我联系：</span>
        </div>
        <ul className='ml-4 '>
          <li className='flex items-center'>
            - 邮箱：
            <a className=' underline mx-1 flex items-center gap-1' href='mailto:vino0908@outlook.com'>
              <Mail className='w-[1rem] h-[1rem]' />
              vino0908@outlook.com
            </a>
          </li>
          <li className='flex items-center'>
            - 微信：
            <span className='hidden md:block'>
              <HoverCard>
                <HoverCardTrigger className='underline mx-1 flex items-center gap-1' >
                  <WechatIcon />
                  duvino
                </HoverCardTrigger>
                <HoverCardContent>
                  <Image src={"/wechat.jpg"} width={256} height={272} alt='avatar' className='rounded-md opacity-100' />
                </HoverCardContent>
              </HoverCard>
            </span>
            <span className='block md:hidden'>
              <Drawer>
                <DrawerTrigger className='underline mx-1 flex items-center gap-1'>
                  <WechatIcon />
                  duvino
                </DrawerTrigger>
                <DrawerContent>
                  <div className='flex items-center justify-center pt-4'>
                    <Image src={"/wechat.jpg"} width={256} height={272} alt='avatar' className='rounded-md opacity-100' />
                  </div>
                </DrawerContent>
              </Drawer>
            </span>
          </li>
        </ul>
      </section>
    </article>
  );
}
