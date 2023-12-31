import React from 'react'

const FormField = ({labelName,type,name,placeholder,value,handleChange,isSurpriseMe,handleSurpriseMe  }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label 
          htmlFor={name}
          className='block font-semibold text-sm font-xs text-gray-900'
        >
          {labelName}
        </label>
      </div>
      {/* surpr button */}
      <div className='mb-2'>
        {isSurpriseMe && (
            <button 
              type='button'
              onClick={handleSurpriseMe}
              className='font-semibold tex-xs bg-[#6469ff] py-1 px-2 rounded-[5px] text-white'
            >
              Surprise me!
            </button>
        )}
      </div>
      <input 
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
      />
    </div>
  )
}

export default FormField