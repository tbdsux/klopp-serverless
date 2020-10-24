const _0x56a1 = [
  'querySelector',
  'onclick',
  'value',
  'preventDefault',
  '#trigger',
  'getElementById',
  'togglePicker',
  'tweet-content',
]
;(function (_0x2627d4, _0x56a1aa) {
  const _0x355174 = function (_0x4a8446) {
    while (--_0x4a8446) {
      _0x2627d4['push'](_0x2627d4['shift']())
    }
  }
  _0x355174(++_0x56a1aa)
})(_0x56a1, 0x1d8)
const _0x3551 = function (_0x2627d4, _0x56a1aa) {
  _0x2627d4 = _0x2627d4 - 0x0
  let _0x355174 = _0x56a1[_0x2627d4]
  return _0x355174
}
const _0x45aa64 = _0x3551,
  picker = new EmojiButton(),
  trigger = document[_0x45aa64('0x0')](_0x45aa64('0x4')),
  formSubBtn = document[_0x45aa64('0x5')]('form-submit'),
  textarea = document[_0x45aa64('0x5')](_0x45aa64('0x7'))
picker['on']('emoji', (_0x4a8446) => {
  const _0xb8a3e9 = _0x45aa64
  textarea[_0xb8a3e9('0x2')] = textarea['value'] + _0x4a8446
}),
  (trigger[_0x45aa64('0x1')] = (_0x20c898) => {
    const _0x4cf621 = _0x45aa64
    picker[_0x4cf621('0x6')](trigger), _0x20c898[_0x4cf621('0x3')]()
  })
