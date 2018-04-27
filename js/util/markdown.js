/** 
 * Markdown functions
 */
export default {
  remarkable() {
    let opt = {
      indent_size: 2
    }

    return new window.Remarkable('full', {
      linkify: true,
      linkTarget: '',
      typographer: false,
      langPrefix: 'language-',
      highlight(str, lang) {
        str = window.hasOwnProperty(`${lang}_beautify`) ? window[`${lang}_beautify`](str, opt) : str
        if (lang && window.Prism.languages[lang]) {
          try {
            return `<pre class="language-${lang}"><code class="language-${lang}">${window.Prism.highlight(str, window.Prism.languages[lang], lang)}</code></pre>`
          } catch (e) { console.log(e) }
        }
        return '<pre class="language-shell"><code>' + str + '</code></pre>';
      }
    })
  },

  render(content) {
    return this.remarkable().render(content)
  }
};
