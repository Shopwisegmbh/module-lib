document.addEventListener('DOMContentLoaded',function(){
  function formatMoney(c){return (c/100).toFixed(2).replace('.',',')+' €'}
  document.querySelectorAll('.comp-card').forEach(function(item){
    var variants=item.querySelector('.js-variants')?JSON.parse(item.querySelector('.js-variants').textContent):[]
    var selects=item.querySelectorAll('.js-option-select')
    var inp=item.querySelector('.js-variant-id')
    var price=item.querySelector('.comp-price')
    var img=item.querySelector('.comp-media img')
    var btn=item.querySelector('.comp-btn')
    function choice(){return Array.from(selects).sort(function(a,b){return a.dataset.index-b.dataset.index}).map(function(s){return s.value})}
    function sync(v){
      if(!v)return
      inp.value=v.id
      if(price) price.textContent=formatMoney(v.price)
      if(img&&v.featured_image_src){img.src=v.featured_image_src;img.alt=v.public_title||v.title}
      if(btn){btn.disabled=!v.available}
    }
    function update(){
      if(!variants.length)return
      if(selects.length===0){sync(variants.find(function(x){return x.id==inp.value})||variants[0]);return}
      var match=variants.find(function(v){return choice().every(function(val,i){return v.options[i]===val})})
      sync(match||variants[0])
    }
    selects.forEach(function(s){s.addEventListener('change',update)})
    update()
    var form=item.querySelector('.comp-form')
    if(form){
      form.addEventListener('submit',function(e){
        e.preventDefault()
        if(btn&&btn.disabled)return
        var fd=new FormData(form)
        fetch('/cart/add.js',{method:'POST',headers:{'Accept':'application/json'},body:fd})
          .then(function(r){if(!r.ok)throw new Error('add');return r.json()})
          .then(function(payload){
            document.dispatchEvent(new CustomEvent('variant:added',{detail:{variant:payload}}))
            document.documentElement.dispatchEvent(new CustomEvent('cart:refresh',{bubbles:true}))
            var drawer=document.getElementById('mini-cart'); if(drawer) drawer.open=true
          })
          .catch(function(){})
      })
    }
  })
})

