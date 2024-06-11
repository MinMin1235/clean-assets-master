## Rename and move icon
### From
- src
    - assets
        - icons
            - file1.png
            - file1@2x.png
            - file1@3x.png
            - unimportable.png
            - unimportable@2x.png
            - unimportable@3x.png
    components
        Example.tsx
- package.json

### Example.tsx
    import icon from 'assets/icons/file1.png

### After Clean
    - src
    - assets
        -icons
            - file1.png
            - file1@2x.png
            - file1@3x.png
## Example

<video width="320" height="240" controls>
  <source src="https://gemootest.s3.us-east-2.amazonaws.com/s/res/514885813225336832/2fc45cc532137c1ef5073ed2498ffb05.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARLZICB6QQHKRCV7K%2F20240607%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240607T101643Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Signature=e9ccfb91a2335b3fd45b320546dc5afddee4cc797a2e632b3d42fbc414cfa667" type="video/mp4">
  Your browser does not support the video tag.
</video>

[Click để xem demo](https://streamable.com/m9wrym)

## Install
```bash
npm i clean-assets-master
```


## Setting
### .package.json
```json
"scripts": {
    "clean:assets": "node node_modules/clean-assets-master/index.js pathImage pathSource",
}
```
### Example
```json
"scripts": {
    "clean:assets": "node node_modules/clean-assets-master/index.js src/assets src",
}
```
## Run script
```bash
npm run clean:assets
```
