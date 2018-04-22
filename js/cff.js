(function (window) {

  $cff = window.$cff

  let targets = document.querySelectorAll('.userContentWrapper')
  handle(targets)
  setMutationObserver()

  function handle (targets) {
    targets.forEach(target => {
      let post = target.querySelector('.userContent')
      let content = $cff.extractContentPost(post)
      $cff.clearPost(post)

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