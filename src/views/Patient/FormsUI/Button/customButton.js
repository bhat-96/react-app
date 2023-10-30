import React from 'react';
import { Button } from '@mui/material'; 




const customButton = ({
        children,
    // ...otherProps
})=>{

    const configButton={
        variant:'contained',
        color:'primary',
        fullWidth:true
    }
    return(
        <Button {...configButton}>
            {children}
        </Button>
    )
}

export default customButton;