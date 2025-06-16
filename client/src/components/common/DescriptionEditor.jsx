// components/DescriptionEditor.jsx
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const DescriptionEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey={import.meta.env.VITE_YOUR_TINYMCE_API_KEY} // ← thay bằng key của bạn
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={value}
      onEditorChange={onChange}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
          "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
          "insertdatetime", "media", "table", "code", "help", "wordcount"
        ],
        toolbar:
          "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview code",
        automatic_uploads: true,
        images_upload_url: "https://api.tiny.cloud/image",
        images_upload_credentials: true,
        image_title: true,
        file_picker_types: "image",
        file_picker_callback: (cb, value, meta) => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          input.onchange = function () {
            const file = this.files[0];
            const reader = new FileReader();
            reader.onload = function () {
              const id = "blobid" + new Date().getTime();
              const blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
              const base64 = reader.result.split(",")[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
      }}
    />
  );
};

export default DescriptionEditor;
