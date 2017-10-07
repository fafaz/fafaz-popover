require('../sass/Popover.scss');

/**
 * Copyright (c) fafazlab
 * fafaz-popover projects are licensed under the MIT license
 */

export default class Popover {
  constructor(trigger, options) {
    if (!trigger) return;
    this._trigger = document.querySelectorAll(trigger);
    this._options = {
      gutter: null,
      overlapSelector: true,
      callback: null
    };

    if (options) {
      Object.assign(this._options, options);
    }

    document.addEventListener('click', (ev) => {
      let layers = document.querySelectorAll('.popover-layer');
      for (let i=0, c=layers.length; i<c; i++) {
        if (ev.path.indexOf(layers[i]) !== -1) return;
        layers[i].classList.remove('is-active');
      }
    }, false);

    for (let i = 0, c = this._trigger.length; i < c; i++) {
      this._trigger[i].addEventListener('click', (ev) => {
        ev.stopPropagation();
        let _this = ev.currentTarget || ev.target;
        let id = _this.getAttribute('data-layer-id');
        const layer = document.getElementById(id);

        // 다른 열려있는 레이어가 있으면 닫음.
        const visibleLayer = document.querySelectorAll('.popover-layer.is-active');
        if (visibleLayer.length) {
          for (let i=0, c=visibleLayer.length; i<c; i++) {
            if (visibleLayer[i].id === id) continue;
            visibleLayer[i].classList.remove('is-active');
          }
        }

        if (layer.classList.contains('is-active')) {
          layer.classList.remove('is-active');
        } else {
          this.calculate(_this, layer, () => {
            layer.classList.add('popover-layer');
            this.open(_this, layer);
          });
        }
      });
    }
  } // constructor end

  calculate(trigger, layer, callback) {
    const rect = trigger.getBoundingClientRect();
    let layerHeight = layer.offsetHeight;
    let layerWidth = layer.offsetWidth;

    let triggerOffset = {
      top: trigger.offsetTop,
      left: trigger.offsetLeft
    }

    let layerOffset = {
      top: (() => {
        let gutter = !this._options.overlapSelector && this._options.gutter ? this._options.gutter : 0;
        console.log(rect);
        console.log(layerHeight);

        if (window.innerHeight < rect.bottom + layerHeight) {
          return triggerOffset.top - layerHeight - gutter + Number(`${this._options.overlapSelector?rect.height:0}`);
        } else {
          return triggerOffset.top + Number(`${this._options.overlapSelector?0:rect.height}`) + gutter;
        }
      })(),
      left: (() => {
        let left;
        switch (trigger.getAttribute('data-alignment')) {
          case 'right':
          left = triggerOffset.left + rect.width - layerWidth;
          break;
          case 'center':
            left = triggerOffset.left - layerWidth/2 + rect.width/2;
            break;
          default:
            left = triggerOffset.left
            break;
        }
        return left;
      })()
    }
    layer.style.cssText = `top: ${layerOffset.top}px; left: ${layerOffset.left}px`;
    if (typeof callback === 'function') callback(layerOffset);
  }

  open(trigger, layer) {
    layer.classList.add('is-active');
    if (typeof this._options.callback === 'function') {
      this._options.callback();
    }
  }
};

Popover.VERSION = '1.0.0';
module.exports = Popover;
