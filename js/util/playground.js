/** 
 * Playground functions
 */

export default {
  playgrounds: [
    'https://codepen.io',
    'https://gist.github.com',
    'https://jsfiddle.net',
    'https://codesandbox.io/'
  ],

  hasPlayground(content) {
    return this.playgrounds.filter(playground => {
      return content.includes(playground)
        && content.indexOf(playground) > content.lastIndexOf('<$cffplay>')
        && content.indexOf(playground) < content.lastIndexOf('</$cffplay>')
    }).length 
      && content.includes('<$cffplay>') 
      && content.includes('</$cffplay>')
  },
  generateFrames(str) {
    const fiddleUrl = str.substring(
      str.lastIndexOf('<$cffplay>')+1,str.lastIndexOf('</$cffplay>')
    )

    const iframe = document.createElement('iframe')

    iframe.style.width = '200px'
    iframe.style.height = '200px'

    iframe.src = fiddleUrl

    return iframe
  }
}