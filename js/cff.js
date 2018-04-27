export default (function (window) {
  $cff = window.$cff

  let targets = document.querySelectorAll('.userContentWrapper')
  handle(targets)
  setMutationObserver()

  function handle (targets) {
    let i = 0;
    targets.forEach(target => {
      let post = target.querySelector('.userContent')
      let content = $cff.extractContentPost(post)
      $cff.clearPost(post)

      if($cff.playground.hasPlayground(content)) {
        console.log('Playground found')
        post.id = `post-block-${++i}`
        $cff.inject(post, $cff.playground.generateFrames(content))
      }
      console.log('Playground not found')

      $cff.inject(post, $cff.createBlock($cff.markdown.render(content)))
    })
  }

  function setMutationObserver () {
    let observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        handle(mutation.addedNodes[0].querySelectorAll('.userContentWrapper'))
      })
    })
    
    let target = document.querySelector('#contentArea div[role="feed"]') // page, timeline and group page
              || document.querySelector('#recent_capsule_container ol') // profile page
    observer.observe(target, {
      childList: true
    })
  }
})(window)