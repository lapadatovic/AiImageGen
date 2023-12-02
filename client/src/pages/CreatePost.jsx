import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {preview} from '../assets'
import {getRandomPrompt} from '../utils'
import {FormField, Loader} from '../components'


const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:'',
    prompt:'',
    photo:'',
  });
  const [generatingImage, setGeneratingImage] = useState(false)
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo){
      setLoading(true);
      try{
        const response = await fetch('http://localhost:8080/api/v1/post',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...form})
        })

        await response.json();
        navigate('/');
      }catch(error){
        alert(error)
      }finally{
        setLoading(false);
      }
    }else{
      alert('Please enter a prompt and generate an image');
    }
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
    // console.log(e.target.name);
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form, prompt : randomPrompt})
  }

  const generateImage = async () => {
    if(form.prompt){
      try {
        setGeneratingImage(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( { prompt: form.prompt} )
        })

        const data = await response.json();
        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`});

      } catch (error) {
        console.log(error)
        alert(error);
      } finally{
        setGeneratingImage(false);
      }
    }else{
      alert('Please enter a prompt');
    }
  }

  return (
    <section className='max-w-7xl mx-auto '> 
      <div>
        <div>
          <h1 className='font-extrabold text-[#222328] text-[32px]'>
            Create 
          </h1>
          <p className='mt-2 text-[#666e75] text-[15px] max-w-[500px]'>
            Create imaginative and visually stunning images
            through DALL-E AI and share them with the community
          </p>
        </div>
      </div>

      <form 
        className='mt-16 max-w-3xl' 
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-5'>
          <FormField 
            labelName= 'Your Name'
            type = 'text'
            name = 'name'
            placeholder = 'Lappier'
            value = {form.name}
            handleChange = {handleChange}
          />
          <FormField 
            labelName= 'Prompt'
            type = 'text'
            name = 'prompt'
            placeholder = 'Lappier prompt'
            value = {form.prompt}
            handleChange = {handleChange}
            isSurpriseMe
            handleSurpriseMe = {handleSurpriseMe}
          />
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img
                className='w-full h-full object-contain' 
                src={form.photo} 
                alt={form.prompt} 
              />
            ):(
              <img 
                src={preview} 
                alt='preview' 
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {generatingImage && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        {/* Generating image container(button) */}
        <div className='mt-5 flex gap-5'>
          <button 
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            type='button'
            onClick={generateImage}
          >
            {generatingImage ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {/*  */}
        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>
            Once u have created the image you want, you can share it with others in the community
          </p>
          <button
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center' 
            type='submit'
          >
            {loading ? 'Sharing...' : 'Share wit the community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost