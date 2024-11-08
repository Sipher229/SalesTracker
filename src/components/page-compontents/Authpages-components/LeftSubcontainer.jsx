import Logo from "./Logo";

function LeftSubContainer(){
    return (
      <>
        <div className='h-full w-1/2 grid grid-rows-12 grid-cols-6 items-center box-border'>
          <div className='col-start-2 col-span-6 row-start-2 row-span-3'>
            <Logo />
          </div>
          <ul className='list-disc row-start-4 row-span-12 col-start-3 col-span-6'>
            <li className='roboto-medium mb-4'>Track your sales and commision </li>
            <li className='roboto-medium mb-4'>Track your progress with a detailed report</li>
            <li className='roboto-medium mb-4'>Make winning a habbit</li>
          </ul>
        </div>
      </>
    )
  }

  export default LeftSubContainer