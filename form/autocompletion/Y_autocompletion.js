YUI().use('autocomplete', 'autocomplete-filters', 'autocomplete-highlighters', function (Y) {
    // START:local
    var FREQUENT_SEARCHES = [
        'JavaScript', 'JavaScript frameworks', 'Prototype', 'jQuery', 'Dojo', 'MooTools',
        'Ext', 'Ext JS', 'script.aculo.us', 'Scripty2', 'Ajax', 'XHR', '42'
    ];

    Y.on("domready", function () {
        /*Y.one('#edtCachedSearch').plug(Y.Plugin.AutoComplete, {
            resultFilters    : 'phraseMatch',
            resultHighlighter: 'phraseMatch',
            source           : FREQUENT_SEARCHES
        });*/
        new Y.AutoComplete({
            inputNode: '#edtCachedSearch',
            resultFilters    : 'phraseMatch',
            resultHighlighter: 'phraseMatch',
            source   : FREQUENT_SEARCHES,
            render:true
        });

        new Y.AutoComplete({
            inputNode: '#edtAjaxSearch',
            resultFilters    : 'phraseMatch',
            resultHighlighter: 'phraseMatch',
            source   : "autocomplete.json?q={query}",
            render:true
        });
    })
})