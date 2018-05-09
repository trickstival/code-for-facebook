/** 
 * Playground functions
 */

const playgrounds = [
  'codepen.io',
  'gist.github.com',
  'jsfiddle.net',
  'codesandbox.io'
]

const REGEX_HTTPS = new RegExp(`(https:\/\/)?(${playgrounds.join('|')})(\/.+)?`, 'g')

export default {
  playgrounds,

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
    let fiddleUrl = str.match(REGEX_HTTPS)[0]

    if(fiddleUrl.includes('jsfiddle.net') && !/embedded\b/.test(fiddleUrl)) {
      const endsWithSlash = fiddleUrl.substring(fiddleUrl.length - 1) === '/'
      fiddleUrl += `${ endsWithSlash ? '' : '/' }embedded`
    }

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
