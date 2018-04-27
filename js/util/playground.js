/** 
 * Playground functions
 */

const REGEX_HTTPS = /(\$https)[\S]+/g

export default {
  playgrounds: [
    'https://codepen.io',
    'https://gist.github.com',
    'https://jsfiddle.net',
    'https://codesandbox.io/'
  ],

  hasPlayground(content) {
    const links = content.match(REGEX_HTTPS)
    if(!links || !links.length) {
      return false
    }

    return links.filter(link => 
      this.playgrounds.filter(play => link.includes(play)).length
    )
  },
  generateFrames(str, id) {
    const fiddleUrl = str.match(REGEX_HTTPS)[0].substring(1)

    const iframe = document.createElement('iframe')
    iframe.src = fiddleUrl
    iframe.allowPaymentRequest = true
    iframe.allowFullscreen = true
    iframe.width = '100%'
    iframe.height = 400
    iframe.frameBorder = 0

    return iframe
  }
};
