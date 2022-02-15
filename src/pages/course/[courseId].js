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

function CourseHeader({ title, description, courseCode, photo, url }) {
  return (
    <div className='flex w-full gap-8 max-w-7xl px-4 mx-auto mt-10'>
      <div className='w-2/3'>
        <h1 className='text-4xl font-semibold'>{title}</h1>
        <div className='flex w-full gap-2 justify-between items-center my-2 font-medium'>
          <div>
            <span className='font-semibold'>Course Code:&nbsp;</span>{' '}
            {courseCode}
          </div>
          <a href={url} rel='noopener noreferrer' target='_blank'>
            <button className='inline-flex justify-center items-center gap-2 text-white hover:shadow-md rounded-sm bg-blue-400 hover:bg-blue-600 py-1 px-2 font-medium transform transition-all duration-150 ease-in-out focus:ring-2 ring-blue-400 outline-none'>
              Go to Enrollment
            </button>
          </a>
        </div>
        <p className='text-sm p-0.5'>{description}</p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt='Course'
        className='w-1/3 aspect-video object-contain'
      />
    </div>
  );
}

function DetailsDivider({ provider, instructor, delivery, id }) {
  const { user } = useAuth();
  return (
    <div className='bg-stone-200 mt-4'>
      <div className='flex max-w-7xl mx-auto p-4 justify-between'>
        <div className='flex items-center min-w-max gap-8'>
          <div className='flex justify-center items-center gap-2'>
            <ArchiveIcon className='h-10' />
            <span>
              <div className='text-sm font-semibold'>Course Provider</div>
              <div className='text-sm'>{provider}</div>
            </span>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <UserIcon className='h-10' />
            <span>
              <div className='text-sm font-semibold'>Course Instructor</div>
              <div className='text-sm'>{instructor}</div>
            </span>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <AcademicCapIcon className='h-10' />
            <span>
              <div className='text-sm font-semibold'>Delivery Mode</div>
              <div className='text-sm'>{delivery || 'Not Available'}</div>
            </span>
          </div>
          {user && <SaveModalCoursePage courseId={id} />}
        </div>
      </div>
    </div>
  );
}

function Dates({ start, end }) {
  return (
    <div className=' w-full gap-10 max-w-7xl px-4 my-4 mx-auto'>
      <div>
        <span className='font-semibold'>Start Date:&nbsp;</span> {start}
      </div>
      <div>
        <span className='font-semibold'>End Date:&nbsp;</span> {end}
      </div>
    </div>
  );
}

function AboutCourse({ details = [] }) {
  return (
    <div className='py-10 grid gap-4'>
      {details.map((detail, index) => {
        return (
          <div
            key={detail.title}
            className='grid grid-cols-5 w-full max-w-7xl px-4 mt-10 mx-auto'
          >
            <h2 className='min-w-max col-span-1 font-semibold'>
              {detail.title}
            </h2>
            <p className='col-span-4'>{detail.content}</p>
          </div>
        );
      })}
    </div>
  );
}

function RelatedCourses({ id }) {
  const moreLikeThis = useMoreCoursesLikeThis(id);

  if (moreLikeThis.data?.hits < 1) return null;
  return (
    <>
      <div className='bg-stone-200 mt-10 font-bold block font-sans p-4 '>
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

  // state of the fetching
  const course = useCourse(router.query?.courseId);
  const config = useConfig();

  // generate the course dates randomly
  // @SONAR_STOP@
  const dates = useMemo(() => {
    // get the start date (today or random day in the future)
    const start = new Date();
    start.setDate(start.getDate() + Math.floor(Math.random() * 30));

    // get the end date (start date + random number of days between 20 and 400)
    const end = new Date(start);
    end.setDate(end.getDate() + Math.floor(Math.random() * 400) + 20);

    return { start: start.toDateString(), end: end.toDateString() };
  }, []);
  
  // @SONAR_START@

  // prepare the course data
  const courseData = useMemo(() => {
    if (!course.isSuccess || !config.isSuccess) return null;
    return {
      title: removeHTML(
        getDeeplyNestedData(
          config.data?.course_information?.course_title,
          course.data
        )
      ),
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
      details: [
        {
          title: 'Course Audience',
          content: removeHTML(course.data?.Course?.CourseAudience),
        },
        {
          title: 'Course Prerequisites',
          content: removeHTML(course.data?.Course?.CoursePrerequisites),
        },
      ],
    };
  }, [course.isSuccess, course.data, config.isSuccess, config.data]);

  return (
    <>
      <Header />
      <CourseHeader
        title={courseData?.title}
        description={courseData?.description}
        courseCode={courseData?.code}
        photo={courseData?.photo}
        url={courseData?.url}
      />
      <Dates start={dates.start} end={dates.end} />
      <DetailsDivider
        provider={courseData?.provider}
        instructor={courseData?.instructor}
        delivery={courseData?.delivery}
        id={router.query?.courseId}
      />
      <AboutCourse details={courseData?.details} />
      <RelatedCourses id={router.query?.courseId} />
      <Footer />
    </>
  );
}
