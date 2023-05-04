import { TextField } from '@mui/material';
import FormPropsType from '@/types/FormProps';

const PassForm = (props:FormPropsType) => {
    return (
        <TextField id="outlined-basic" label={props.title} variant="outlined"
                    defaultValue={props.default}
                    type='password'
                    onChange={(e) => props.setWord(e.target.value)} />
    );
};

export default PassForm;