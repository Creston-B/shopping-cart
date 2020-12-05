document.addEventListener('click', function(e) {
  if (e.target.id == 'add-to-cart' && e.target) {
    alert(`you clicked a button to add to cart!`)
  }
});