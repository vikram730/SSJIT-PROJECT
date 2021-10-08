import React, { useState } from 'react'

const Multiple = () => {

    var subjectName = [
        {
        value:1,
        label:"Maths"
        },
        {
            value:2,
            label:"Physics"
        },
        {
            value:3,
            label:"Chemistry"
        }
    ]

    const [options , setOptions] = useState(subjectName);

    return (
        <div style={{width:'90%', justifyContent:"center" , display:'flex'}}>
            <h3>Select_Subject_Name</h3>
            {/* <Multiselect options={options} displayValue="label" /> */}
        </div>
    )
}

export default Multiple
