/* eslint-disable react/prop-types */

function ShowPasswordCheckBox({checked, handleShowPassword}) {
  return (
    <>
        <label htmlFor='showPassword' className='flex gap-2 items-center mt-2'> 
            <input type='checkbox' className='w-4 h-4 hover:cursor-pointer' id='showPassword' checked={checked} onChange={handleShowPassword}/>
            <small className='roboto-medium'>Show password</small>
        </label>
    </>
  )
}

export default ShowPasswordCheckBox