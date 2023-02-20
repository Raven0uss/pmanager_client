import React from 'react';
import { Input } from 'antd';

const SearchElement = (props) => {
    const {
        filterName, setFilterName
    } = props;
    return (
        <Input
            value={filterName}
            allowClear
            style={{
                width: 250,
                marginLeft: '8%'
            }}
            placeholder='Search app name...'
            {...props}
            onChange={(e) => setFilterName(e.target.value)}
        />
    )
};

export default SearchElement;