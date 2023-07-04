import React, { useMemo } from "react"
// import SimpleMDE from 'react-simplemde-editor'
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import 'easymde/dist/easymde.min.css'
import dynamic from "next/dynamic";


type MarkdownProps = {
    setMarkdown:React.Dispatch<React.SetStateAction<string>>;
    default:string;
}

export const MarkDownEditor = (props:MarkdownProps) => {
    const imageUploadFunction = async (file:any) => {
        const formData = new FormData();
        formData.append('image', file);
        const response = await fetch(`${process.env.NEXT_PUBLIC_ROOTPATH}/api/ImageUpLoad`, {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
        console.log(data)
        const imageurl = `${process.env.NEXT_PUBLIC_ROOTPATH}/image/` + data.fileName
        console.log(imageurl)
        props.setMarkdown((preMarkdown) => {
            return preMarkdown + `![image](${imageurl})`
        })
    }
    // const [markdown, setMarkdown] = useState('')
    const setOptions = useMemo(() => {
        return {
            spellChecker: false,
            uploadImage: true,
            imageUploadFunction
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