import {
  Button,
  Container,
  render,
  TextboxMultiline,
  useInitialFocus,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'

function Plugin(props: { code: string }) {
  const [code, setCode] = useState(props.code)
  const handleUpdateButtonClick = useCallback(
    function () {
      emit('UPDATE_TEXT', code)
    },
    [code]
  )
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <TextboxMultiline
        {...useInitialFocus()}
        onValueInput={setCode}
        value={code}
        variant="border"
      />
      <VerticalSpace space="large" />
      <Button fullWidth onClick={handleUpdateButtonClick}>
        Update code
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}

export default render(Plugin)
