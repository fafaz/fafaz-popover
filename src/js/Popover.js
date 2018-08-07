import delegate from 'delegate';
/**
 * Copyright (c) fafazlab
 * fafaz-popover projects are licensed under the MIT license
 */

export default class Popover {
    // 브라우저에 동시에 2개 이상의 레이어가 열려있을 수 없다는 전제에 기반하여
    // 현재 열려이쓴ㄴ 레이어에 대하여만 리사이즈, 포지션 이벤트 등을 관리
    state = {
        lastClickedSelector: null,
        openLayer: null
    };

    constructor(selector, options) {
        // 스타일시트 등록
        if (!document.getElementById('stylesheet-popover')) {
            const style = document.createElement('style');
            style.id = 'stylesheet-popover';
            style.innerText = `.fz-popover{visibility:hidden;position:fixed;opacity:0;z-index:-1;padding:1.25rem 1.75rem;-webkit-transition:opacity 0.25s ease-out;transition:opacity 0.25s ease-out;box-sizing:content-box;color:#091e42;background:#fff;border-radius:3px;box-shadow:rgba(9,30,66,0.31) 0px 0px 1px,rgba(9,30,66,0.25) 0px 4px 8px -2px}.fz-popover__active{visibility:visible;display:block;opacity:1;z-index:9999}`;
            document.head.appendChild(style);
        }

        // 기본 설정
        this._config = {
            // 셀렉터와 벌어진 간격
            gutter: 10,
            // 정렬
            alignment: 'left',
            ...options
        };

        // 문서 바깥을 누르면 모든 열려있는 레이어를 닫음
        document.addEventListener(
            'click',
            e => {
                if (!this.state.openLayer || e.target === this.state.lastClickedSelector) return;
                this.close();
            },
            false
        );

        // 트리거 클릭 시 이벤트
        delegate(document, selector, 'click', ({ delegateTarget }) => {
            const layer = document.getElementById(delegateTarget.getAttribute('data-layer-id'));

            if (layer === this.state.openLayer) {
                this.close();
                return;
            }

            this.state.lastClickedSelector = delegateTarget;
            this.state.openLayer = layer;

            // 위치 계산 후 오픈
            this.open();
        });
    }

    open() {
        this.position(() => {
            this.state.openLayer.classList.add('fz-popover__active');
            window.addEventListener('resize', () => {
                this.position();
            });
            this.state.openLayer.addEventListener('click', e => {
                e.stopPropagation();
            });
        });
    }

    close() {
        if (!this.state.openLayer) return;
        this.state.openLayer.classList.remove('fz-popover__active');
        window.removeEventListener('resize', () => {
            this.position();
        });
        this.state.openLayer.removeEventListener('click', e => {
            e.stopPropagation();
        });
        this.state.openLayer = null;
    }

    _calculate = () =>
        new Promise(resolve => {
            const rect = this.state.lastClickedSelector.getBoundingClientRect();
            const layerHeight = this.state.openLayer.offsetHeight;
            const layerWidth = this.state.openLayer.offsetWidth;

            // 레이어의 위치 계산
            const layerOffset = {
                top: (() => {
                    const { gutter } = this._config;
                    // 셀렉터 bottom값 + 레이어 높이가 브라우저의 높이를 초과할 때 => 레이어는 셀렉터 위에 위치
                    if (window.innerHeight < rect.bottom + layerHeight) {
                        return rect.top - layerHeight - gutter;
                    } else {
                        return rect.bottom + gutter;
                    }
                })(),
                left: (() => {
                    const { alignment } = this._config;
                    switch (alignment) {
                        case 'right':
                            return rect.left + rect.width - layerWidth;
                        case 'center':
                            return rect.left - layerWidth / 2 + rect.width / 2;
                        default:
                            return rect.left;
                    }
                })()
            };
            resolve(layerOffset);
        });

    position(callback = null) {
        this._calculate().then(offset => {
            this.state.openLayer.style.cssText = `top: ${offset.top}px; left: ${offset.left}px`;
            if (typeof callback === 'function') callback();
        });
    }
}
