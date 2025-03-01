import React, { useEffect, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import Image from 'next/image'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import JobsCard from './JobsCard';
import AppliedJobDataTable from '@/components/AppliedJobDataTable';
import NavBar from '@/components/NavBar';
import SavedJobDataTable from '@/components/SavedJobDataTable';
import { get_my_applied_job } from '@/Services/job';
import { get_book_mark_job } from '@/Services/job/bookmark';
import { setAppliedJob, setBookMark } from '@/Utils/AppliedJobSlice';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';

export default function Intro() {
  const [search, setSearch] = useState('');
  const jobData = useSelector(state => state.Job.JobData);
  const [filterJobs, setFilteredJobs] = useState([])
  const [doneSearch, setDoneSearch] = useState(false)
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const activeUser = useSelector(state => state?.User?.userData);
  const id = activeUser?._id;

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredJobs = jobData?.filter((job) => {
      let x = job?.job_category;
      return x?.toUpperCase() === search?.toUpperCase().trim();
    });
    setFilteredJobs(filteredJobs);
    setDoneSearch(true)
  }

  useEffect(() => {
    if (!id || !Cookies.get('token')) {
      router.push('/auth/login');
    }
  }, [activeUser, id]);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    const res = await get_my_applied_job(id);
    const get_bookmarks = await get_book_mark_job(id);
    if (res.success || get_bookmarks.success) {
      dispatch(setAppliedJob(res?.data));
      dispatch(setBookMark(get_bookmarks?.data));
      setLoading(false);
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <>
      <div className='w-full h-full flex items-center lg:justify-start py-24 justify-center flex-wrap bg-white'>
        <div className='lg:w-3/6 w-full sm:p-2 h-full my-2 flex items-center justify-center px-4 md:items-start md:justify-start md:p-20 flex-col'>
          <h1 className='md:text-6xl text-2xl sm:text-2xl font-extrabold mb-4 text-black animate__animated animate__fadeIn cursor-pointer hover:text-indigo-600 transition duration-300 ease-in-out hover:scale-105'>To Choose <span className='text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out'>Right Jobs.</span> </h1>
          <p className='md:text-lg sm:text-sm text-xs mb-20 text-gray-400 animate__animated animate__fadeIn hover:text-gray-600 transition duration-300 ease-in-out'>2400 Peoples are daily search in this portal, 100 user added job portal!</p>
          <div className='bg-white flex-col mb-6 w-full md:px-4 py-4 flex sm:flex-row items-center justify-center'>
            <BiSearchAlt className='text-2xl text-indigo-600 mx-2 hidden sm:flex hover:text-indigo-800 transition duration-300 ease-in-out' />
            <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search Jobs with Job categories like marketing ...' className='xs:w-full w-3/4 h-full px-2 bg-gray-200 text-base py-3 outline-none transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-300' />
            <button onClick={handleSearch} className='px-3 py-2 my-2 sm:my-0 border border-indigo-600 rounded uppercase tracking-widest mx-4 text-white bg-indigo-600 transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-indigo-600 hover:scale-105'>Search</button>
          </div>
          <div className='w-full px-2 py-2 flex items-center justify-start flex-wrap'>
            <div className='flex items-center justify-center'>
              <BsFillBookmarkFill className='text-indigo-600 text-xl mx-2 hover:text-indigo-800 transition duration-300 ease-in-out' />
              <h1 className='font-semibold text-lg hover:text-gray-600 transition duration-300 ease-in-out'>Suggest Tag : </h1>
            </div>
            <div className='flex items-center justify-center px-4 flex-wrap'>
              <p className='px-2 text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out'>Software</p>
              <p className='px-2 text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out'>Marketing</p>
              <p className='px-2 text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out'>UI/UX Design</p>
            </div>
          </div>
        </div>
        <div className='w-3/6 my-2 h-full bg-white hover:lg transition duration-300 ease-in-out lg:flex items-center justify-center flex-col p-20'>
          <Image width={600} height={700} src="/intro.png" alt="no-image-found" className="animate__animated animate__zoomIn" />
        </div>

        <div className="fixed bottom-0 right-0 m-4 transition duration-300 ease-in-out hover:scale-110 animate-bounce bg-white">
          <div className="bg-indigo-600 rounded-full p-4 cursor-pointer shadow-md">
            <a href="https://adarshpandey108.github.io/Cronus-Ai-Companion-/"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </a>
          </div>
        </div>
        <div className="fixed bottom-0 right-20 m-4 transition duration-100 ease-in-out hover:scale-110 animate-bounce bg-white">
          <div className="bg-indigo-600 rounded-full p-4 cursor-pointer shadow-md">
            <a href="https://adarshpandey108.github.io/Cronoson/"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </a>
          </div>
        </div>
      </div>
      {
        doneSearch && (
          <div className='w-full flex flex-wrap items-center justify-center py-2 px-2'>
            {
              Array.isArray(filterJobs) && filterJobs.length > 0 ? filterJobs?.map((job) => {
                return (
                  <JobsCard job={job} key={job?._id} className="animate__animated animate__fadeIn" />
                )
              }) : <p className='text-sm text-center font-semibold text-red-500 hover:text-red-700 transition duration-300 ease-in-out'>Sorry No such Categories Job Available Right Now</p>
            }
          </div>
        )
      }
      {
        loading ? (
          <div className='bg-gray w-full h-screen flex items-center flex-col justify-center'>
            <InfinitySpin width='200' color="#4f46e5" />
            <p className='text-xs uppercase'>Loading Resources Hold Tight...</p>
          </div>
        ) : (
          <div>
            <AppliedJobDataTable />
            <SavedJobDataTable />
          </div>
        )
      }
    </>
  )
}
