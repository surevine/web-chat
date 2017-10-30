import React from 'react';
import Datetime from 'react-datetime';
import { FormField } from 'react-form'

export default ({field, ...rest}) => {
    return (
        <FormField field={field}>

            {({ setValue, getValue, setTouched }) => {

                return (
                    <Datetime
                        {...rest}
                        utc={true}
                        value={getValue()}
                        onChange={val => setValue(val)}
                        onBlur={() => setTouched()}
                     />
                )

            }}

        </FormField>
    )
}
