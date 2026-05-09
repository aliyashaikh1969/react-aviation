import React from 'react'

export const Filters = () => {
  return (
    <div className=' bg-white p-3 rounded-xl shadow-md'>
      <div>
        {/* heading */}
        <div className='flex items-center justify-between py-3 border-b'>
          <p className='font-semibold text-xl'>Filter</p>
          <button className='text-sm text-blue-600'>Clear All</button>
        </div>

        <div >
          {/* price range */}
          <div className='py-3 border-b'>
            <p className='font-semibold text-gray-800'>Price Range</p>
            <p className='font-semibold text-gray-800'>2000rs - 15000rs</p>
            <input type="range" min={2000} max={15000} className='w-full h-1' />
            <div className='flex items-center justify-between text-gray-700 text-sm'>
              <span>2000rs</span>
              <span>15000rs</span>
            </div>
          </div>

          {/* stops */}
          <div className='py-3 border-b'>
            <p className='font-semibold text-gray-800 pb-2'>Stops</p>
            <ul className='flex flex-col gap-2'>
              <li className='flex items-center gap-2'>
                <input type="checkbox" name="non-stop" id="non-stop" />
                <label htmlFor="non-stop" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>Non-Stop</span>
                  <span>75</span>
                </label>
              </li>
              <li className='flex items-center gap-2'>
                <input type="checkbox" name="one-stop" id="one-stop" />
                <label htmlFor="one-stop" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>1 Stop</span>
                  <span>30</span>
                </label>
              </li>
              <li className='flex items-center gap-2'>
                <input type="checkbox" name="two-stop" id="two-stop" />
                <label htmlFor="two-stop" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>2+ Stop</span>
                  <span>15</span>
                </label>
              </li>
            </ul>
          </div>

          {/* departure */}
          <div className='py-3 border-b'>
            <p className='font-semibold text-gray-800 pb-2'>Departure Time</p>
            <ul className='flex flex-col gap-2'>

              <li className='flex items-center gap-2'>
                <input type="checkbox" name="morning" id="morning" />
                <label htmlFor="morning" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>Morning (00:00 - 06:00)</span>
                  <span>20</span>
                </label>
              </li>
              <li className='flex items-center gap-2'>
                <input type="checkbox" name="afternoon" id="afternoon" />
                <label htmlFor="afternoon" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>Afternoon (06:00 - 12:00)</span>
                  <span>45</span>
                </label>
              </li>
              <li className='flex items-center gap-2'>
                <input type="checkbox" name="evening" id="evening" />
                <label htmlFor="evening" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>Evening (12:00 - 18:00)</span>
                  <span>35</span>
                </label>
              </li>
              <li className='flex items-center gap-2'>
                <input type="checkbox" name="night" id="night" />
                <label htmlFor="night" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>Night (18:00 - 24:00)</span>
                  <span>20</span>
                </label>
              </li>
            </ul>
          </div>


          {/* airlines */}
          <div className='py-3 '>
            <p className='font-semibold text-gray-800 pb-2'>Airlines</p>
            <input type="text" name="search-airlines" id="search-airlines" placeholder='search' className='text-gray-700 border border-gray-300 w-full rounded py-1 px-2 mb-2'/>
            <ul className='flex flex-col gap-2'>

              <li className='flex items-center gap-2'>
                <input type="checkbox" name="indigo" id="indigo" />
                <label htmlFor="indigo" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>IndiGo</span>
                  <span>52</span>
                </label>
              </li>
              <li className='flex items-center gap-2'>
                <input type="checkbox" name="air-india" id="air-india" />
                <label htmlFor="air-india" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>Air India</span>
                  <span>30</span>
                </label>
              </li>
              <li className='flex items-center gap-2'>
                <input type="checkbox" name="vistara" id="vistara" />
                <label htmlFor="vistara" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>Vistara</span>
                  <span>22</span>
                </label>
              </li>
              <li className='flex items-center gap-2'>
                <input type="checkbox" name="spice-jet" id="spice-jet" />
                <label htmlFor="spice-jet" className='flex-1 flex items-center justify-between text-sm text-gray-500 '>
                  <span>SpiceJet</span>
                  <span>18</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
