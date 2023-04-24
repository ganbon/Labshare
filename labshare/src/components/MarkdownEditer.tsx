import React, { useState,useMemo } from "react"
// import SimpleMDE from 'react-simplemde-editor'
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import 'easymde/dist/easymde.min.css'
import dynamic from "next/dynamic";


type MarkdownProps = {
    setMarkdown:React.Dispatch<React.SetStateAction<string>>;
    default:string;
}

export const MarkDownEditor = (props:MarkdownProps) => {
    // const [markdown, setMarkdown] = useState('')
    const setOptions = useMemo(() => {
        return {
            spellChecker: false,
        };
      }, []);
    return(
        <SimpleMDE
        onChange={e => props.setMarkdown(e)}
        value={props.default}
        options={setOptions as EasyMDE.Options} 
        />
        
    )
}
export default MarkDownEditor