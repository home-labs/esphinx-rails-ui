$(function () {
    'use strict';

    // if( $('.custom-select').length > 0 ) {
        init();
    // }

});

var buildOpts = function () {
    "use strict";
    var
        wrapper = $('.custom-select')
        ,select = wrapper.find('select')
        ,list = wrapper.find('ul.select')
        ,selectOptions = select.find('option')
        ,captionText = wrapper.find('.caption .text')
        ,jqObj = null
        ,li = null
    ;

    selectOptions.each(function (i, tag) {

        jqObj = $(tag);
        li = $('<li></li>');

        li.attr( 'data-value', jqObj.attr('value') );
        li.text( jqObj.text() );
        list.append(li);

        if( jqObj.attr('selected') ) {
            captionText.text( jqObj.text() );
        }
    });
}

// enableSearchSelect

// transformar em fn do jquery
jQuery.fn.build = function () {

    var
        selects = $(this)
        ,caption = null
        ,captionText = null
        ,listBox = null
        ,searchBox = null
        ,searchTextBox = null
        ,list = null
        ,select = null
        ,wrapper = null
    ;

    selects.each(function (i, select) {
        select = $(select);
        select.hide();
        wrapper = $('<div></div>');
        wrapper.addClass('custom-select');
        select.parent().append(wrapper);
        wrapper.append(select);

        caption = $('<div></div>');
        captionText = $('<div></div>');
        listBox = $('<div></div>');
        // searchBox = $('<div></div>');
        // searchTextBox = $('<input></input>');
        list = $('<ul></ul>');

        // searchBox.addClass('search-box');
        caption.addClass('caption retracted');
        captionText.addClass('text');
        listBox.addClass('options-box');
        list.addClass('select');

        // searchTextBox.attr('type', 'text');

        $(this).append(caption);
        caption.append(captionText);
        $(this).append(listBox);
        // listBox.append(searchBox);
        // searchBox.append(searchTextBox);
        listBox.append(list);

        // buildOpts();

        // setActionToSelect();
    });
    //pegar o pai do select, criar o custom-select, por causa do css


}

var init = function () {
    "use strict";
    var
        select = null
        ,caption = null
        ,captionText = null
        ,options = null
        ,searchBox = null
        ,searchTextBox = null
        ,list = null
    ;

    $('.custom-select').each(function () {
        select = $(this).find('select')

        caption = $('<div></div>');
        captionText = $('<div></div>');
        options = $('<div></div>');
        searchBox = $('<div></div>');
        searchTextBox = $('<input></input>');
        list = $('<ul></ul>');

        select.hide();

        searchBox.addClass('search-box');
        caption.addClass('caption retracted');
        captionText.addClass('text');
        options.addClass('options-box');
        list.addClass('select');

        searchTextBox.attr('type', 'text');

        $(this).append(caption);
        caption.append(captionText);
        $(this).append(options);
        options.append(searchBox);
        searchBox.append(searchTextBox);
        options.append(list);

        buildOpts();

        setActionToSelect();
    });

    // toggle
    $('.custom-select .caption').on('click', function () {
        $(this).parent().find('.options-box').toggle();
        toggleCaptionClass();
    });

    // find and build options
    var
        inputText = null
        ,wrapper = null
        ,foundsList = null
        ,foundsOptions = null
        ,options = null
        ,optText = null
        ,searchIndex = null
        ,prevSliceTextNoSearch = null
        ,sliceFound = null
        ,remainderSliceTextNoSearch = null
        ,newOpt = null
        ,spanSliceFound = null
    ;
    $('.custom-select input[type=text]').on('keyup', function (e) {
        inputText = $(this);
        wrapper = inputText.closest('.custom-select');
        options = wrapper.find('ul.select li')

        // cria a lista das opções e a caixa de texto, dinamicamente, e apenas após a pesquisa. Caso ela já tenha sido criada, ela não é recriada, ela é apenas limpada.
        if(wrapper.find('ul.founds-list').length === 0) {
            foundsList = $('<ul></ul>').addClass('founds-list');
            foundsList.insertAfter( wrapper.find('.search-box') );
        } else {
            foundsList.empty();
        }

        foundsOptions = foundsList.find('li');

        if(inputText.val() !== '') {

            options.each(function (i, item) {

                optText = item.textContent.trim();
                searchIndex = optText.toLowerCase().search( inputText.val().toLowerCase() );
                if(searchIndex > -1) {
                    foundsList.show();
                    options.parent().hide();

                    prevSliceTextNoSearch = optText.slice(0, searchIndex);

                    sliceFound = optText.slice(prevSliceTextNoSearch.length, prevSliceTextNoSearch.length + inputText.val().length);

                    remainderSliceTextNoSearch = optText.slice(prevSliceTextNoSearch.length + sliceFound.length, optText.length);

                    newOpt = $('<li></li>');
                    spanSliceFound = $('<span></span>');

                    newOpt.append(prevSliceTextNoSearch);
                    newOpt.append(spanSliceFound);
                    spanSliceFound.addClass('slice-found');
                    spanSliceFound.text(sliceFound);
                    newOpt.append(remainderSliceTextNoSearch);
                    newOpt.attr( 'data-value', $(item).data('value') );

                    foundsList.prepend(newOpt);
                }

            });

            setActionToSelect();

        } else {
            options.parent().show();
            foundsList.hide();
        }
    });

}

//select onclick
var setActionToSelect = function () {
    "use strict";
    $('.custom-select li').on('click', function () {
        var
            wrapper = $(this).closest('.custom-select')
            ,value = $(this).data('value')
            ,select = wrapper.find('select')
            ,captionText = wrapper.find('.caption .text')
            ,selected = null
        ;

        // remove selection
        select.find('option:selected').attr('selected', false);

        // select
        selected = select.find('option[value="' + value + '"]');
        selected.attr('selected', true);

        // set caption
        captionText.text( selected.text() );

        // esconde opções
        wrapper.find('.options-box').hide();

        toggleCaptionClass();
    });
}

var toggleCaptionClass = function () {
    "use strict";
    $('.custom-select .caption').toggleClass('expanded', 'retracted');
}

// click out
$(document).click(function (e) {

    var
        optionsBox = $('.custom-select .options-box');

    if( $(e.target).closest('.custom-select').length === 0 ) {

        if( optionsBox.is(':visible') ) {
            optionsBox.hide();
            toggleCaptionClass();
        }

    }

});