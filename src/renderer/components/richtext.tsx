// import { useEffect, useRef } from 'react';
// import SunEditor from 'suneditor-react';
// // import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
// import 'suneditor/src/assets/css/suneditor.css'; // Import Sun Editor's CSS File
// import useDebouncedCleanup from '../hooks/useDebounce';

// const Richtext = (props) => {
//   const { value, onChange, sunRef, height = 200 } = props;

//   const getSunEditorInstance = (sunEditor) => {
//     sunRef.current = sunEditor;
//   };

//   return (
//     <div>
//       <SunEditor
//         getSunEditorInstance={getSunEditorInstance}
//         appendContents={value}
//         onChange={onChange}
//         setOptions={{
//           height: height, // Set the height of the editor
//           buttonList: [
//             [
//               'undo',
//               'redo',
//               'bold',
//               'italic',
//               'underline',
//               'strike',
//               'subscript',
//               'superscript',
//               'font',
//               'fontSize',
//               'formatBlock',
//               'align',
//               'horizontalRule',
//               'list',
//               'table',
//               'link',
//             ],
//           ],
//         }}
//       />
//     </div>
//   );
// };
// export default Richtext;

import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import the Quill theme (you can choose different themes)

const MyEditor = (props: any) => {
  const { name = '', value, onChange } = props;
  // Handle editor content change
  const handleChange = (value: string) => {
    const event = { target: { name, value } };
    onChange(event);
  };

  console.log(value)
  return (
    <div>
      <ReactQuill
        value={value?.[name]}
        onChange={handleChange}
        theme="snow" // You can use 'snow' or 'bubble' theme
        modules={{
          toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ align: [] }],
            ['link'],
            ['clean'],
          ],
        }}
      />
    </div>
  );
};

export default MyEditor;
