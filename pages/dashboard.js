import { useMoralis, useNativeBalance } from 'react-moralis'

import InfoCard from '../components/dashboard/InfoCard'
import VerticalNavbar from '../components/dashboard/VerticalNavbar'
// SVG's
import Blogs from '../public/dashboard/blogs.svg'
import Bookmark from '../public/dashboard/bookmark.svg'
import Wallet from '../public/dashboard/wallet.svg'
import Star from '../public/dashboard/star.svg'
import Write from '../public/dashboard/write.svg'
import ReadBlog from '../public/dashboard/read.svg'
import ButtonCard from '../components/dashboard/ButtonCard'
import RecentBlogs from '../components/dashboard/RecentBlogs'
import YourBlogs from '../components/dashboard/YourBlogs'
import Account from '../components/Account'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Dashboard = () => {
  const { data: balance } = useNativeBalance()
  const router = useRouter()

  //check if already account is present or not else redirect
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis()

  useEffect(() => {
    const connectorId = window.localStorage.getItem('connectorId')
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId })
  }, [isAuthenticated, isWeb3Enabled])

  const info = [
    {
      name: 'Blogs',
      icon: <Blogs className='text-[#030229]' />,
      value: '178+',
      bgcolor: 'bg-[#5B93FF]'
    },
    {
      name: 'Bookmarks',
      icon: <Bookmark className='text-[#F2C113]' />,
      value: '20+',
      bgcolor: 'bg-[#FFD66B]'
    },
    {
      name: 'Balance',
      icon: <Wallet className='text-[#FF8F6B]' />,
      value: balance.formatted,
      bgcolor: 'bg-[#FF8F6B]'
    },
    {
      name: 'Stars',
      icon: <Star className='text-[#605BFF]' />,
      value: '12',
      bgcolor: 'bg-[#605BFF]'
    }
  ]

  const buttons = [
    {
      title: 'Write Blog',
      icon: Write,
      func: () => {
        router.push('/createblog')
      }
    },
    {
      title: 'Read Blog',
      icon: ReadBlog,
      func: () => {
        router.push('/blogs')
      }
    }
  ]

  return (
    <>
      <Head>
        <title>Dashboard | BlogStream</title>
      </Head>
      {!isAuthenticated ? (
        <div className='h-screen flex bg-gray-300'>
          <Account
            className='m-auto w-1/4 bg-blue-600 text-white p-4 rounded-xl border'
            showIcon={true}
          />
        </div>
      ) : (
        <div className='bg-[#FAFAFB] grid grid-cols-12 md:p-2 h-screen'>
          <div className='col-span-1'>
            <VerticalNavbar />
          </div>
          <div className='col-span-11 p-6 md:p-2 my-5 md:mx-2 overflow-auto'>
            <h1 className='font-nunito text-2xl font-semibold text-[#030229]'>Dashboard</h1>
            <div className='grid grid-cols-12 gap-4 mt-5'>
              {info.map((data, index) => (
                <InfoCard data={data} key={index} />
              ))}
            </div>
            <h2 className='my-6 text-2xl font-nunito font-extrabold text-[#787878]'>Hi Sreekar!</h2>
            <div className='grid grid-cols-12 gap-4'>
              {buttons.map((data, index) => (
                <ButtonCard key={data.title + index} data={data} />
              ))}
              <div className='col-span-12 md:col-span-4 bg-white px-5 lg:p-10 cursor-pointer drop-shadow-lg flex justify-between items-center rounded-xl'>
                <Account showIcon={true} />
              </div>
            </div>
            <div className='mt-6 grid grid-cols-12 gap-4'>
              <RecentBlogs />
              <YourBlogs />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
