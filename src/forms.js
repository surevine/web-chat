import find from 'lodash/find';

// Form Helper Functions

export const getFormField = (formTemplate, fieldName) => {

    return find(formTemplate.fields, function(field) {
        return field.name === fieldName;
    });
}