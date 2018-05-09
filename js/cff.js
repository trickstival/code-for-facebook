export default window.onload = () => {
  $cff = window.$cff

  let targets = document.querySelectorAll('.userContentWrapper')
  handle(targets)
  setMutationObserver()

  const mainObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if(!node.querySelectorAll) return
        if(node.querySelectorAll('.userContentWrapper').length) 
          handle(mutation.addedNodes[0].querySelectorAll('.userContentWrapper'))
      })
    })
  })

  mainObserver.observe(document.querySelector('#content'), {
    childList: true,
    subtree: true
  })

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

  function getContainers() {
    return document.querySelector('#contentArea') // page, timeline and group page
    || document.querySelector('#recent_capsule_container ol') // profile page
  }

  function setMutationObserver () {
    let observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if(!mutation.addedNodes.length) return
        handle(mutation.addedNodes[0].querySelectorAll('.userContentWrapper'))
      })
    })
    
    let target = getContainers()
    if(!target) return
    observer.observe(target, {
      childList: true
    })
  }
}