import React, { useState } from 'react'
import { SearchFlights } from '../SearchFlights/SearchFlights';
import { SearchSummary } from '../SearchSummary';

export const SearchModify = () => {

        const [edit, setEdit] = useState(false);
      
       
    
  return (
    <div>
        {edit ? (
                            <SearchFlights
                                onSearch={() => setEdit(false)}
                                update = {edit}
                            />
                        ) : (
                            <SearchSummary
                                onModify={() => setEdit(true)}
                            />
                        )}
    </div>
  )
}
