/** @jsx figma.widget.h */

import { on, showUI } from '@create-figma-plugin/utilities'

const { widget } = figma
const { AutoLayout, Text, useSyncedState, usePropertyMenu } = widget

export default function () {
  widget.register(CodeSnippet)
}

function CodeSnippet() {
  const [code, setCode] = useSyncedState('text', 'Hello Widget')
  const items: Array<WidgetPropertyMenuItem> = [
    {
      itemType: 'action',
      propertyName: 'edit',
      tooltip: 'Edit'
    }
  ]

  async function onChange({
    propertyName
  }: WidgetPropertyEvent): Promise<void> {
    await new Promise<void>(function (resolve: () => void): void {
      if (propertyName === 'edit') {
        showUI({ height: 640, width: 420 }, { code })
        on('UPDATE_TEXT', function (code: string): void {
          setCode(code)
          resolve()
        })
      }
    })
  }

  usePropertyMenu(items, onChange)

  return (
    <AutoLayout
      name="CodeSnippetUI"
      effect={{
        blur: 50,
        type: "background-blur",
      }}
      fill="#252525D1"
      stroke="#303030"
      cornerRadius={16}
      spacing={8}
      padding={{
        vertical: 16,
        horizontal: 20,
      }}
      width={'hug-contents'}
      maxWidth={840}
      horizontalAlignItems="center"
      verticalAlignItems="center"
    >
      <Text
        name="code"
        fill="#DCE0D9"
        width="fill-parent"
        fontFamily="Roboto Mono"
        fontWeight={500}
      >
        {code}
      </Text>
    </AutoLayout>
  )
}
