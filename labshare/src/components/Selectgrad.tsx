import {Select,MenuItem} from "@mui/material";
import SelectPropsType from "@/types/SelectProps";

const SelectGrade = (props:SelectPropsType) => {
    return(
        <Select
          defaultValue={props.grade}
          label="学年"
          onChange={(e) => props.setGrade(e.target.value)}
        >
          <MenuItem value="B3">B3</MenuItem>
          <MenuItem value="B4">B4</MenuItem>
          <MenuItem value="M1">M1</MenuItem>
          <MenuItem value="M2">M2</MenuItem>
          <MenuItem value="OB">OB</MenuItem>
      </Select>
    )
}

export default SelectGrade