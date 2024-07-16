import { render, useWindowResize } from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-typescript';

import '!./prism-codesandbox.css'

import styles from './styles.css'
import Select from './components/Select'

function Plugin(props: { code: string, language: string }) {
  const [code, setCode] = useState(props.code)
  const [language, setLanguage] = useState(props.language)
  const languageOptions = [
    { label: 'CSS', value: 'css' },
    { label: 'HTML', value: 'html' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'JSON', value: 'json' },
    { label: 'Kotlin', value: 'kotlin' },
    { label: 'Python', value: 'python' },
    { label: 'Swift', value: 'swift' },
    { label: 'Typescript', value: 'typescript' },
  ]

  useWindowResize(onWindowResize, {
    minWidth: 320,
    minHeight: 480,
    maxWidth: 640,
    maxHeight: 960
  })

  function onWindowResize(windowSize: { width: number; height: number }) {
    emit('RESIZE_WINDOW', windowSize)
  }

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode); // Update the local state with the new code
    emit('UPDATE_TEXT', newCode); // Emit the updated code to main.tsx
  }, []);

  const handleLanguageChange = useCallback((event: Event) => {
    const target = event.target as HTMLSelectElement;
    const newLanguage = target.value;
    setLanguage(newLanguage);
    emit('UPDATE_LANGUAGE', newLanguage)
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.languageSelect}>
        <Select 
          label='Language'
          hideLabel={true}
          options={languageOptions} 
          selection={language} 
          onChange={handleLanguageChange} 
        />
      </div>

      <Editor
        value={code}
        onValueChange={handleCodeChange}
        highlight={code => highlight(code, languages[language], language)}
        padding={12}
        preClassName={styles.pre}
        textareaClassName={styles.textArea}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </div>
  )
}

export default render(Plugin)
