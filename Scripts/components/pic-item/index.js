require("./style.less");
var Pic = (function () {
    function Pic(params) {
        this.picParameters = params.picParameters;
    }
    Pic.prototype.getUrl = function () {
        var result = "";
        for (var key in this.picParameters.media) {
            result = this.picParameters.media[key];
            break;
        }
        return result;
    };
    Pic.prototype.getTitle = function () {
        return this.picParameters.title;
    };
    Pic.prototype.getDate = function () {
        return new Date(this.picParameters.published).toString();
    };
    Pic.prototype.getTags = function () {
        return this.picParameters.tags;
    };
    Pic.prototype.imgClick = function (sender, event) {
        var url = this.getUrl();
        var match = url.match(/^(.*?)_m.jpg$/);
        url = match[1] + "_n.jpg";
        $(event.currentTarget).trigger("imageclick", [{ url: url, title: this.getTitle() }]);
        event.stopPropagation();
    };
    return Pic;
})();
ko.components.register('pic-item', {
    viewModel: Pic,
    template: require("html!./view.html")
});
//# sourceMappingURL=index.js.map