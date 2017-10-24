import React from 'react';
import Select from 'react-select';
import { FormInput } from 'react-form'


export default ({field, ...rest}) => {
    return (
        <FormInput field={field}>

            {({ setValue, getValue, setTouched }) => {

                return (
                    <Select.Creatable
                        {...rest}
                        value={getValue()}
                        onChange={val => setValue(val)}
                        onBlur={() => setTouched()}
                        noResultsText="Begin typing..."
                    />
                )

            }}
            
        </FormInput>
    )
}

// onChange={values => {
//     let parsedValued = [];
//     values.map((val) => {
//         parsedValued.push(val.value)
//     })
//     return setValue(parsedValued)
// }} // On Change, update the form value