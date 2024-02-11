export const capitalize = (input: string): string => {
  if (input === undefined) return '';
  let output = ''

  const newInput = input.split(' ').filter(word => word !== undefined)

  if (newInput.length > 1) {
    newInput.forEach(word => {
      if (isLetter(word[0])) {
        output += word[0].toUpperCase() + word.slice(1).toLocaleLowerCase() + ' '
      }
      else {
        output += word + word.slice(1).toLocaleLowerCase() + ' '
      }
    })
  } else if (newInput.length === 1) {
    output += newInput[0][0].toUpperCase() + newInput[0].slice(1)
  }

  return output.trim()
}

function isLetter(input: string): boolean {
  if (input === undefined) return false

  if (input.match(/^[A-Za-z]+$/) !== null) {
    return true
  }
  return false
}
