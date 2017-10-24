import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import FormField from '../forms/FormField';
import { getFormField } from '../../forms';

class LayoutForm extends React.Component {

    render() {

        return (
            <div className="layout">
            <Tabs>
                <TabList>
                { this.props.template.layout.map((page, index) => {

                    if(!page.label) {
                        page.label = "Page " + (index + 1);
                    }

                    return (
                        <Tab key={page.label}>{page.label}</Tab>
                    )

                })}
                    <div className="clearfix"></div>
                </TabList>

                { this.props.template.layout.map((page, index) => {

                    return (

                        <TabPanel key={index}>
                        { page.contents.map((formItem, index) => {

                            // Skip text layout items as not used
                            if(formItem.text) {
                                return null;
                            }

                            return (
                                <div className="formItem" key={index}>
                                { formItem.field ? (

                                    <FormField key={getFormField(this.props.template, formItem.field).name} field={getFormField(this.props.template, formItem.field)} form={this.props.form} />

                                ) : (
                                    <div className="formSection">
                                        {/* TODO ensure section exists */}
                                        <h4>{formItem.section.label}</h4>

                                        <div className="sectionFields">

                                            { formItem.section.contents.map(sectionItem => {

                                                return (
                                                    <FormField key={getFormField(this.props.template, sectionItem.field).name} field={getFormField(this.props.template, sectionItem.field)} form={this.props.form} />
                                                );

                                            })}

                                            <div className="clearfix"></div>

                                        </div>                                   

                                    </div>
                                )}
                                </div>
                            )
                        })}
                        </TabPanel>
                    )


                })}

            </Tabs>
            </div>  
        );
    }

}

export default LayoutForm;