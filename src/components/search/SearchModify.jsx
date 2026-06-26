import React, { useState } from 'react'
import { SearchFlights } from '../SearchFlights/SearchFlights';
import { SearchSummary } from '../SearchSummary';

export const SearchModify = ({ allowModify = true }) => {
    const [edit, setEdit] = useState(false);


    if (!allowModify) {
        return <SearchSummary />;
    }

    return (
        <div>
            {edit ? (
                <SearchFlights
                    onSearch={() => setEdit(false)}
                    update={edit}
                />
            ) : (
                <SearchSummary
                    onModify={() => setEdit(true)}
                    showModifyButton={true}
                />
            )}
        </div>
    )
}
