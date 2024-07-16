/** @jsx figma.widget.h */

import { on, showUI } from '@create-figma-plugin/utilities'

const { widget } = figma
const { AutoLayout, Text, useSyncedState, usePropertyMenu } = widget

export default function () {
  widget.register(CodeSnippet)

  on('RESIZE_WINDOW', function (windowSize: { width: number; height: number }) {
    const { width, height } = windowSize
    figma.ui.resize(width, height)
  })
}

function CodeSnippet() {
  const [code, setCode] = useSyncedState('code', 'Hello Widget')
  const [language, setLanguage] = useSyncedState('language', 'javascript')
  const [fontSize, setFontSize] = useSyncedState('fontSize', '16')
  const items: Array<WidgetPropertyMenuItem> = [
    {
      itemType: 'action',
      propertyName: 'edit',
      tooltip: 'Edit'
    },
    {
      itemType: 'dropdown',
      propertyName: 'fontSize',
      tooltip: 'Font size',
      options: [
        {option: '16', label: '16'},
        {option: '24', label: '24'},
        {option: '32', label: '32'}
      ],
      selectedOption: fontSize
    }
  ]

  async function onChange({
    propertyName,
    propertyValue
  }: WidgetPropertyEvent): Promise<void> {
    await new Promise<void>(function () {
      if (propertyName === 'edit') {
        showUI({ height: 480, width: 320 }, { code, language })
        on('UPDATE_TEXT', function (code: string): void {
          setCode(code)
        })
      }

      if (propertyName === 'fontSize') {
        propertyValue ? setFontSize(propertyValue) : console.log('Invalid value')
      }
    })
  }

  usePropertyMenu(items, onChange)

  on('UPDATE_LANGUAGE', function (language: string): void {
    setLanguage(language)
  })

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
        fontSize={Number(fontSize)}
      >
        {code}
      </Text>
    </AutoLayout>
  )
}
