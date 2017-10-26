import React from 'react';
import Select from 'react-select';
import { FormField } from 'react-form'

export default ({field, ...rest}) => {
    return (
        <FormField field={field}>

            {({ setValue, getValue, setTouched }) => {

                return (
                    <Select
                        {...rest}
                        value={getValue()}
                        onChange={val => setValue(val)}
                        onBlur={() => setTouched()}
                    />
                )

            }}

        </FormField>
    )
}
