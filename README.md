# fafaz-Popover
fafaz-Popover is a lightweight popover plugin with no dependencies

Example Page: [https://fafaz.github.io/fafaz-popover/demo/demo.html](https://fafaz.github.io/fafaz-popover/demo/demo.html)


</br>

## Instructions

Install via add a css, javascript files from the [dist](dist) directory to your page.


<br/>

## Usage


##### HTML

```html
<head>
  ...
  <script src="Popover.js"></script>
  <link rel="stylesheet" href="Popover.css" />
</head>

<body>
  <button class="trigger" data-layer-id="test-layer" data-alignment="left">
    click here
  </button>

  <div id="test-layer" class="popover-layer">Your Contents</div>
</body>
```


</br>

##### Javascript

```javascript
var myPopover = new fafaz.Popover('.trigger', {
  ...options
});
```


<br/>

## Options
```javascript
{
  gutter: null,
  overlapSelector: true,
  callback: null
}
```


<br/>

## License

MIT
