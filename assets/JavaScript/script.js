function GetHTMLStructure() {

  const bodyTag = document.querySelector('body');

  bodyTag.innerHTML = `
  <header class="header">
    <h1>Friends On Demand</h1>
    <h2>H2 test this is an addition for test purposes</h2>

    <button>Test button</button>
    <a href="#">Test Anchor link</a>
  </header>

  <!-- Test section to display of card container -->
  <section class="card-grid">
    <div class="card">
      <h3>H3 test</h3>
      <p>Brief description about this project goes here.</p>
    </div>
    <div class="card">
      <h3>H3 test</h3>
      <p>Some info about this project to show layout and contrast.</p>
    </div>
    <div class="card">
      <h3>H3 test</h3>
      <p>More placeholder content for visual comparison.</p>
    </div>
  </section>
  
  `;
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM content loaded");

  GetHTMLStructure();
  
});