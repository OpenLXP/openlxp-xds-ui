import DefaultLayout from '@/components/layouts/DefaultLayout';
import { Fragment, useState } from "react";
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';


export default function Help() {

    const content = [
    {   title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam gravida, neque id scelerisque commodo, nisi metus tristique nunc, ut sodales risus quam non lacus. Nulla dictum sit amet justo a accumsan. Sed ac augue vitae leo consectetur lacinia. Ut in est eu nisi pretium sodales et consectetur neque."
    },
    {   title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam gravida, neque id scelerisque commodo, nisi metus tristique nunc, ut sodales risus quam non lacus. ",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam gravida, neque id scelerisque commodo, nisi metus tristique nunc, ut sodales risus quam non lacus. Nulla dictum sit amet justo a accumsan. Sed ac augue vitae leo consectetur lacinia. Ut in est eu nisi pretium sodales et consectetur neque. Proin lectus turpis, interdum et tellus ut, suscipit sollicitudin ex. Donec vel nibh vitae tortor venenatis egestas at sit amet justo. Praesent in nulla velit. Aenean sollicitudin efficitur ex, sed vehicula neque aliquam vitae. In congue, turpis ac dictum eleifend, est eros tempus lorem, vel tincidunt urna enim ut est. Pellentesque mi sem, varius in arcu eleifend, sodales vestibulum velit. Sed aliquam molestie mauris, id vestibulum orci pharetra quis. Donec ex elit, auctor ac euismod eu, pretium ac massa. Mauris id mattis elit. Integer dictum felis mauris, ac sagittis tellus fermentum ut. Proin aliquet sem sed venenatis consequat. Nulla facilisis fermentum vulputate."
    },
    {   title: "test",
        answer: "test ans"
    },
    ]

    const panelCode = (content) =>
        content.map((question, index) => {
            return(
                <Disclosure key={index}>
                {({ open }) => (
                <div className='p-2 hover:ring-4 hover:ring-blue hover:bg-gray-50'>
                    <Disclosure.Button className="flex items-center rounded-lg justify-between text-left w-full p-5 font-medium border bg-blue-500 text-white border-gray-300 dark:focus:ring-gray-800 hover:opacity-90 hover:shadow ">
                        {question.title}
                        <ChevronDownIcon className={`w-6 h-6 ${open ? "transform rotate-180" : ""} `} />
                    </Disclosure.Button>

                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                    <Disclosure.Panel className="p-5 rounded-lg border border-t-0 ml-2 border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-gray-200 focus:bg-gray-50">
                        {question.answer}
                    </Disclosure.Panel>
                    </Transition>
                </div> )}
                </Disclosure>
            );
        });

    return (
        <DefaultLayout>
            <div className='mt-10 pb-20'>
                <h1 className='pb-4 border-b mb-8 text-3xl font-semibold'>Support</h1>
                <h2 className='text-xl font-semibold pb-2'>About</h2>
                {panelCode(content)}
                <h2 className='text-xl font-semibold pb-2 mt-4'>Purpose</h2>
                {panelCode(content)}
            </div>
        </DefaultLayout>
    );
}