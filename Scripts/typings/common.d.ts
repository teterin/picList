declare var require: any;

interface IDictionary<T> {
    [index: string]: T
}

interface IFlickrPic {
    title: string;
    published: string;
    tags: string;
    media: IDictionary<string>
}

interface IFlickrResponse {
    items: IFlickrPic[];
}