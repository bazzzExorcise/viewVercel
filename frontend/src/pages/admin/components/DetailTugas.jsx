import React from 'react'

const DetailTugas = (props) => {

  const title = props.title
  const teacher = props.teacher
  const tugasDescription = props.tugasDescription
  const tugasLink = props.tugasLink
  const classFor = props.class
  const image = props.image

  return (
    <article className="flex flex-col sm:flex-row bg-white transition hover:shadow-xl">
      <div className="sm:rotate-180 p-2 sm:[writing-mode:_vertical-lr]">
        <time
          className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
        >
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>{teacher}</span>
        </time>
      </div>

      <div className="sm:block sm:basis-56">
        <img
          alt=""
          src={image}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <p>{classFor}</p>
          <a href="#">
            <h3 className="font-bold uppercase text-gray-900">
              {title}
            </h3>
          </a>
          <i className='mt-4'>{tugasLink}</i>
          <p className="line-clamp-3 text-sm/relaxed text-gray-700">
            {tugasDescription}
          </p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <button
            href="#"
            className="w-full sm:w-auto bg-black text-white px-5 py-3 text-center text-xs font-bold uppercase transition hover:bg-yellow-400"
          >
            Delete Tugas
          </button>
        </div>
      </div>
    </article>
  )
}

export default DetailTugas
