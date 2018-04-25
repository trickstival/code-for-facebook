import markdown from './markdown'
import playground from './playground'

// Custom prototypes
Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
}

export default window.$cff = {
  extractContentPost(post) {
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

      content += complement
    }
    return content
  },

  removeLinkSeeMore(post) {
    let seeMore = post.querySelectorAll('.text_exposed_hide')
    if (seeMore.length) {
      seeMore.forEach(el => {
        el.remove()
      })
    }
  },

  clearPost(post) {
    post.innerHTML = ''
  },

  createBlock(content, isElement = false) {
    let div = document.createElement('div')
    div.className = 'cff'
    if (isElement) {
      return div.appendChild(content)
    }
    div.innerHTML = content
    return div
  },

  inject(post, content) {
    post.appendChild(content)
  },

  markdown,
  playground
}
