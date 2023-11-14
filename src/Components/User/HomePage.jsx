import React from "react"
import { Card } from './Card'

export default function HomePage() {
	return (<>		 <div className='w-full h-screen bg-white flex justify-center'>
        <div className='absolute top-[-80%] w-[1400px] h-[1400px] bg-[rgb(248,248,248)] rounded-[50%] flex justify-center'>
          <p className='absolute bottom-1/3 text-[rgb(114,114,114)] text-3xl'>What our customers say...</p>
        </div>
      </div>
      <div className='absolute left-0 right-0 m-auto bottom-20 w-9/12 h-4/6 z-5 flex justify-evenly gap-10'>
        <Card image="./public/image-daniel.jpg" name="Daniel Smith" title="Instagram CEO" paragraph='"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab tempore impedit velit inventore."'/>
        <Card image="./public/image-jeanette.jpg" name="Jeanette Smith" title="Web Developer" paragraph='"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab tempore impedit velit inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab tempore impedit velit inventore."' margin="mt-24"/>
        <Card image="./public/image-jonathan.jpg" name="Jonathan Smith" title="Software Designer" paragraph='"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab tempore impedit velit inventore."'/>
        <Card image="./public/image-kira.jpg" name="Kira Smith" title="Cashier" paragraph='"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab tempore impedit velit inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab tempore impedit velit inventore."' margin="mt-24"/>
      </div>
      <hr></hr>
	  </>

	)
}