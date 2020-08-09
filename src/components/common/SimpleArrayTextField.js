import Chip from '@material-ui/core/Chip';
import React from 'react';

export const SimpleArrayTextField = ({record, source}) => {
    const array = record[source];
    if (typeof array === 'undefined' || array === null || array.length === 0) {
        return <div/>
    } else {
        return (
            <>
                {array.map(item => <Chip label={item} key={item}/>)}
            </>
        )
    }
};

SimpleArrayTextField.defaultProps = {addLabel: true};
