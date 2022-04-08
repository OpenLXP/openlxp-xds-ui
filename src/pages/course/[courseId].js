import {
  AcademicCapIcon,
  ArchiveIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { getDeeplyNestedData } from '@/utils/getDeeplyNestedData';
import { removeHTML } from '@/utils/cleaning';
import { useAuth } from '@/contexts/AuthContext';
import { useConfig } from '@/hooks/useConfig';
import { useCourse } from '@/hooks/useCourse';
import { useMemo } from 'react';
import { useMoreCoursesLikeThis } from '@/hooks/useMoreCoursesLikeThis';
import { useRouter } from 'next/router';
import CourseSpotlight from '@/components/cards/CourseSpotlight';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SaveModalCoursePage from '@/components/modals/SaveModalCoursePage';

function RelatedCourses({ id }) {
  const moreLikeThis = useMoreCoursesLikeThis(id);
  if (moreLikeThis.data?.hits < 1) return null;
  return (
    <>
      <div className='bg-gray-200 mt-10 font-bold block font-sans p-4 '>
        <div className='w-full gap-10 max-w-7xl mx-auto'>Related Courses</div>
      </div>

      <div className='flex justify-center w-full overflow-x-hidden my-10 max-w-7xl mx-auto'>
        <div className='inline-flex overflow-x-auto gap-2 py-4 custom-scroll '>
          {moreLikeThis.data?.hits.map((course, index) => {
            return <CourseSpotlight course={course} key={index} />;
          })}
        </div>
      </div>
    </>
  );
}

export default function Course() {
  const router = useRouter();
  const { user } = useAuth();

  // state of the fetching
  const course = useCourse(router.query?.courseId);
  const config = useConfig();

  // prepare the course data
  const data = useMemo(() => {
    if (!course.isSuccess || !config.isSuccess) return null;

    console.log(course.data?.Course_Instance.EndDate);
    return {
      title: removeHTML(
        getDeeplyNestedData(
          config.data?.course_information?.course_title,
          course.data
        )
      ),
      date: {
        start: course.data?.Course_Instance?.StartDate?.replace(' ', '').split(
          'T'
        )[0],
        end: course.data?.Course_Instance.EndDate?.replace(' ', '').split(
          'T'
        )[0],
      },
      description: removeHTML(
        getDeeplyNestedData(
          config.data?.course_information?.course_description,
          course.data
        )
      ),
      url: getDeeplyNestedData(
        config.data?.course_information?.course_url,
        course.data
      ),
      code: getDeeplyNestedData('Course.CourseCode', course.data),
      photo:
        getDeeplyNestedData('Course_Instance.Thumbnail', course.data) ||
        getDeeplyNestedData('Technical_Information.Thumbnail', course.data),

      provider: getDeeplyNestedData('Course.CourseProviderName', course.data),
      instructor: getDeeplyNestedData(
        'Course_Instance.Instructor',
        course.data
      ),
      delivery: getDeeplyNestedData(
        'Course.CourseSectionDeliveryMode',
        course.data
      ),
      details: config.data?.course_highlights?.map((highlight) => {
        return {
          title: highlight.display_name,
          content: removeHTML(
            getDeeplyNestedData(highlight.field_name, course.data)
          ),
        };
      }),
    };
  }, [course.isSuccess, course.data, config.isSuccess, config.data]);

  return (
    <>
      <Header />
      {/* content */}
      <div className='flex max-w-7xl px-4 mx-auto gap-8 mt-10'>
        <div className='w-2/3'>
          <div className='flex justify-between items-center'>
            <h1 className='font-semibold text-4xl'>{data?.title}</h1>
            <a
              className='min-w-max whitespace-nowrap p-2 text-center text-white hover:shadow-md rounded-sm bg-blue-400 hover:bg-blue-600  font-medium transform transition-all duration-150 ease-in-out focus:ring-2 ring-blue-400 outline-none'
              href={data?.url}
              rel='noopener noreferrer'
              target='_blank'
            >
              Go to Enrollment
            </a>
          </div>
          <p className='my-2'>
            <strong>Course Code:&nbsp;</strong>
            {data?.code}
          </p>
          <p>{data?.description}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data?.photo}
          alt='Course'
          className='w-1/3 aspect-video object-contain'
        />
      </div>

      {/* Dates */}
      <div className='grid max-w-7xl px-4 mx-auto mt-10'>
        <span>
          <strong>Start Date:&nbsp;</strong>
          {data?.date?.start}
        </span>
        <span>
          <strong>End Date:&nbsp;</strong>
          {data?.date?.end}
        </span>
      </div>

      {/* Details divider */}
      <div id='details-divider' className='bg-gray-200 mt-4 '>
        <div className='flex max-w-7xl mx-auto p-4 justify-between'>
          <div className='flex items-center min-w-max gap-8'>
            <div className='flex justify-center items-center gap-2'>
              <ArchiveIcon className='h-10' />
              <span>
                <div className='text-sm font-semibold'>Provider</div>
                <div className='text-sm'>{data?.provider}</div>
              </span>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <UserIcon className='h-10' />
              <span>
                <div className='text-sm font-semibold'>Instructor</div>
                <div className='text-sm'>{data?.instructor}</div>
              </span>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <AcademicCapIcon className='h-10' />
              <span>
                <div className='text-sm font-semibold'>Delivery Mode</div>
                <div className='text-sm'>
                  {data?.delivery || 'Not Available'}
                </div>
              </span>
            </div>
            {user && <SaveModalCoursePage courseId={router.query?.courseId} />}
          </div>
        </div>
      </div>
      {/* Extra Details */}
      <div className='py-10 grid gap-4'>
        {data?.details.map((detail, index) => {
          return (
            <div
              key={detail.title}
              className='grid grid-cols-5 w-full max-w-7xl px-4 mt-5 mx-auto'
            >
              <h2 className='min-w-max col-span-1 font-semibold'>
                {detail.title}
              </h2>
              <p className='col-span-4'>{detail.content}</p>
            </div>
          );
        })}
      </div>

      {/* Related courses */}
      <RelatedCourses id={router.query?.courseId} />
      <Footer />
    </>
  );
}
