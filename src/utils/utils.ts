const markWord = (string: string) => {
    return `<mark>${string}</mark>`
  }

export const markSearchValue = (value: string, search_value: string) => {
    let markedMessage = ''

    if (!search_value.length) {
        return value
    }

    if (value.length) {
        let pattern = search_value.trim()

        // const re = new RegExp(pattern, 'ig')
        const re = new RegExp(pattern, 'g')

        markedMessage = value.replace(re, (mark) => {
            return markWord(mark)
        })

        return markedMessage
    }

    return markedMessage
}
