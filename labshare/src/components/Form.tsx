import { TextField } from '@mui/material';
import FormPropsType from '@/types/FormProps';

const Form = (props:FormPropsType) => {
    return (
        <TextField id="outlined-basic" label={props.title} variant="outlined"
                    defaultValue={props.default}
                    onChange={(e) => props.setWord(e.target.value)} />
    );
};

export default Form;