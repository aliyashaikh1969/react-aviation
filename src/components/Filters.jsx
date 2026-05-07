import React from 'react'

export const Filters = () => {
  return (
    <div className='text-gray-700'>
      <div>
        {/* heading */}
        <div>
          <p>Filter</p>
          <button>Clear All</button>
        </div>

        <div>

          {/* price range */}
          <div>
            <p>Price Range</p>
            <p>2000rs - 15000rs</p>
            <input type="range" min={2000} max={15000} />
            <span>2000rs</span>
            <span>15000rs</span>
          </div>

          {/* stops */}
          <div>
            <p>Stops</p>
            <ul>

            <li>
              <input type="checkbox" name="non-stop" id="non-stop" />
              <label htmlFor="non-stop">
                <span>Non-Stop</span>
                <span>75</span>
              </label>
            </li>
             <li>
              <input type="checkbox" name="one-stop" id="one-stop" />
              <label htmlFor="one-stop">
                <span>1 Stop</span>
                <span>30</span>
              </label>
            </li>
             <li>
              <input type="checkbox" name="two-stop" id="two-stop" />
              <label htmlFor="two-stop">
                <span>2+ Stop</span>
                <span>15</span>
              </label>
            </li>
            </ul>
          </div>

          {/* departure */}
           <div>
            <p>Departure Time</p>
            <ul>

            <li>
              <input type="checkbox" name="morning" id="morning" />
              <label htmlFor="morning">
                <span>Morning (00:00 - 06:00)</span>
                <span>20</span>
              </label>
            </li>
             <li>
              <input type="checkbox" name="afternoon" id="afternoon" />
              <label htmlFor="afternoon">
                <span>Afternoon (06:00 - 12:00)</span>
                <span>45</span>
              </label>
            </li>
             <li>
              <input type="checkbox" name="evening" id="evening" />
              <label htmlFor="evening">
                <span>Evening (12:00 - 18:00)</span>
                <span>35</span>
              </label>
            </li>
             <li>
              <input type="checkbox" name="night" id="night" />
              <label htmlFor="night">
                <span>Night (18:00 - 24:00)</span>
                <span>20</span>
              </label>
            </li>
            </ul>
          </div>

          
          {/* airlines */}
           <div>
            <p>Airlines</p>
            <input type="text" name="search-airlines" id="search-airlines" />
            <ul>

            <li>
              <input type="checkbox" name="indigo" id="indigo" />
              <label htmlFor="indigo">
                <span>IndiGo</span>
                <span>52</span>
              </label>
            </li>
             <li>
              <input type="checkbox" name="air-india" id="air-india" />
              <label htmlFor="air-india">
                <span>Air India</span>
                <span>30</span>
              </label>
            </li>
             <li>
              <input type="checkbox" name="vistara" id="vistara" />
              <label htmlFor="vistara">
                <span>Vistara</span>
                <span>22</span>
              </label>
            </li>
             <li>
              <input type="checkbox" name="spice-jet" id="spice-jet" />
              <label htmlFor="spice-jet">
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
