import Logo from "./Logo";

function LeftSubContainer(){
    return (
      <>
        <div className='h-full lg:w-1/2 sm:w-full sm:flex sm:justify-center sm:pt-3 lg:grid lg:grid-rows-12 lg:grid-cols-6 sm:items-center box-border'>
          <div className='lg:col-start-2 lg:col-span-6 lg:row-start-2 lg:row-span-3 lg:block sm:w-full sm:h-auto sm:flex sm:justify-center sm:items-center sm:py-2'>
            <Logo />
          </div>
          <ul className='list-disc row-start-4 row-span-12 col-start-3 col-span-6 sm:hidden lg:block'>
            <li className='roboto-medium mb-4'>Track your sales and commision </li>
            <li className='roboto-medium mb-4'>Track your progress with a detailed report</li>
            <li className='roboto-medium mb-4'>Activate your winning mode</li>
          </ul>
        </div>
      </>
    )
  }

  export default LeftSubContainer