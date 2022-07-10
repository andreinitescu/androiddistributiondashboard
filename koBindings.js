ko.bindingHandlers.bootstrapTable = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var source = allBindingsAccessor().bootstrapTable.source();
        updateTable(element, source);

        $(element).on('click-row.bs.table', (e, row, $rowElem, field) => {
            const selectedItem = allBindingsAccessor().bootstrapTable.selectedItem;
            if (selectedItem) {
                $rowElem.addClass('highlight').siblings().removeClass('highlight');
                selectedItem(row);
            }
        })
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var source = allBindingsAccessor().bootstrapTable.source();
        updateTable(element, source);
    },
};

function init() {

}


function updateTable(element, source) {
    /*  var keys = Object.keys(source[0]); */

    /*       var columns = keys.map(k => {
              return {
                  field: k,
                  title: k,
                  sortable: true
              }
          }); */

    if (!source) {
        return;
    }

    var data = source.reduce((data, item) => {
        data.push(ko.toJS(item));
        return data;
    }, []);

    var config = {
        //columns: columns,
        data: data,
        search: true
    };

    //$(element).bootstrapTable(config);
    $(element).bootstrapTable('load', source);
}