class ProgressBar extends HTMLElement{
  static get observedAttributes(){return["data-limit","data-message"]}
  constructor(){
    super()
    this.attachShadow({mode:"open"})
    this.shadowRoot.innerHTML=`
      <div class="progress-bar__container" role="region" aria-label="Shipping progress">
        <p class="progress-bar__message" aria-live="polite"></p>
        <div class="progress-bar__track" role="progressbar" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar__fill"></div>
        </div>
      </div>
      <style>
        :host{display:block}
        .progress-bar__container{margin:15px 0}
        .progress-bar__message{font-weight:500;font-size:1.2rem;line-height:1.2;margin:0 0 1rem}
        .progress-bar__track{background:#f3f3f3;height:8px;border-radius:4px;overflow:hidden;width:100%;position:relative}
        .progress-bar__fill{position:absolute;top:0;left:0;height:100%;border-radius:4px;transition:width .5s ease;background:var(--progress-bar-color,#222)}
      </style>`
    if(!window.__pbEventsBound){
      document.addEventListener("cart:updated",()=>document.querySelectorAll("progress-bar").forEach(el=>el.refresh()))
      document.addEventListener("cart:refresh",()=>document.querySelectorAll("progress-bar").forEach(el=>el.refresh()))
      window.__pbEventsBound=true
    }
  }
  connectedCallback(){this.refresh()}
  attributeChangedCallback(){this.refresh()}
  get limitCents(){return Number(this.getAttribute("data-limit")||0)}
  get msgTpl(){return this.getAttribute("data-message")||"Noch [[amount]]"}
  async refresh(){
    if(!this.limitCents){return}
    const cart=await fetch("/cart.js",{headers:{"Accept":"application/json"}}).then(r=>r.json()).catch(()=>null)
    if(!cart){return}
    const items=Array.isArray(cart.items)?cart.items:[]
    const shippable=items.filter(it=>it.requires_shipping===true && it.gift_card!==true)
    const subtotal=shippable.reduce((s,it)=>s+(Number(it.final_line_price)||0),0)
    const remaining=Math.max(this.limitCents - subtotal,0)
    const pct=Math.max(0,Math.min(100,Math.floor((subtotal/this.limitCents)*100)))
    const msgEl=this.shadowRoot.querySelector(".progress-bar__message")
    const fill=this.shadowRoot.querySelector(".progress-bar__fill")
    const track=this.shadowRoot.querySelector(".progress-bar__track")
    if(subtotal<=0){
      msgEl.textContent=this.msgTpl.replace("[[amount]]",this.formatMoney(this.limitCents))
      fill.style.width="0%"
      track.setAttribute("aria-valuenow","0")
      return
    }
    if(remaining===0){
      msgEl.textContent=this.msgTpl.replace("[[amount]]",this.formatMoney(0))
      fill.style.width="100%"
      track.setAttribute("aria-valuenow","100")
      return
    }
    msgEl.textContent=this.msgTpl.replace("[[amount]]",this.formatMoney(remaining))
    fill.style.width=pct+"%"
    track.setAttribute("aria-valuenow",String(pct))
  }
  formatMoney(cents){
    try{if(window?.Shopify?.formatMoney)return Shopify.formatMoney(cents)}catch(e){}
    const v=(Number(cents)||0)/100
    const cur=window?.Shopify?.currency?.active||window?.Shopify?.Currency?.currency||"EUR"
    const lang=document.documentElement.lang||"de-DE"
    return new Intl.NumberFormat(lang,{style:"currency",currency:cur}).format(v)
  }
}
customElements.define("progress-bar",ProgressBar)

