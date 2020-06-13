class Drawer extends HTMLElement {
  constructor() {
    super();
    document.body.style = `
        box-sizing:border-box;
        padding:0;
        margin:0;
    `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
            .drawer-container{
                width:100vw;
                height:100vh;
                position:relative;
                background:#f2f3f7;
            }
            .slider-container {
                width:100%;
                height:100%;
                background:#00000066;
                transition: all 0.5s ease;
                position:relative;
                display:none;
                z-index:1;
                
                
            }
            .slider {
                width:300px;
                height:100%;
                display:flex;
                flex-direction:column;
                align-items:center;
                border-bottom:1px solid green;
                background:#424242;
                position:absolute;
                top:0;
                left:-300px;
                transition: left 4s;
                
            }
            .showaAnimation {
                
                animation: slide 0.5s forwards;
            }
            .hideAnimation {
                
                animation: slideOver 0.5s forwards;
                
            }
            @-webkit-keyframes slide {
                100% { left: 0; }
            }
            @keyframes slide {
                100% { left: 0; }
            }
            @keyframes slideOver {
                0% { left: -300px; }
            }
            @-webkit-keyframes slideOver {
                0% { left: -300px; }
            }
            .menu {
                width:100%;
                color:white;
                height:70px;
                display:flex;
                justify-content:center;
                align-items:center;
                font-family: 'Roboto', sans-serif;
                border-bottom: 1px solid white;
                
            }
            button {
                position:absolute;
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
                width:200px;
                height:50px;
                border-radius:100px;
                border:none;
                color:#5a84a2;
                letter-spacing:2px;
                font-weight:600;
                font-size:20px;
                text-decoration:none;
                background:transparent;
                cursor:pointer;
                text-transform :uppercase;
                box-shadow: -2px -2px 8px rgba(255,255,255,1),
                                -2px -2px 12px rgba(255,255,255,0.5),
                                inset 2px 2px 4px rgba(255,255,255,0.1),
                                 2px 2px 8px rgba(0,0,0,0.15);
                outline:none;
            }
            button:hover {
                box-shadow: inset -2px -2px 8px rgba(255,255,255,1),
                            inset -2px -2px 12px rgba(255,255,255,0.5),
                            inset 2px 2px 4px rgba(255,255,255,0.1),
                            inset 2px 2px 8px rgba(0,0,0,0.15);
            }


        </style>
        
    `;
    // bind class function
    this._createElement = this._createElement.bind(this);
    this._buttonClick = this._buttonClick.bind(this);
    this._handleParent = this._handleParent.bind(this);
  }
  // class function
  _createElement(element = "div") {
    return document.createElement(element);
  }
  _buttonClick() {
    const slider = this.shadowRoot.querySelector(".slider");
    const sliderContainer = this.shadowRoot.querySelector(".slider-container");
    const parentContainer = this.shadowRoot.querySelector(".drawer-container");
    console.log(slider);
    slider.classList.add("showaAnimation");
    slider.classList.remove("hideAnimation");
    sliderContainer.style.display = "block";
    parentContainer.addEventListener("click", this._handleParent, true);
  }
  _handleParent() {
    // const slider = this.shadowRoot.querySelector( ".slider-container" );
    const slider = this.shadowRoot.querySelector(".slider");
    const sliderContainer = this.shadowRoot.querySelector(".slider-container");

    slider.classList.remove("showaAnimation");
    slider.classList.add("hideAnimation");
    sliderContainer.style.display = "none";
  }

  // Browser life cycle method
  attributeChangedCallback() {}
  connectedCallback() {
    this._drawerAttribute = this.getAttribute("direction");
    const button = this._createElement("button");
    button.textContent = this._drawerAttribute;
    const parentContainer = this._createElement();
    parentContainer.className = "drawer-container";
    const sliderContainer = this._createElement();
    sliderContainer.className = "slider-container";
    parentContainer.appendChild(sliderContainer);
    parentContainer.appendChild(button);
    const slider = this._createElement();
    slider.className = "slider";
    sliderContainer.appendChild(slider);
    let menu;
    ["Home", "Services", "About Us", "Contact Us"].map((item) => {
      menu = this._createElement();
      menu.textContent = item;
      menu.className = "menu";
      slider.appendChild(menu);
    });
    this.shadowRoot.appendChild(parentContainer);
    button.addEventListener("click", this._buttonClick, true);
  }
  disconnectedCallback() {}
}

customElements.define("ajs-drawer", Drawer);
