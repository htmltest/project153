$(document).ready(function() {

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \d{3} \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
        }
    });

    $('body').on('input', '.form-input textarea', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        if (curName != '') {
            curField.find('.form-file-name').html(curName);
        } else {
            curField.find('.form-file-name').html('');
        }
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('.gallery').each(function() {
        var curGallery = $(this);
        curGallery.on('init', function(event, slick) {
            var curSlide = curGallery.find('.slick-current');
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
        var options = {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            adaptiveHeight: true,
            fade: true,
            dots: true
        };
        curGallery.slick(
            options
        ).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var curSlide = curGallery.find('.slick-slide:not(.slick-cloned)').eq(nextSlide);
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
    });

    $('.tabs').each(function() {
        var curTabs = $(this);
        var curTabsMenu = curTabs.find('> .tabs-menu');
        var curTabsContainer = curTabs.find('> .tabs-container');
        var newHTML = '';
        curTabsContainer.find('> .tabs-content').each(function() {
            var curTabTitle = $(this).attr('data-title');
            newHTML += '<div class="tabs-menu-item"><a href="#">' + curTabTitle + '</a></div> ';
        });
        curTabsContainer.find('> .tabs-content').eq(0).addClass('active');
        curTabsMenu.html(newHTML);
        curTabsMenu.find('.tabs-menu-item').eq(0).addClass('active');
    });

    $('body').on('click', '.tabs-menu-item a', function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curTabs = curLi.parents().filter('.tabs');
            curTabs.find('.tabs-menu-item.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = curTabs.find('.tabs-menu-item').index(curLi);
            curTabs.find('.tabs-content.active').removeClass('active');
            curTabs.find('.tabs-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.mobile-menu-link').click(function(e) {
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('mobile-menu-open');
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
        $('html').data('scrollTop', curScroll);
        $('.wrapper').css('margin-top', -curScroll);
        e.preventDefault();
    });

    $('.mobile-menu-close').click(function(e) {
        $('html').removeClass('mobile-menu-open');
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $('.wrapper').css('margin-top', 0);
        $(window).scrollTop($('html').data('scrollTop'));
        e.preventDefault();
    });

    $('.mobile-menu-bg').click(function() {
        $('html').removeClass('mobile-menu-open');
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $('.wrapper').css('margin-top', 0);
        $(window).scrollTop($('html').data('scrollTop'));
    });

    $('.nav ul li').each(function() {
        if ($(this).find('ul').length > 0) {
            $(this).addClass('with-submenu');
        }
    });

    $('.mobile-menu-main ul li').each(function() {
        if ($(this).find('ul').length > 0) {
            $(this).addClass('with-submenu');
        }
    });

    $('.mobile-menu-main ul li.with-submenu > a').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $('.side-sections ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (curLi.find('ul').length > 0) {
            curLi.toggleClass('open');
            $('header').css({'margin-bottom': $('.content-side').outerHeight(true)});
            e.preventDefault();
        }
    });

    $('.header-search-link').click(function(e) {
        $('html').addClass('header-search-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.header-search').length == 0) {
            $('html').removeClass('header-search-open');
        }
    });

    $('.footer-group-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.authors-letters a').click(function(e) {
        var curLetter = $(this).html();
        var curBlock = $('.authors-letter-title:contains("' + curLetter + '")').parent();
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top});
        }
        e.preventDefault();
    });

    $('.content-side-menu-mobile a').click(function(e) {
        var curLink = $(this);
        if (curLink.hasClass('active')) {
            curLink.removeClass('active');
            $('.content-side .content-block.visible').removeClass('visible');
            $('.content-side').removeClass('visible');
            $('header').css({'margin-bottom': 0});
        } else {
            $('.content-side-menu-mobile a.active').removeClass('active');
            curLink.addClass('active');
            var curIndex = $('.content-side-menu-mobile a').index(curLink);
            $('.content-side').addClass('visible');
            $('.content-side .content-block.visible').removeClass('visible');
            $('.content-side .content-block').eq(curIndex).addClass('visible');
            $('header').css({'margin-bottom': $('.content-side').outerHeight(true)});
        }
        e.preventDefault();
    });

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').on('click', '.text-with-hint-link', function(e) {
        var curBlock = $(this).parent();
        if (curBlock.hasClass('open')) {
            curBlock.removeClass('open');
        } else {
            $('.text-with-hint.open').removeClass('open');
            curBlock.removeClass('to-right');
            curBlock.addClass('open');
            var curPopup = curBlock.find('.text-with-hint-popup');
            if (curPopup.offset().left + curPopup.outerWidth() > $(window).width()) {
                curBlock.addClass('to-right');
            }
        }
        e.preventDefault();
    });

    $('body').on('click', '.text-with-hint-popup-close', function(e) {
        $('.text-with-hint.open').removeClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.text-with-hint').length == 0) {
            $('.text-with-hint.open').removeClass('open');
        }
    });

});

function initForm(curForm) {
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('input.phoneRU').mask('+7 000 000-00-00');

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
    });

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 20
        }

        if (curSelect.prop('multiple')) {
            options['closeOnSelect'] = false;
        }

        curSelect.select2(options);

        curSelect.parent().find('.select2-container').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.parent().find('.select2-selection').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.on('select2:select', function(e) {
            $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
            curSelect.parent().find('select.error').removeClass('error');
            curSelect.parent().find('label.error').remove();
        });

        curSelect.on('select2:unselect', function(e) {
            if (curSelect.find('option:selected').length == 0) {
                curSelect.parent().find('.select2-container').removeClass('select2-container--full');
            }
        });

        if (curSelect.find('option:selected').legnth > 0 || curSelect.find('option').legnth == 1 || curSelect.find('option:first').html() != '') {
            curSelect.trigger({type: 'select2:select'})
        }
    });

    curForm.validate({
        ignore: ''
    });
}

$(window).on('load resize', function() {

    $('.table-scroll').each(function() {
        if ($(window).width() < 1120) {
            $(this).mCustomScrollbar({
                axis: 'x',
                scrollButtons: {
                    enable: true
                }
            });
        } else {
            $(this).mCustomScrollbar('destroy');
        }
    });

    $('.mission-list').each(function() {
        var curList = $(this);

        curList.find('.mission-item-text').css({'min-height': '0px'});

        curList.find('.mission-item-text').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.outerHeight();
            var curTop = curBlock.offset().top;

            curList.find('.mission-item-text').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.outerHeight();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });
    });

});

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
    } else {
        $('.window').append('<div class="window-loading"></div>')
        $('.window-container').addClass('window-container-preload');
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12.2021" y="0.00195312" width="2.15702" height="17.2561" transform="rotate(45 12.2021 0.00195312)" /><rect x="13.7275" y="12.2012" width="2.15702" height="17.2561" transform="rotate(135 13.7275 12.2012)" /></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
        });

        $(window).trigger('resize');

    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $(window).scrollTop($('.wrapper').data('curScroll'));
    }
}