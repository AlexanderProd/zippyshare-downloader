# zippyshare-downloader

This is a CLI app to batch download zippyshare links with built in DLC container decryption. It needs curl installed on your system though. So if you're using macOS you can install `curl` using homebrew. Basically it is just a node wrapper for this [bash script](https://github.com/ffluegel/zippyshare).

## Installation

```
$ npm install -g zippyshare-downloader
```

If you're using macOS and need curl you can install it using homebrew. 

```
$ brew install curl
```

## Usage
Just run it anywhere with `zippyshare-load` .
```
$ zippyshare-load -f [.txt or dlc file]
```

a txt file must contain one zippyshare link per line.


## Release Notes

- ```1.0.0``` - Initial Release

TODO: Rewrite code to be 100% JavaScript.

