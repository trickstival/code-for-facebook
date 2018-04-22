// Custom prototypes
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}

window.$cff = {
  extractContentPost (post) {
    this.removeLinkSeeMore(post)
    let content = post.innerText
    let complement = post.querySelectorAll('.text_exposed_show')

    if (complement.length) {
      complement = Array.from(complement).map(compl => {
        let hideContent = compl.querySelectorAll('p')
        if (hideContent.length) {
          return Array.from(hideContent).map(compl => {
            return compl.innerText
          }).join('\n\n')
        }
        return compl.innerText
      }).join('\n\n')

      return content + complement
    }
    return content
  },

  removeLinkSeeMore (post) {
    let seeMore = post.querySelectorAll('.text_exposed_hide')
    if (seeMore.length) {
      seeMore.forEach(el => {
        el.remove()
      })
    }
  },

  clearPost (post) {
    post.innerHTML = ''
  },

  createBlock (content, isElement = false) {
    let div = document.createElement('div')
    div.className = 'cff'
    if (isElement) {
      return div.appendChild(content)
    }
    div.innerHTML = content
    return div
  },

  inject (post, content) {
    post.appendChild(content)
  },

  /** 
   * Markdown functions
   */
  markdown: {
    remarkable () {
      let opt = {
        indent_size: 2
      }
      
      return new window.Remarkable('full', {
        linkify: true,
        linkTarget: '',
        typographer:  false,
        langPrefix: 'language-',
        highlight (str, lang) {
          str = window.hasOwnProperty(`${lang}_beautify`) ? window[`${lang}_beautify`](str, opt) : str
          if (lang && window.Prism.languages[lang]) {
            try {
              return `<pre class="language-${lang}"><code class="language-${lang}">${window.Prism.highlight(str, window.Prism.languages[lang], lang)}</code></pre>`
            } catch (e) {console.log(e)}
          }
          return '<pre class="language-shell"><code>' + str + '</code></pre>';
        }
      })
    },

    render (content) {
      return this.remarkable().render(content)
    }
  },

  /** 
   * Playground functions
   */
  playground: {
    playgrounds: [
      'https://codepen.io',
      'https://gist.github.com',
      'https://jsfiddle.net',
      'https://codesandbox.io/'
    ],

    hasPlayground (content) {
      return this.playgrounds.filter(playground => {
        return content.indexOf(playground) !== -1
      }).length
    }
  }
}
