import ContentManager = require("./ContentManager");

require("../style.less");
require("./components/pic-item/index");

var pics: KnockoutObservableArray<IFlickrPic> = ko.observableArray([]);
var image = ko.observable({ url: "", title: "" });
var isFullScreen = ko.observable(false);
var criteria = ko.observable("");
var sortDesc = ko.observable(true);
var sortParam = ko.observable("");
var sorts = [
    {
        name: "name",
        getOrderSymb: getOrderSymb,
        sort: sort

    },
    {
        name: "date",
        getOrderSymb: getOrderSymb,
        sort: sort
    }
]

$(".pic-list").on("imageclick", (sender, args) => {
    image(args);
    isFullScreen(true);
});

function getOrderSymb() {
    if (this.name === sortParam()) {
        return sortDesc() ? "↑" : "↓";
    }
}


function sort() {
    if (this.name === sortParam()) {
        sortDesc(!sortDesc());
    }
    sortParam(this.name);
    pics.sort(sortCompare);
}

function sortCompare(a: IFlickrPic, b: IFlickrPic) {
    var result = 0;
    if (sortParam() === "name") {
        if (a.title > b.title) {
            result = 1;
        }
        else if (a.title < b.title) {
            result = -1;
        }
    }
    if (sortParam() === "date") {
        var first = new Date(a.published);
        var second = new Date(b.published);
        if (first > second) {
            result = 1;
        }
        else if (first < second) {
            result = -1;
        }
    }
    if (!sortDesc()) {
        result *= -1;
    }
    return result;
}

function closeImg() {
    isFullScreen(false);
}

function search() {
    ContentManager.getPics(criteria().split(" ").join(",")).done((response) => {
        pics(response.items);
        pics.sort(sortCompare);
    });
}

function searchByEnter(sender, event: KeyboardEvent) {
    if (event.keyCode == 13) {
        search();
    }
    return true;
}
search();


ko.applyBindings({
    pics: pics,
    image: image,
    isFullScreen: isFullScreen,
    closeImg: closeImg,
    criteria: criteria,
    search: search,
    searchByEnter: searchByEnter,
    sorts: sorts
});