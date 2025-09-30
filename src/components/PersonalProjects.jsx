import {PERSONAL_PROJECTS} from '../constants'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'

const PersonalProjects = () => {
  const handleProjectClick = (project) => {
      if (project.status === 'private') {
        Swal.fire({
          title: '🔒 Private Repository',
          html: `
            <div class="text-gray-300 mb-4">
              <p class="mb-2">This repository is <span class="text-red-400 font-semibold">private</span>.</p>
              <p>Contact me for more details about <span class="text-cyan-400 font-medium">${project.title}</span></p>
            </div>
          `,
          icon: 'warning',
          iconColor: '#EF4444',
          confirmButtonText: '📧 Contact Me',
          confirmButtonColor: '#06B6D4',
          background: 'linear-gradient(145deg, #1a1a1a, #262626)',
          color: '#FFFFFF',
          customClass: {
            popup: 'border-2 border-red-500/30 shadow-2xl shadow-red-500/20 backdrop-blur-sm rounded-xl',
            title: 'text-xl font-bold text-red-400 mb-4',
            htmlContainer: 'text-gray-300',
            confirmButton: 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25',
            cancelButton: 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105',
            actions: 'gap-4 mt-6'
          },
          showCancelButton: true,
          cancelButtonText: '✕ Close',
          cancelButtonColor: '#6B7280',
          buttonsStyling: false,
          allowOutsideClick: false,
          allowEscapeKey: true,
          focusConfirm: false,
          showClass: {
            popup: 'animate__animated animate__fadeInDown animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `mailto:yassine.elkefi6@gmail.com?subject=Inquiry about Private Project: ${project.title}&body=Hi Yassine,%0D%0A%0D%0AI would like to know more about your private project "${project.title}".%0D%0A%0D%0AThank you!`;
          }
        });
        return;
      }
      window.open(project.githubRepo, '_blank');
    };

  return (
    <div className="border-b border-neutral-900 pb-4">
        <motion.h2
            whileInView={{opacity: 1, y: 0}}
            initial={{opacity: 0, y: -100}}
            transition={{duration: 0.5}}
            className="my-20 text-center text-4xl">
            Personal Projects
        </motion.h2>
        <div>
            {PERSONAL_PROJECTS.map((project, index) => (
                <div key={index} className='mb-8 flex flex-wrap lg:justify-center'>
                    <motion.div
                        whileInView={{opacity: 1, x: 0}}
                        initial={{opacity: 0, x: -100}}
                        transition={{duration: 1}}
                        className='w-full lg:w-1/4 relative'>
                        <div 
                          onClick={() => handleProjectClick(project)}
                          className='cursor-pointer'
                        >
                          <img 
                            src={project.image} 
                            alt={project.title}  
                            className='mb-6 rounded w-full max-w-[200px] aspect-square object-cover transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
                          />
                        </div>
                    </motion.div>
                    <motion.div
                        whileInView={{opacity: 1, x: 0}}
                        initial={{opacity: 0, x: 100}}
                        transition={{duration: 1}}
                        className='w-full max-w-xl lg:w-3/4'>
                        <div className='flex items-center gap-2 mb-2'>
                          <h6 className='font-semibold'>{project.title}</h6>
                          {project.status === 'private' && (
                            <span className='rounded mr-2 bg-black border border-red-400 px-2 py-1 text-sm font-medium text-red-400 text-center shadow-lg shadow-red-400/25'>
                              Private Repository
                            </span>
                          )}
                        </div>
                        <p className='mb-5 text-neutral-400'>{project.description}</p>
                        {project.technologies.map((technology, index) => (
                            <span key={index} 
                             className='mr-2 bg-black border border-blue-400 px-2 py-1 text-sm font-medium text-blue-400 text-center shadow-lg shadow-blue-400/25'>
                                {technology}
                            </span>    
                        ))}
                    </motion.div>
                </div>    
            ))}
        </div>
    </div>
  )
}

export default PersonalProjects