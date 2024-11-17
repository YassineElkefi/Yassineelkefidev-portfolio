import {HERO_CONTENT} from '../constants'
import profilePic from "../assets/yassineELKEFIProfile.jpeg";
import { delay, motion } from 'framer-motion';
import resume from '../assets/resume.pdf'
import { FaGithub, FaFileAlt } from 'react-icons/fa';

const container = (delay) => ({
    hidden: { x: -100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: delay,
        },
    },
});

const Hero = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35">
        <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2">
                <div className="flex flex-col items-center lg:items-start">
                    <motion.h1
                        variants={container(0)}
                        initial="hidden"
                        animate="visible"
                        className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl">
                        Yassine ELKEFI
                    </motion.h1>
                    <motion.span
                        variants={container(0.5)}
                        initial="hidden"
                        animate="visible"
                        className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl tracking-tight text-transparent">Mobile & Full Stack Developer</motion.span>
                        <motion.p
                            variants={container(1)}
                            initial="hidden"
                            animate="visible"
                            className='my-2 max-w-xl py-6 font-light tracking-tighter'>
                            {HERO_CONTENT}
                        </motion.p>
                </div>

                <motion.div
                    variants={container(1.5)}
                    initial="hidden"
                    animate="visible"
                    className='flex justify-center lg:justify-start gap-4 pb-8'>
                    <a
                        target='display'
                        href={resume}
                        className='bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 text-neutral-300 px-8 py-3 rounded-lg hover:scale-105 transform transition duration-500 ease-in-out flex items-center gap-3'>
                        <span>Resume</span><FaFileAlt className='mr-2 text-2xl' /> 
                    </a>
                    <a
                        target='display'
                        href='https://github.com/YassineElkefi'
                        className='bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 text-neutral-300 px-8 py-3 rounded-lg hover:scale-105 transform transition duration-500 ease-in-out flex items-center gap-3'>
                        <span>Github</span><FaGithub className='mr-2 text-2xl' /> 
                    </a>
                </motion.div>
            </div>

            <div className='w-full lg:w-1/2 lg:p-8'>
                <div className='flex justify-center'>
                    <motion.img
                        initial={{x:100, opacity:0}}
                        animate={{x:0, opacity:1}}
                        transition={{delay:1.2, duration:1}}
                        width={550}
                        height={550}
                        className='rounded-xl'                 
                        src={profilePic} alt="ProfilePic"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero
