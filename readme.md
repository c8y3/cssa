# cssa

Auditing tool for css.
Checks constraints against a css files.
The constraints are described in a json file.

## Install

```
npm install cssa
```

## Usage

```
cssa [options] <css_file>
```

Options:

```
-w, --whitelist <json_file_path>  list of allowed properties
-h, --help                        output usage information
```

e.g.:

```
$ cssa hello_world.css
```

## Configuration file

The configuration is simply the list of allowed properties. For instance:

```
["display", "width", "margin"]
```

## Legacy mode

For older versions of node, which do not implement ES6, you can alternatively use script `cssa-legacy`.

## License

cssa is licensed under the GPL-3.0 license
