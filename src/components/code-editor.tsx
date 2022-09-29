import './code-editor.css'
import './syntax.css'
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const editorRef = useRef<any>();

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        });

        //fix the jsx highligh issue
        const highlighter = new Highlighter(
            // @ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
        );

        highlighter.highLightOnDidChangeModelContent(
            // make sure highlighter will not log syntax error undesire
            () => {},
            () => {},
            undefined,
            () => {}
        );
    };

    const onFormatClick = () => {
        const unformatted = editorRef.current.getModel().getValue();
        const formmatted = prettier.format(unformatted, {
            parser: 'babel', 
            plugins: [parser],
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '');

        editorRef.current.setValue(formmatted);
    };

    return (
        <div className='editor-wrapper'>
            <button 
                className='button button-format is-primary is-small' 
                onClick={ onFormatClick } >Format</button>
            <MonacoEditor 
                editorDidMount={ onEditorDidMount }
                value={ initialValue }
                language='javascript' 
                theme='dark' 
                height='100%'
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 18,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }} 
            />
        </div>
    );
};

export default CodeEditor;