import React, { useRef } from 'react';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';

const Editor = ({ value = '', onChange }) => {
	const editorRef = useRef(null);

	return (
		<>
			<TinyEditor
				apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
				onInit={(evt, editor) => editorRef.current = editor}
				onEditorChange={onChange}
				value={value}
				init={{
					height: 500,
					menubar: false,
					plugins: [
						'lists',
						'link',
						'code',
						'preview'
					],
					toolbar: 'blocks | bold italic underline strikethrough blockquote forecolor | numlist bullist | outdent indent | alignleft aligncenter alignright alignjustify | link code | preview',
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
					custom_colors: true,
					color_cols: 3,
					color_rows: 2,
					color_map: [
						'000000', 'Black',
						'FF0000', 'Red',
						'008000', 'Green',
						'0000FF', 'Blue',
						'b41730', 'Brown',
						'17253f', 'Navy'
					]
				}}
			/>
		</>
	);
};

export default Editor;