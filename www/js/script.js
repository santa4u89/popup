var Popup = function() {
    this.popupCreate();
    $('body').on('click', 'a[data-popup]', $.proxy(this.popupShow, this));
    $('.close, .popup-overlay').on('click', $.proxy(this.popupClose, this));
    $(document).on('keyup === 27', $.proxy(this.popupClose, this));
};

Popup.prototype.popupCreate = function() {
    this.popupOverlay = $('<div class="popup-overlay"><div class="popup"><img class="popup-image" src=""></div><a class="close" href="#"><i class="material-icons">clear</i></a></div>');
    this.container = this.popupOverlay.find('.popup');
    $('body').append(this.popupOverlay);
    this.popupOverlay.css('display', 'none');
};

Popup.prototype.popupCalculate = function() {
    // Variables for calculating dimensions of the popup banner
    this.windowObject = $(window);
    this.windowWidth = this.windowObject.width();
    this.windowHeight = this.windowObject.height();
    this.containerWidth = this.container.width();
    this.containerHeight = this.container.height();
    this.containerMargin = 50;
    this.maxWidth = this.windowWidth - this.containerMargin;
    this.maxHeight = this.windowHeight - this.containerMargin;

    // Calculating dimensions to center popup banner
    this.container.css({
        left: (this.windowWidth - this.containerWidth) / 2 + 'px',
        top: (this.windowHeight - this.containerHeight) / 2 + 'px',
    });

    // Check if container is higher/wider than window
    if (this.containerHeight >= this.maxHeight) {
        this.popupGetHeight();
    }

    if (this.containerWidth >= this.maxWidth) {
        this.popupGetWidth();
    }
};

Popup.prototype.popupGetWidth = function() {
    this.popupRatio = this.maxWidth / this.containerWidth;
    this.containerHeight = this.containerHeight * this.popupRatio;
    this.containerWidth = this.containerWidth * this.popupRatio;

    this.container.css({
        width: this.maxWidth + 'px',
        height: this.containerHeight + 'px',
        left: this.containerMargin / 2 + 'px',
        top: (this.windowHeight - this.containerHeight) / 2 + 'px'
    });
};

Popup.prototype.popupGetHeight = function() {
    this.popupRatio = this.maxHeight / this.containerHeight;
    this.containerHeight = this.containerHeight * this.popupRatio;
    this.containerWidth = this.containerWidth * this.popupRatio;

    this.container.css({
        height: this.maxHeight + 'px',
        width: this.containerWidth + 'px',
        left: (this.windowWidth - this.containerWidth) / 2 + 'px',
        top: (this.windowHeight - this.containerHeight) / 2 + 'px'
    });
};

Popup.prototype.popupImageShow = function(e) {
    this.popupImage = this.popupOverlay.find('.popup-image');
    this.popupImageSource = $(e.currentTarget).attr('href');
    this.popupImage.load($.proxy(this.popupCalculate, this));
    this.popupImage.attr('src', this.popupImageSource);
};

Popup.prototype.popupShow = function(e) {
    e.preventDefault();
    this.popupImageShow(e);
    this.popupOverlay.fadeIn(400);
};

Popup.prototype.resetValues = function() {
    this.container.removeAttr('style');
};

Popup.prototype.popupClose = function(e){
    e.preventDefault();
    this.popupOverlay.fadeOut('400', $.proxy(this.resetValues, this));
};
