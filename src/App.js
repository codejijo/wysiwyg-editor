import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import draftToMarkdown from 'draftjs-to-markdown';
// import htmlToDraft from 'html-to-draftjs';
import styles from "./app.module.css";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function App() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div className="container flex gap-x-6 px-20 mx-auto my-20 min-h-full">
      <div className="w-1/2 h-full">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="border h-4 mt-2 mb-6"
          onEditorStateChange={onEditorStateChange}
        />
        <h2 className="font-bold text-2xl mb-2">To <span className="underline decoration-amber-500">HTML</span></h2>
        <textarea
          disabled
          className="w-full h-40 rounded border-2 border-sky-200"
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
        <h2 className="font-bold text-2xl mb-2">To <span className="underline decoration-lime-500">Markdown</span></h2>
        <textarea
          disabled
          className="w-full h-40 rounded border-2 border-sky-200"
          value={editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
      <div className="w-1/2 h-full">
        <h2 className="font-bold text-2xl mb-2 underline decoration-blue-500">Preview</h2>
        <div
          className={styles.wrapper}
          dangerouslySetInnerHTML={{
            __html: `${draftToHtml(
              convertToRaw(editorState.getCurrentContent())
            )}`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
