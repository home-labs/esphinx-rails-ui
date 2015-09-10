// params:
    // url:
    // resizeByContent:
    // format: (js, hrml)

Modal = {
    open: function (params) {
        var
            url = null
            ,format = null
            ,body = $('body')
            ,wrapperModal = $('<div></div>').addClass('wrapper-modal transparent')
            ,modalMask = $('<div></div>').addClass('modal-mask fixed')
            ,modal = $('<div></div>').addClass('modal')
            ,header = $('<div></div>').addClass('modal-header')
            // headerActions = $("<div></div>").addClass 'modal-header-actions'
            ,btnClose = $("<a href='#'></a>").addClass('modal-btn-close button')
            ,content = $('<div></div>').addClass('modal-content')
        ;

        if( params.url ) {
            url = params.url;
        }

        body.append(wrapperModal);

        wrapperModal
        .append(modalMask)
        .append(modal);

        modal
        .append(header)
        .css({
            'max-height': $(document).height(),
            'max-width': $(window).width()
        });

        header.append(btnClose);
        modal.append(content);

        setButtonsAction();

        if( params.format ) {
            format = params.format;
        } else {
            format = 'html';
        }

        //loading
        Ajax.get({
            url: url,
            urlParams: {
                format: format
            }
        })
        .done(function (r) {
            if( params.resizeByContent ) {
                modal.load(url, function () {
                    content.load(url, function () {
                        $(this).find('img').css({
                            zoom: 'reset'
                        });
                    });
                });

                if( format === 'html' ) {
                    content.html(r);

                    modal.centralizeOnScreen();
                    wrapperModal.replaceClass('transparent', 'opacity-transition');
                }
            } else {
                if( format === 'html' ) {
                    content.html(r);
                }

                modal.centralizeOnScreen();
                modalMask.replaceToggleClass('transparent', 'opacity-transition');
            }
        });
    }
}
;

window.maximizeModal = function () {
    //wrapper-modal e modal ficam hide
    //trocar transparencia de wrapperModal
}

window.hideModal = function () {
    var
        wrapperModal = $('.wrapper-modal')
        ,mask = wrapperModal.find('.modal-mask')
        ,time = 0
    ;

    $('.modal').hide();

    mask.replaceToggleClass('transparent', 'opacity-transition');

    time = parseFloat( mask.css('transition-duration') ) * 1000;
    setTimeout(function () {
        $('.wrapper-modal').hide();
    }, time);
}

// minimize = ->
  // atribuir classe
  // colocar left: 0; bottom: 0 e mostrar só o header


// afterLoad = (url, execute)->
//   $(".modal").load url, ->
//     $(this).find(".modal-content").load url, ->
//       execute.each
          // ...

var hide = function (){
    window.hideModal();
}

var setButtonsAction = function () {
    $(document).keydown(function (e) {
        if( e.keyCode === 27 )
            hide();
    });

    $('body').on('click', 'a.modal-btn-close', function () {
        hide();
    });

    // $(".modal-mask").click ->
    //   minimize()

}
;