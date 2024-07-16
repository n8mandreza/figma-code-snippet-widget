import { render, useWindowResize } from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import '!./prism-codesandbox.css'
import styles from './styles.css'

function Plugin(props: { code: string }) {
  const [code, setCode] = useState(props.code)

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);  // Update the local state with the new code
    emit('UPDATE_TEXT', newCode);  // Emit the updated code to main.tsx
  }, []);

  function onWindowResize(windowSize: { width: number; height: number }) {
    emit('RESIZE_WINDOW', windowSize)
  }
  useWindowResize(onWindowResize, {
    minWidth: 320,
    minHeight: 480,
    maxWidth: 640,
    maxHeight: 960
  })

  return (
    <div className={styles.container}>
      <Editor
        value={code}
        onValueChange={handleCodeChange}
        highlight={code => highlight(code, languages.js, 'Javascript')}
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
