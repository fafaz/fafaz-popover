# fafaz-Popover
fafaz-Tab is a lightweight Popover plugin (4.56KB minified / 1.79KB gzipped)

</br><br/>

## Instructions 
#### common

```html
<body>
    <button class="trigger" data-layer-id="content">Click!</button>
    <div id="contents" class="fz-popover">Contents</div>
</body>
```

<br/>

#### basic usage

```html
<body>
  .
  .
  .

    <script src="path/Popover.min.js"></script>
    <script>
        var myPopover = new fafaz.Popover.default('.trigger');
    </script>
</body>
```

<br/>

#### package manager + babel compiler 

`npm install --save fafaz-popover` **or** `yarn add fafaz-popover`


```javascript
import Popover from 'fafaz-popover';

const myPopover = new Popover('.trigger');
```


<br/><br/>

## Options

```javascript
var myPopover = new fafaz.Popover('.trigger', {
    gutter: 10,
    alignment: 'left'
});
```


<br/><br/>

## Dependencies

delegate [https://github.com/zenorocha/delegate](https://github.com/zenorocha/delegate)

<br/><br/>

## License

MIT
