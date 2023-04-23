import * as React from 'react';
import { Box,TextField } from '@mui/material';
import FormPropsType from '@/types/FormProps';


const LongForm = (props:FormPropsType) => {
    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
            >
            <TextField fullWidth id="outlined-basic" label={props.title} variant="outlined"
                    defaultValue={props.default}
                    onChange={(e) => props.setWord(e.target.value)} />
            </Box>
    )
};

export default LongForm;