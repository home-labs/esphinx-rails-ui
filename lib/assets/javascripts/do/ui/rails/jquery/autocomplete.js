(function ($) {
    "use strict";

	$.fn.extend({
        
        autocomplete: function (obj, params, callback) {
            var
                found = [],
                self = $(this),
                domObjText,
                searchIndex,
                prevSliceTextNoSearch,
                sliceFound,
                remainderSliceTextNoSearch,
                spanSliceFound,
                copyng,
                jqObj,
                ajax,
                amountChar,
                tagName,

                prepare = function (obj, order) {
                    if (!order) {
                        order = "asc";
                    }
                    order = order.toLocaleLowerCase();
                    
                    found = [];
                    tagName = obj.prop("tagName").toLowerCase();
                    if (tagName === "li") {
                        obj.sortByTextContent(order).each(function (i, domObj) {
                            domObjText = domObj.textContent.trim();
                            searchIndex = domObjText.toLowerCase()
                                .search(self.val().toLowerCase());
                            if (searchIndex > -1) {

                                prevSliceTextNoSearch = domObjText
                                    .slice(0, searchIndex);

                                sliceFound = domObjText.slice(prevSliceTextNoSearch
                                    .length, prevSliceTextNoSearch.length +
                                        self.val().length);

                                remainderSliceTextNoSearch = domObjText
                                    .slice(prevSliceTextNoSearch.length +
                                        sliceFound.length, domObjText.length);

                                spanSliceFound = $("<span></span>");

                                copyng = $(domObj.cloneNode());
                                copyng.append(prevSliceTextNoSearch);
                                copyng.append(spanSliceFound);
                                spanSliceFound.addClass("do-ui-slice-found");
                                spanSliceFound.text(sliceFound);
                                copyng.append(remainderSliceTextNoSearch);
                                
                                found.push(copyng.get(0));
                            }
                        });
                    } // caso necessário, usar recursividade para reenviar formatado como li
                    return $(found);
                };
            
            if (obj instanceof jQuery) {
                if (params.afterAmountChar) {
                    amountChar = params.afterAmountChar;
                } else {
                    amountChar = 1;
                }
                
                self.on("keyup", function (e) {
                    if (self.val()) {
                        if (self.val().length >= amountChar) {
                            callback(e, prepare(obj, params.order));
                        }
                    } else {
                        callback(e, []);
                    }
                });
            } else if (obj instanceof Object) {
                
                if (obj.afterAmountChar) {
                    amountChar = obj.afterAmountChar;
                } else {
                    amountChar = 1;
                }
                
                // a consulta é renovada, para tal este evento não deve ser removido
                self.on("keyup", function (e) {
                    if (self.val().length === amountChar) {
                        ajax = DO.ajax;
                        obj.query(e, function (q) {
                            ajax.get({
                                url: obj.url,
                                query: q,
                                readyStateChange: function (xhr) {
                                    if (obj.process) {
                                        obj.process(e, xhr);
                                    }
                                    $(e.target).on("keypress", function (e) {
                                        e.preventDefault();
                                    });
                                }
                            }).done(function (a) {
                                $(e.target).off("keypress");
                                if (params instanceof Function) {
                                    jqObj = $(a).find("li");
                                    params(e, prepare(jqObj, obj.order));
                                    if (jqObj.length) {
                                        self.autocomplete(jqObj, obj, params);
                                    }
                                }
                            });
                        });
                    }
                });
            }
        }

    });

}(jQuery));