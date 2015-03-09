class ContentManager {

    public static getPics(criteria: string): JQueryPromise<IFlickrResponse> {
        return $.ajax({
            url: "https://api.flickr.com/services/feeds/photos_public.gne",
            jsonp: "jsoncallback",
            dataType: "jsonp",
            data: {
                format: "json",
                tags: criteria,
                tagmode: "ANY"
            }
        });
    }
}

export =ContentManager;