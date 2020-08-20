var Jobs = {
  mounted() {
    script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.truejob.com/widget.js?location=ann-arbor&theme=madeina2'
    document.getElementById('jobs-go-here').appendChild(script)
  },
  template: `
    <div class="jobs-wrapper">
      <div id="jobs-go-here"></div>
      <p>powered by <a href="https://www.truejob.com/" target="_blank">TrueJob</a></p>
    </div>
  `
}