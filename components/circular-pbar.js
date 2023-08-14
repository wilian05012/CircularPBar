const templateContent = `
<style>
.circular-pbar {
    --track-width: 48px;
    --track-accent: blue;
    --track-bg: lightgray;
    --track-center: white;
    --track-ff: sans-serif;
    --track-fs: 48pt;
    --track-fw: 600;
    --track-value: 33;
    --track-angle: calc(var(--track-value) * 360deg / 100);
    width: 100%;
    aspect-ratio: 1;
    background: conic-gradient(
        var(--track-accent) 0deg,
        var(--track-accent) var(--track-angle),
        var(--track-bg) var(--track-angle),
        var(--track-bg) 360deg
    );
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.circular-pbar > div {
    width: calc(100% - var(--track-width));
    aspect-ratio: 1;
    background-color: var(--track-center);
    font-family: var(--track-ff);
    font-size: var(--track-fs);
    border-radius: 50%;
    display: grid;
    place-content: center;
    color: var(--track-accent);
    font-weight: var(--track-fw);
}
</style>
<div class="circular-pbar">
    <div>50%</div>
</div>
`;
const templateElem = document.createElement('template');
templateElem.innerHTML = templateContent;

export class CircularPBar extends HTMLElement {
    #shadowRoot;
    static get observedAttributes() { return ['value']; }

    #updateValue() {
        const minValue = this.getAttribute('min') * 1;
        const maxValue = this.getAttribute('max') * 1;
        const currentValue = this.getAttribute('value') * 1;

        const percentValue = currentValue * 100 / (maxValue - minValue);

        this.#shadowRoot.querySelector('.circular-pbar').style.setProperty('--track-value', percentValue);
        this.#shadowRoot.querySelector('.circular-pbar > div').textContent = `${percentValue} %`;
    }

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: "closed" });
        this.#shadowRoot.appendChild(templateElem.content.cloneNode(true));
        this.#updateValue();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'value') this.#updateValue();
    }
}
window.customElements.define('circular-pbar', CircularPBar)