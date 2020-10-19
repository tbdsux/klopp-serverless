// initialize the emoji lib
const picker = new EmojiButton()
const trigger = document.querySelector('#trigger')

// get the textarea
const textarea = document.getElementById('tweet-content')

picker.on('emoji', (selection) => {
  // add the emoji to the textarea
  textarea.value = textarea.value + selection
})

trigger.addEventListener('click', () => picker.togglePicker(trigger))
