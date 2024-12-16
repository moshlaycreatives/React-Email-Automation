import React from 'react';
import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import 'suneditor/src/assets/css/suneditor.css' // Import Sun Editor's CSS File

const Richtext = (props) => {
  return (
    <div>
      <SunEditor
        setOptions={{
          height: 200, // Set the height of the editor
          buttonList: [
            [
              'undo',
              'redo',
              'bold',
              'italic',
              'underline',
              'strike',
              'subscript',
              'superscript',
              'font',
              'fontSize',
              'formatBlock',
              'align',
              'horizontalRule',
              'list',
              'table',
              'link',
            ],
          ],
        }}
      />
    </div>
  );
};
export default Richtext;
