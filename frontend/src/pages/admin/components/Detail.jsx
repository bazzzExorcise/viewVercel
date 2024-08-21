import React from 'react'
import { Link } from 'react-router-dom'

const Detail = (props) => {
  let id = props.id
  let teacher = props.teacher.toLowerCase()
  let date = props.date
  let subject = props.subject
  let classRoom = props.classRoom

  const makeProfileLink = (i) => {
    let text = i.split(' ')
    let link = ''

    for (let i = 0; i <= text.length - 1; i++) {
      if( i == text.length - 1 ) {
        link += text[i]
      }else{
        link += text[i] + "_";
      }
    }
    return link
  }

  return (
    <div key={id} className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
      <dl className="-my-3 text-sm">
        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50">
          <dt className="font-medium text-gray-900">Nama Guru</dt>
          <dd className="text-gray-700 capitalize font-bold text-lg sm:col-span-2">{teacher}</dd>
        </div>

        <div className="grid text-xs grid-cols-1 gap-1 p-3">
          <div className=''>
            <dd className="text-gray-700 sm:col-span-2">{classRoom}</dd>
            <dd className="text-gray-700 sm:col-span-2">{subject}</dd>
            <dd className="text-gray-700 sm:col-span-2">{date}</dd>
          </div>
        </div>

        <div className="px-3 pb-3 even:bg-gray-50">
          <dd className="text-gray-700 flex gap-1 w-full">
            <Link to={"/admin/"+ makeProfileLink(teacher)+ '/' + id} className=' bg-black text-white px-3 py-2 rounded'>edit data</Link>
            <Link to={makeProfileLink(teacher)} className=' bg-black text-white px-3 py-2 rounded'>profile</Link>
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default Detail
