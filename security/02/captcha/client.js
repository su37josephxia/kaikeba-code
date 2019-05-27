(function(factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else {
        window.DragCaptcha = factory();
    }
})(function () {
    var extend = {
        addEventListener: function(target, type, handler) {
            var obj = target === 'document' ? document : target;
            try {
                obj.addEventListener(type, handler, false);
            } catch (error) {
                obj.attachEvent('on' + type, handler);
            }
        },
        removeEventListener: function(target, type, handler) {
            var obj = target === 'document' ? document : target;
            try {
                obj.removeEventListener(type, handler, false);
            } catch (error) {
                obj.detachEvent('on' + type, handler);
            }
        }
    };

    /**
     * DragCaptcha
     * @param targetId  添加到指定id的节点中
     * @param callback  拖动时松开鼠标后的回调函数
     * @param bgWidth  背景图片的宽度(不加单位px)
     */
    function DragCaptcha(targetId, callback, bgWidth) {
        this.targetId = targetId;
        this.callback = callback;
        this.bgWidth = bgWidth;
        this.bgHeight = bgWidth * 180 / 320;
        this.hasAddedEvent = false;
        this.defaultValue = {
            bgWidth: '320px',
            bgHeight: '180px',
            dragWidth: '60px',
            dragHeight: '45px'
        };

        this._init();
    }

    DragCaptcha.prototype = {
      constructor: DragCaptcha,
      _init: function () {
        this.createElement();
        this.getImage(this.bgWidth);
      },

      appendHtml: function(targetId, child) {
        var target = document.getElementById(targetId);
        target.appendChild(child);
      },

      createElement: function() {
        var canvasWrapper = document.createElement('div');
        canvasWrapper.style.position = 'relative';
        canvasWrapper.style.width = this.bgWidth ? this.bgWidth + 'px' : this.defaultValue.bgWidth;
        canvasWrapper.style.margin = '5px auto';

        var bgImage = document.createElement('img');
        bgImage.setAttribute('id', 'bg-canvas');
        bgImage.style.width = this.bgWidth ? this.bgWidth + 'px' : this.defaultValue.bgWidth;
        bgImage.style.height = this.bgHeight ? this.bgHeight + 'px' : this.defaultValue.bgHeight;

        var dragImage = document.createElement('img');
        dragImage.setAttribute('id', 'drag-canvas');
        dragImage.style.position = 'absolute';
        dragImage.style.top = 0;
        dragImage.style.left = 0;
        dragImage.style.width = this.defaultValue.dragWidth;
        dragImage.style.height = this.defaultValue.dragHeight;

        var tip = document.createElement('div');
        tip.innerHTML = '请拖动拼图填充完整图片';

        canvasWrapper.appendChild(bgImage);
        canvasWrapper.appendChild(dragImage);
        this.appendHtml(this.targetId, canvasWrapper);
        this.appendHtml(this.targetId, tip);
      },

      getImage: function(bgWidth) {
        var that = this;
        var xhr = new XMLHttpRequest();
        var response;
        var bgImage = document.querySelector('img#bg-canvas');
        var dragImage = document.querySelector('img#drag-canvas');

        xhr.open('get', '/drag_captcha?bgWidth=' + bgWidth);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {     
                response = JSON.parse(xhr.responseText);
                dragImage.style.left = 0;
                dragImage.style.top = 0;
                bgImage.src = response.bgCanvas;
                dragImage.src = response.dragCanvas;

                if (that.hasAddedEvent) return;
                that.hasAddedEvent = true;
                that.drag();
            }
        }
      },

      drag: function() {
        var that = this;

        var bgImage = document.querySelector('img#bg-canvas');
        var dragImage = document.querySelector('img#drag-canvas');
        var moveMaxValueX = bgImage.width - dragImage.width;  // 水平方向最大移动距离
        var moveMaxValueY = bgImage.height - dragImage.height;  // 垂直方向最大移动距离
        var dragStartX = dragImage.offsetLeft;  // 拼图初始水平位置
        var dragStartY = dragImage.offsetTop;  // 拼图初始垂直位置

        if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            extend.addEventListener(dragImage, 'touchstart', function(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    window.event.returnValue = false;
                }

                var startClientX = e.targetTouches[0].pageX;
                var startClientY = e.targetTouches[0].pageY;
                var dragMoveLeft = dragImage.offsetLeft;
                var dragMoveTop = dragImage.offsetTop;
                var fnMouseMove = function(e) {
                    var mouseMoveX = e.targetTouches[0].pageX - startClientX;
                    var mouseMoveY = e.targetTouches[0].pageY - startClientY;
                    var toX = dragMoveLeft + mouseMoveX;
                    var toY = dragMoveTop + mouseMoveY;
                    if (toX > moveMaxValueX) {
                        toX = moveMaxValueX;
                    } else if (toX < dragStartX) {
                        toX = dragStartX;
                    }
                    if (toY > moveMaxValueY) {
                        toY = moveMaxValueY;
                    } else if (toY < dragStartY) {
                        toY = dragStartY;
                    }
                    dragImage.style.left = toX + 'px';
                    dragImage.style.top = toY + 'px';
                };
                extend.addEventListener(document, 'touchmove', fnMouseMove);
                var fnMouseUp = function() {
                    extend.removeEventListener(document, 'touchmove', fnMouseMove);
                    extend.removeEventListener(document, 'touchend', fnMouseUp);
                    that.callback && that.callback();
                }
                extend.addEventListener(document, 'touchend', fnMouseUp);
            });
            return;
        }

        extend.addEventListener(dragImage, 'mousedown', function(e) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                window.event.returnValue = false;
            }

            var startClientX = e.clientX;
            var startClientY = e.clientY;
            var dragMoveLeft = dragImage.offsetLeft;
            var dragMoveTop = dragImage.offsetTop;
            var fnMouseMove = function(e) {
                var mouseMoveX = e.clientX - startClientX;
                var mouseMoveY = e.clientY - startClientY;
                var toX = dragMoveLeft + mouseMoveX;
                var toY = dragMoveTop + mouseMoveY;
                if (toX > moveMaxValueX) {
                    toX = moveMaxValueX;
                } else if (toX < dragStartX) {
                    toX = dragStartX;
                }
                if (toY > moveMaxValueY) {
                    toY = moveMaxValueY;
                } else if (toY < dragStartY) {
                    toY = dragStartY;
                }
                dragImage.style.left = toX + 'px';
                dragImage.style.top = toY + 'px';
            };
            extend.addEventListener(document, 'mousemove', fnMouseMove);
            var fnMouseUp = function() {
                extend.removeEventListener(document, 'mousemove', fnMouseMove);
                extend.removeEventListener(document, 'mouseup', fnMouseUp);
                that.callback && that.callback();
            }
            extend.addEventListener(document, 'mouseup', fnMouseUp);
        });
      }
    };

    return DragCaptcha;
});